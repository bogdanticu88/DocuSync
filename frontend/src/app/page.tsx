"use client";

import { useState } from "react";
import { Upload, FileText, Table, ArrowRightLeft, Download, Loader2, ShieldCheck, CheckCircle2, FileDown } from "lucide-react";

export default function Home() {
  const [mode, setMode] = useState<"word2excel" | "excel2word">("word2excel");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleTransform = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    const endpoint = mode === "word2excel" ? "/sync/word-to-excel" : "/sync/excel-to-word";
    
    try {
      const response = await fetch(`http://localhost:8000/api/v1${endpoint}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = mode === "word2excel" ? "transformation_output.xlsx" : "report_output.docx";
        a.click();
        setResult("Transformation complete! Your file is downloading.");
      } else {
        const err = await response.json();
        alert(`Error: ${err.detail || "Transformation failed"}`);
      }
    } catch (error) {
      console.error("Sync error:", error);
      alert("Failed to connect to the transformation server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-neutral-900 font-sans">
      {/* Header */}
      <nav className="border-b border-neutral-100 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
            <ArrowRightLeft className="text-white" size={24} />
          </div>
          <span className="text-xl font-black uppercase tracking-tighter">Docu<span className="text-primary">Sync</span></span>
        </div>
        <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-neutral-400">
          <ShieldCheck size={14} className="text-primary" />
          <span>Deterministic Compliance Engine</span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-20 px-8 space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-black tracking-tight leading-none uppercase">
            Deterministic <br />
            <span className="text-primary">Rule-Based</span> Transformation
          </h1>
          <p className="text-neutral-500 font-medium max-w-xl mx-auto italic">
            AI-Free & Corporate Ready. Preserve meaning and structure through high-precision pattern matching.
          </p>
        </header>

        {/* Mode Toggle */}
        <div className="flex justify-center">
          <div className="bg-neutral-50 p-1 rounded-2xl flex border border-neutral-100">
            <button
              onClick={() => { setMode("word2excel"); setFile(null); }}
              className={`flex items-center space-x-3 px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                mode === "word2excel" ? "bg-white text-primary shadow-sm" : "text-neutral-400 hover:text-neutral-600"
              }`}
            >
              <FileText size={18} />
              <span>Word to Excel</span>
            </button>
            <button
              onClick={() => { setMode("excel2word"); setFile(null); }}
              className={`flex items-center space-x-3 px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                mode === "excel2word" ? "bg-white text-primary shadow-sm" : "text-neutral-400 hover:text-neutral-600"
              }`}
            >
              <Table size={18} />
              <span>Excel to Word</span>
            </button>
          </div>
        </div>

        {/* Upload Card */}
        <div className="bg-white border-2 border-dashed border-neutral-200 rounded-[32px] p-12 transition-all hover:border-primary/50 group">
          <div className="flex flex-col items-center space-y-6">
            <div className={`p-6 rounded-3xl transition-all ${file ? 'bg-primary/10 text-primary' : 'bg-neutral-50 text-neutral-300 group-hover:bg-primary/5 group-hover:text-primary/50'}`}>
              <Upload size={48} />
            </div>
            
            <div className="text-center">
              <label className="block">
                <span className="sr-only">Choose file</span>
                <input 
                  type="file" 
                  accept={mode === "word2excel" ? ".docx" : ".xlsx"}
                  onChange={handleFileChange}
                  className="block w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:uppercase file:tracking-widest file:bg-primary file:text-white hover:file:bg-primary-dark transition-all cursor-pointer"
                />
              </label>
              <p className="mt-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">
                {file ? `Selected: ${file.name}` : `Upload your ${mode === "word2excel" ? "Word (.docx)" : "Excel (.xlsx)"} file`}
              </p>
            </div>

            {file && (
              <button 
                onClick={handleTransform}
                disabled={loading}
                className="flex items-center space-x-3 px-10 py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Analyzing Structure...</span>
                  </>
                ) : (
                  <>
                    <Download size={20} />
                    <span>Run Transformation</span>
                  </>
                )}
              </button>
            )}

            {result && (
              <div className="flex items-center space-x-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg font-bold text-xs animate-in fade-in zoom-in duration-300">
                <CheckCircle2 size={16} />
                <span>{result}</span>
              </div>
            )}
          </div>
        </div>

        {/* Features Footer */}
        <div className="grid grid-cols-3 gap-8">
          {[
            { title: "Pattern-Based Extraction", desc: "Deterministic logic scanning for findings, actions, and metadata labels." },
            { title: "100% AI-Free", desc: "No external API calls or LLM dependencies. Fully compliant with secure environments." },
            { title: "Template Support", desc: "Optimized for structured governance reports and operational trackers." }
          ].map((f, i) => (
            <div key={i} className="space-y-2">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-primary">{f.title}</h3>
              <p className="text-xs font-medium text-neutral-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="py-12 border-t border-neutral-100 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-300">&copy; 2026 DocuSync Engineering &bull; 100% Deterministic Engine</p>
      </footer>
    </main>
  );
}
