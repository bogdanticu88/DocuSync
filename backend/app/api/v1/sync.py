from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import Response
from ...services.docx_sync import docx_sync_service
from ...services.xlsx_sync import xlsx_sync_service
from ...core.config import settings

router = APIRouter()

async def validate_file_size(file: UploadFile):
    content = await file.read()
    if len(content) > settings.MAX_UPLOAD_SIZE:
        raise HTTPException(
            status_code=413, 
            detail=f"File too large. Maximum size is {settings.MAX_UPLOAD_SIZE / (1024*1024)}MB"
        )
    await file.seek(0)
    return content

@router.post("/word-to-excel")
async def word_to_excel(file: UploadFile = File(...)):
    if not file.filename.endswith(".docx"):
        raise HTTPException(status_code=400, detail="Only .docx files are supported")
    
    content = await validate_file_size(file)
    
    try:
        items = docx_sync_service.parse_narrative_to_json(content)
        
        if not items:
            raise HTTPException(status_code=422, detail="No structured items could be extracted. Ensure the document follows the 'Finding: ... Action: ...' format.")
        
        xlsx_bytes = docx_sync_service.generate_excel_workbook(items)
        
        return Response(
            content=xlsx_bytes,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers={"Content-Disposition": f"attachment; filename=transformation_output.xlsx"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Transformation failed: {str(e)}")

@router.post("/excel-to-word")
async def excel_to_word(file: UploadFile = File(...)):
    if not file.filename.endswith(".xlsx"):
        raise HTTPException(status_code=400, detail="Only .xlsx files are supported")
    
    content = await validate_file_size(file)
    
    try:
        items = xlsx_sync_service.parse_excel_to_items(content)
        
        if not items:
            raise HTTPException(status_code=422, detail="No data found in the spreadsheet")
        
        docx_bytes = xlsx_sync_service.generate_docx_report(items)
        
        return Response(
            content=docx_bytes,
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            headers={"Content-Disposition": f"attachment; filename=report_output.docx"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Transformation failed: {str(e)}")
