"use client";

import React, { useState, useEffect } from "react";
import { 
  Upload, FileText, Table, ArrowRightLeft, Download, 
  Loader2, ShieldCheck, CheckCircle2, ChevronRight,
  Database, Zap, FileSearch, RefreshCcw, Cpu, 
  Lock, Activity, Layers, ExternalLink, Settings,
  History, Info, X, Trash2, Layout, Globe,
  BarChart3, Clock, Server, Cloud, Bell, MoreVertical
} from "lucide-react";

// --- REUSABLE COMPONENTS ---

const StatCard = ({ icon: Icon, label, value, subValue, colorClass = "text-primary" }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-card hover:shadow-lg transition-all group">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-2 rounded-lg bg-slate-50 group-hover:bg-primary/5 transition-colors`}>
        <Icon size={20} className={colorClass} />
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Live</span>
    </div>
    <div className="space-y-1">
      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</p>
      <div className="flex items-baseline space-x-2">
        <h4 className="text-2xl font-black text-slate-900 tracking-tight">{value}</h4>
        <span className="text-[10px] font-bold text-emerald-500">{subValue}</span>
      </div>
    </div>
  </div>
);

const Badge = ({ children, variant = "neutral" }: any) => {
  const styles: any = {
    neutral: "bg-slate-100 text-slate-600 border-slate-200",
    primary: "bg-primary/10 text-primary border-primary/20",
    success: "bg-emerald-50 text-emerald-600 border-emerald-100",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${styles[variant]}`}>
      {children}
    </span>
  );
};

// --- MAIN APPLICATION ---

export default function DocuMatrix() {
  const [mode, setMode] = useState<"word2excel" | "excel2word">("word2excel");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTransform = () => {
    if (!file) return;
    setLoading(true);
    setProgress(0);
    
    // Simulate progress for UI polish
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          setShowResult(true);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-primary/10">
      
      {/* 1. TOP NAVIGATION BAR */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-8 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center space-x-12">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="bg-primary p-2 rounded-xl shadow-action transform group-hover:rotate-6 transition-transform">
              <RefreshCcw className="text-white" size={20} />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase">Docu<span className="text-primary tracking-normal">Matrix</span></span>
          </div>
          
          <div className="hidden lg:flex items-center space-x-1 font-semibold text-[13px] text-slate-500">
            {['Overview', 'Converter', 'SchemaVault', 'Logs'].map((item) => (
              <a key={item} href="#" className={`px-4 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-all ${item === 'Converter' ? 'text-primary bg-primary/5' : ''}`}>
                {item}
              </a>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-3 border-r border-slate-200 pr-6">
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Engine Version</span>
              <span className="text-[11px] font-bold text-slate-700">v4.2.0-STABLE</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Regional Node</span>
              <Badge variant="primary">EU-WEST-1</Badge>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:text-primary transition-colors"><Bell size={20} /></button>
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white text-xs font-bold shadow-lg border border-white/10">BT</div>
          </div>
        </div>
      </nav>

      <div className="max-w-[1440px] mx-auto px-8 py-12">
        
        {/* 2. TITLE SECTION */}
        <header className="mb-12 space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Enterprise Document Sync</h1>
          <p className="text-slate-500 font-medium">Deterministic bidirectional transformation between narrative and structured data.</p>
        </header>

        {/* 3. MAIN DASHBOARD LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* --- LEFT COLUMN: CONTROLS & STATS --- */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* CONVERSION PANEL */}
            <div className="bg-white rounded-[24px] border border-slate-200 p-8 shadow-card space-y-10">
              <div className="flex items-center space-x-3">
                <Settings size={18} className="text-primary" />
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-900">Protocol Config</h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Flow</label>
                  <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-50 rounded-2xl border border-slate-100">
                    <button 
                      onClick={() => { setMode('word2excel'); setFile(null); setShowResult(false); }}
                      className={`py-4 rounded-xl text-xs font-bold flex flex-col items-center space-y-2 transition-all ${mode === 'word2excel' ? 'bg-white text-primary shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      <FileText size={20} />
                      <span>WORD &rarr; XLS</span>
                    </button>
                    <button 
                      onClick={() => { setMode('excel2word'); setFile(null); setShowResult(false); }}
                      className={`py-4 rounded-xl text-xs font-bold flex flex-col items-center space-y-2 transition-all ${mode === 'excel2word' ? 'bg-white text-primary shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      <Table size={20} />
                      <span>XLS &rarr; WORD</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-50">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-600 uppercase">Parsing Depth</span>
                    <span className="text-[11px] font-black text-primary">ADVANCED</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[85%] rounded-full shadow-[0_0_10px_rgba(255,98,0,0.4)]" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-2xl border border-primary/10">
                  <div className="flex items-center space-x-3">
                    <Lock size={16} className="text-primary" />
                    <span className="text-[11px] font-bold text-primary uppercase">Secure Vault Mode</span>
                  </div>
                  <div className="w-8 h-4 bg-primary rounded-full relative">
                    <div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
              </div>
            </div>

            {/* STATS PANEL */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard icon={Zap} label="Latency" value="14ms" subValue="-2%" colorClass="text-orange-500" />
              <StatCard icon={BarChart3} label="Precision" value="99.9%" subValue="+0.1%" colorClass="text-emerald-500" />
            </div>

            <div className="bg-slate-900 rounded-[24px] p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                <Cloud size={120} />
              </div>
              <div className="relative z-10 space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">System Health</span>
                </div>
                <h3 className="text-xl font-black tracking-tight leading-none italic uppercase">Optimized <br /> Core Engine</h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">No external API calls. 100% deterministic logic executed on secure regional nodes.</p>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: UPLOAD & RESULTS --- */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* UPLOAD CARD */}
            {!showResult ? (
              <div className="bg-white rounded-[32px] border-2 border-dashed border-slate-200 p-12 lg:p-24 shadow-card hover:border-primary/40 transition-all group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                
                <div className="flex flex-col items-center text-center space-y-10">
                  <div className={`w-32 h-32 rounded-[40px] flex items-center justify-center transition-all duration-700 ${file ? 'bg-primary border border-primary/20 scale-110 shadow-action rotate-3' : 'bg-slate-50 text-slate-300 group-hover:bg-primary/5 group-hover:text-primary/40'}`}>
                    {file ? <CheckCircle2 size={56} className="text-white" /> : <Upload size={56} strokeWidth={1.5} />}
                  </div>
                  
                  <div className="space-y-4 max-w-sm">
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic">
                      {file ? 'Data Staged' : 'Ingest Document'}
                    </h3>
                    <p className="text-slate-500 font-medium uppercase text-[11px] tracking-widest leading-relaxed">
                      {file ? file.name : `Deploy a ${mode === 'word2excel' ? '.docx' : '.xlsx'} source file`}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full justify-center">
                    <label className="cursor-pointer w-full sm:w-auto">
                      <input type="file" className="hidden" accept={mode === 'word2excel' ? '.docx' : '.xlsx'} onChange={(e) => { if(e.target.files) setFile(e.target.files[0]) }} />
                      <div className="px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl text-[13px] font-black uppercase tracking-[0.2em] hover:bg-slate-50 transition-all active:scale-95 shadow-sm flex items-center justify-center space-x-3">
                        <FileSearch size={18} />
                        <span>{file ? 'Replace Source' : 'Browse Files'}</span>
                      </div>
                    </label>

                    {file && (
                      <button 
                        onClick={handleTransform}
                        disabled={loading}
                        className="px-10 py-5 bg-primary text-white rounded-2xl text-[13px] font-black uppercase tracking-[0.2em] hover:bg-primary-dark transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center space-x-3 shadow-action w-full sm:w-auto"
                      >
                        {loading ? <Loader2 className="animate-spin" size={18} /> : <Zap size={18} fill="currentColor" />}
                        <span>{loading ? 'Processing...' : 'Run Transformation'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {loading && (
                  <div className="absolute inset-x-0 bottom-0 p-8 animate-in slide-in-from-bottom-4">
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-primary transition-all duration-300 shadow-[0_0_15px_#FF6200]" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="flex justify-between mt-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <span>Synchronizing Data Nodes...</span>
                      <span>{progress}%</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* RESULT SECTION */
              <div className="bg-white rounded-[32px] border border-slate-200 shadow-card animate-in zoom-in duration-500 overflow-hidden">
                <div className="bg-emerald-500 px-12 py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-white">
                    <CheckCircle2 size={20} />
                    <span className="text-[11px] font-black uppercase tracking-[0.3em]">Protocol Verified & Completed</span>
                  </div>
                  <Badge variant="success">Audit Trail Logged</Badge>
                </div>
                
                <div className="p-12 lg:p-16 flex flex-col items-center text-center space-y-10">
                  <div className="w-full max-w-lg bg-slate-50 rounded-[24px] p-8 border border-slate-100 flex items-center justify-between group hover:bg-slate-100 transition-colors">
                    <div className="flex items-center space-x-5">
                      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                        {mode === 'word2excel' ? <Table className="text-emerald-500" size={28} /> : <FileText className="text-blue-500" size={28} />}
                      </div>
                      <div className="text-left space-y-1">
                        <p className="text-sm font-black text-slate-900 tracking-tight truncate max-w-[200px] uppercase italic">{file?.name.split('.')[0]}_sync.{mode === 'word2excel' ? 'xlsx' : 'docx'}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center space-x-2">
                          <span>342.8 KB</span>
                          <span className="w-1 h-1 bg-slate-300 rounded-full" />
                          <span className="text-emerald-500">Hash: 8f2a...c1</span>
                        </p>
                      </div>
                    </div>
                    <button className="p-3 bg-white text-slate-400 hover:text-primary rounded-xl shadow-sm transition-all border border-slate-100">
                      <Layout size={20} />
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full justify-center">
                    <button className="px-12 py-6 bg-primary text-white rounded-3xl text-[13px] font-black uppercase tracking-[0.2em] hover:bg-primary-dark transition-all active:scale-95 shadow-action flex items-center space-x-4 w-full sm:w-auto">
                      <Download size={22} />
                      <span>Download Artifact</span>
                    </button>
                    <button 
                      onClick={() => setShowResult(false)}
                      className="px-12 py-6 bg-slate-900 text-white rounded-3xl text-[13px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all active:scale-95 w-full sm:w-auto shadow-lg"
                    >
                      New Transformation
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* PREVIEW AREA MOCKUP */}
            <div className="bg-white rounded-[32px] border border-slate-200 shadow-card p-8 group hover:border-primary/20 transition-all">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-primary/5">
                    <Layers size={18} className="text-slate-400 group-hover:text-primary" />
                  </div>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">Structure Preview</h3>
                </div>
                <Badge>Auto-Mapped</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-32 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center italic text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Table Node {i}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. HISTORY & AUDIT LOG */}
        <section className="mt-20 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-slate-900 rounded-xl shadow-lg">
                <History className="text-white" size={20} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Audit Pipeline</h2>
            </div>
            <button className="text-[11px] font-black text-primary uppercase tracking-[0.3em] hover:tracking-[0.4em] transition-all flex items-center space-x-2">
              <span>View Full History</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="bg-white rounded-[32px] border border-slate-200 shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Artifact ID</th>
                    <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Flow Type</th>
                    <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Processing Time</th>
                    <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-10 py-6 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { id: 'TRX-9921-A', flow: 'WORD → EXCEL', time: '0.8s', status: 'SUCCESS' },
                    { id: 'TRX-9920-B', flow: 'EXCEL → WORD', time: '1.2s', status: 'SUCCESS' },
                    { id: 'TRX-9919-C', flow: 'WORD → EXCEL', time: '0.9s', status: 'VERIFIED' },
                  ].map((item, i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-all">
                      <td className="px-10 py-6">
                        <div className="flex items-center space-x-4">
                          <div className={`p-2 rounded-xl bg-slate-100 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all`}>
                            {item.flow.includes('EXCEL') ? <Table size={16} /> : <FileText size={16} />}
                          </div>
                          <span className="text-xs font-black text-slate-900 tracking-wider uppercase italic">{item.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-[10px] font-bold text-slate-500 tracking-widest">{item.flow}</td>
                      <td className="px-6 py-6">
                        <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400">
                          <Clock size={12} />
                          <span>{item.time}</span>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <Badge variant={item.status === 'SUCCESS' ? 'success' : 'neutral'}>{item.status}</Badge>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <button className="text-slate-300 hover:text-primary transition-colors"><MoreVertical size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      {/* 5. INDUSTRIAL FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-24 px-12 mt-20">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <RefreshCcw className="text-primary" size={24} />
              <span className="text-2xl font-black tracking-tighter uppercase">DocuMatrix</span>
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 leading-relaxed">
              Industrial grade bidirectional transformation infrastructure. Engineered for high-stakes governance and accuracy.
            </p>
          </div>
          
          {[
            { title: 'Protocol', items: ['Core Engine', 'Sync Schema', 'Vault Security', 'API'] },
            { title: 'Governance', items: ['Privacy Policy', 'Audit Logs', 'Compliance', 'Ethics'] },
            { title: 'Engineering', items: ['Bogdan Ticu', 'Changelog', 'Region Status', 'Support'] }
          ].map((col) => (
            <div key={col.title} className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-900">{col.title}</h4>
              <ul className="space-y-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                {col.items.map((item) => (
                  <li key={item} className="hover:text-primary transition-colors cursor-pointer">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="max-w-[1440px] mx-auto pt-24 mt-24 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center space-y-8 sm:space-y-0">
          <div className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
            &copy; 2026 BOGDAN TICU &bull; ALL RIGHTS RESERVED
          </div>
          <div className="flex space-x-12 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
            <Cloud size={20} />
            <Server size={20} />
            <Database size={20} />
          </div>
        </div>
      </footer>

      {/* GLOBAL KEYFRAMES */}
      <style jsx global>{`
        @keyframes scan {
          from { transform: translateY(-100%); }
          to { transform: translateY(400%); }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
      `}</style>
    </div>
  );
}
