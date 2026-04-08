import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Premium Navigation */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              className="w-8 h-8 text-[#1DA1F2]"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M23 3a10.9 10.9 0 0 1-3.14.86A4.48 4.48 0 0 0 22.4.36a9.08 9.08 0 0 1-2.88 1.1 4.52 4.52 0 0 0-7.72 4.13A12.82 12.82 0 0 1 1.64 1.15a4.52 4.52 0 0 0 1.4 6.03A4.48 4.48 0 0 1 .96 6.6v.06a4.52 4.52 0 0 0 3.63 4.43 4.52 4.52 0 0 1-2.04.08 4.52 4.52 0 0 0 4.22 3.14A9.06 9.06 0 0 1 1 19.54a12.78 12.78 0 0 0 6.92 2.03c8.3 0 12.84-6.88 12.84-12.85 0-.2 0-.42-.01-.63A9.18 9.18 0 0 0 23 3z" />
            </svg>
            <span className="text-xl font-bold tracking-tight text-slate-900">Sentiment AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-slate-600 hover:text-[#1DA1F2] transition-colors">Features</Link>
            <Link href="#about" className="text-sm font-medium text-slate-600 hover:text-[#1DA1F2] transition-colors">Technical Details</Link>
            <Link href="/sentiment" className="bg-[#1DA1F2] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#1a8cd8] transition-all shadow-sm">Get Started</Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-40">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-50 -z-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold mb-8 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              POWERED BY NLP
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
              Decode the pulse of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1DA1F2] to-blue-700">Twitter Sentiment</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg lg:text-xl text-slate-600 mb-10 leading-relaxed">
              Unleash the power of AI to instantly classify public opinion. Built on a dataset of 1.6 million tweets, our model delivers high-precision sentiment analysis.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/sentiment" className="w-full sm:w-auto px-8 py-4 bg-[#1DA1F2] text-white rounded-2xl font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-200">
                Start Analyzing
              </Link>
              <Link href="#features" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900">Standardizing Sentiment Analysis</h2>
              <p className="text-slate-500 mt-4">Powerful features designed for researchers and marketing professionals.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Real-Time Processing", desc: "Instantaneous classification of text strings using optimized Flask backend.", icon: "⚡" },
                { title: "Probabilistic Accuracy", desc: "Trained using TF-IDF vectorization and Logistic Regression for reliable results.", icon: "🎯" },
                { title: "Elegant Interface", desc: "A modern, responsive dashboard designed for clarity and ease of use.", icon: "💎" }
              ].map((feature, i) => (
                <div key={i} className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-white transition-all hover:shadow-2xl hover:shadow-blue-50">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <svg
              className="w-6 h-6 text-[#1DA1F2]"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M23 3a10.9 10.9 0 0 1-3.14.86A4.48 4.48 0 0 0 22.4.36a9.08 9.08 0 0 1-2.88 1.1 4.52 4.52 0 0 0-7.72 4.13A12.82 12.82 0 0 1 1.64 1.15a4.52 4.52 0 0 0 1.4 6.03A4.48 4.48 0 0 1 .96 6.6v.06a4.52 4.52 0 0 0 3.63 4.43 4.52 4.52 0 0 1-2.04.08 4.52 4.52 0 0 0 4.22 3.14A9.06 9.06 0 0 1 1 19.54a12.78 12.78 0 0 0 6.92 2.03c8.3 0 12.84-6.88 12.84-12.85 0-.2 0-.42-.01-.63A9.18 9.18 0 0 0 23 3z" />
            </svg>
            <span className="text-lg font-bold">Sentiment AI</span>
          </div>
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Twitter Sentiment Analysis Project. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-slate-400 hover:text-white transition-colors cursor-pointer">Privacy</span>
            <span className="text-slate-400 hover:text-white transition-colors cursor-pointer">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}