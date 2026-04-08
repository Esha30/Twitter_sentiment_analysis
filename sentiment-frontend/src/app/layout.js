import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Twitter Sentiment AI | Professional Analysis",
  description: "Leverage advanced machine learning to analyze Twitter sentiment in real-time. Fast, accurate, and professional.",
  icons: {
    icon: "/twitter.png",
  },
  openGraph: {
    title: "Twitter Sentiment AI",
    description: "Real-time sentiment analysis using Machine Learning.",
    images: ["/twitter.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#f8fafc] text-slate-900 selection:bg-blue-100">
        {children}
      </body>
    </html>
  );
}