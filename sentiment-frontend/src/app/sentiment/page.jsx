"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function SentimentPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab ] = useState("manual"); // 'manual' or 'live'
  const [liveQuery, setLiveQuery] = useState("");
  const [liveTweets, setLiveTweets] = useState([]);

  // Manual analysis submit
  const handleSubmit = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setResult(null);
    setMetrics(null);
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Server Error");
      }

      const data = await res.json();
      setResult(data.prediction);
      setMetrics(data.metrics);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to connect to the backend server.");
    } finally {
      setLoading(false);
    }
  };

  // Live fetch simulation
  const handleLiveFetch = async () => {
    if (!liveQuery.trim()) return;
    setLoading(true);
    setError("");
    setLiveTweets([]);

    try {
      const res = await fetch("http://127.0.0.1:5000/fetch_live", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: liveQuery }),
      });
      const data = await res.json();
      setLiveTweets(data.tweets);
    } catch (err) {
      setError("Failed to fetch live data simulation.");
    } finally {
      setLoading(false);
    }
  };

  const getResultColor = (val) => {
    const sentiment = val || result;
    if (sentiment?.includes("Positive")) return "from-green-500 to-emerald-600 shadow-green-100";
    if (sentiment?.includes("Negative")) return "from-red-500 to-rose-600 shadow-red-100";
    if (sentiment?.includes("Neutral")) return "from-blue-400 to-indigo-500 shadow-blue-100";
    return "from-slate-500 to-slate-600 shadow-slate-100";
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <nav className="p-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:bg-blue-50 transition-colors">
              <svg className="w-5 h-5 text-slate-600 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </div>
            <span className="font-semibold text-slate-600">Dashboard</span>
          </Link>
          <div className="flex bg-white p-1 rounded-2xl shadow-inner border border-slate-100">
            <button 
              onClick={() => setActiveTab("manual")}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === "manual" ? "bg-[#1DA1F2] text-white shadow-md" : "text-slate-400 hover:text-slate-600"}`}
            >
              Manual Analysis
            </button>
            <button 
              onClick={() => setActiveTab("live")}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === "live" ? "bg-[#1DA1F2] text-white shadow-md" : "text-slate-400 hover:text-slate-600"}`}
            >
              Live Fetch (API)
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8">
          
          {/* Input Section */}
          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200 border border-slate-100 p-8 md:p-10">
            {activeTab === "manual" ? (
              <>
                <div className="mb-8">
                  <h1 className="text-3xl font-black text-slate-900 mb-2">Manual Input</h1>
                  <p className="text-slate-500 text-sm font-medium italic">Paste raw text from any tweet below.</p>
                </div>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Analyze a specific tweet..."
                  className="w-full h-48 p-6 text-lg bg-slate-50 rounded-3xl border-2 border-transparent focus:border-blue-400 focus:bg-white transition-all outline-none resize-none text-slate-800 font-medium"
                />
                <button
                  onClick={handleSubmit}
                  disabled={loading || !text.trim()}
                  className={`w-full mt-6 py-4 rounded-2xl font-bold text-lg text-white shadow-lg transition-all active:scale-[0.98] ${
                    loading || !text.trim() ? "bg-slate-200 text-slate-400" : "bg-[#1DA1F2] hover:bg-[#1a8cd8]"
                  }`}
                >
                  {loading ? "Analyzing..." : "Analyze Sentiment"}
                </button>
              </>
            ) : (
              <>
                <div className="mb-8">
                  <h1 className="text-3xl font-black text-slate-900 mb-2">Live API Fetch</h1>
                  <p className="text-slate-500 text-sm font-bold text-orange-400 uppercase tracking-tighter">Mock API Simulation</p>
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-bold text-slate-400 uppercase">Search Keyword</label>
                  <input 
                    type="text"
                    value={liveQuery}
                    onChange={(e) => setLiveQuery(e.target.value)}
                    placeholder="e.g. #Bitcoin, Elon Musk..."
                    className="w-full p-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-blue-400 outline-none font-bold"
                  />
                  <button 
                    onClick={handleLiveFetch}
                    disabled={loading || !liveQuery.trim()}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all"
                  >
                    Fetch Latest Tweets
                  </button>
                </div>
                
                {liveTweets.length > 0 && (
                  <div className="mt-6 space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {liveTweets.map((t) => (
                      <div key={t.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors cursor-pointer" onClick={() => setText(t.text)}>
                        <p className="text-xs font-bold text-blue-500">@{t.user}</p>
                        <p className="text-sm text-slate-700 line-clamp-2">{t.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Results/Metrics Section */}
          <div className="flex flex-col gap-6">
            {result ? (
              <>
                <div className={`p-10 rounded-[2.5rem] bg-gradient-to-br text-white shadow-2xl animate-slide-up ${getResultColor()}`}>
                  <span className="block text-xs font-bold uppercase tracking-[0.2em] mb-4 opacity-70">Analysis Result</span>
                  <div className="text-5xl font-black mb-2">{result}</div>
                  <div className="h-1 w-20 bg-white/20 rounded-full" />
                </div>

                <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 animate-slide-up grid grid-cols-2 gap-4" style={{animationDelay: '100ms'}}>
                   <div className="p-4 bg-slate-50 rounded-2xl">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Polarity</span>
                      <span className="text-2xl font-black text-slate-800">{metrics?.polarity}</span>
                   </div>
                   <div className="p-4 bg-slate-50 rounded-2xl">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Subjectivity</span>
                      <span className="text-2xl font-black text-slate-800">{metrics?.subjectivity}</span>
                   </div>
                   <div className="col-span-2 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                      <span className="text-[10px] font-bold text-blue-400 uppercase block mb-1">NLP Engine (VADER Score)</span>
                      <div className="flex items-center gap-3">
                        <div className="flex-grow h-2 bg-blue-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 transition-all duration-1000" 
                            style={{width: `${(metrics?.vader_compound + 1) * 50}%`}} 
                          />
                        </div>
                        <span className="text-sm font-bold text-blue-700">{metrics?.vader_compound}</span>
                      </div>
                   </div>
                </div>
              </>
            ) : (
              <div className="h-full bg-slate-100 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 p-12 text-center">
                 <svg className="w-16 h-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                 </svg>
                 <p className="font-bold text-lg">Awaiting Input</p>
                 <p className="text-sm">Initiate an analysis or fetch live data to see detailed metrics.</p>
              </div>
            )}
            
            {error && (
              <div className="p-6 bg-red-50 border border-red-100 rounded-3xl text-red-600 font-bold animate-shake text-center">
                {error}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="p-8 text-center">
         <div className="inline-flex items-center gap-4 px-6 py-2 bg-white rounded-full border border-slate-100 shadow-sm text-[10px] font-bold text-slate-400 tracking-widest uppercase">
           <span>NLP V3.1</span>
           <span className="w-1 h-1 rounded-full bg-slate-300" />
           <span>TextBlob 0.20</span>
           <span className="w-1 h-1 rounded-full bg-slate-300" />
           <span>VADER 3.3.2</span>
         </div>
      </footer>
    </div>
  );
}