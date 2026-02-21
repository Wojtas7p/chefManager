"use client";
import { useState, useEffect } from "react";
import "./../../app/globals.css";
import Link from "next/link";

export default function HeaderSection() {
  const videoPlaylist = [
    "/moviesHome1.mp4",
    "/moviesHome2.mp4",
    "/moviesHome3.mp4"
  ];

  const [currentVideo, setCurrentVideo] = useState(0);
  const CLIP_DURATION = 8000; 

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videoPlaylist.length);
    }, CLIP_DURATION);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="headerSection" className="w-full min-h-screen pt-20 px-10 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center max-w-6xl w-full px-6 relative justify-center">
       <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6 relative z-0">
            Gastronomia bez wysiłku
          </h1>
        <div className="animate-fadeIn w-80 absolute z-10 input-form bg-white p-10 bg-white/60 mt-50
    backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 
        " >
           <div className="flex justify-center gap-6 mb-6 text-[#2E8A80]">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2" /></svg>
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
           </div>
        <p className="text-gray-800 font-medium text-lg my-8">Zarządzanie gastronomią w jednym miejscu</p>
          <Link href="/auth"className="button-form
          hover:opacity-90 transition-all shadow-lg font-semibold text-md">
            Zacznij teraz
          </Link>
        </div>
       
        <div className="relative w-200 z-0">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-video bg-gray-100">
            {videoPlaylist.map((src, index) => (
              <video
                key={src}
                src={src}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                  index === currentVideo ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              />
            ))}
          </div>
    
          <div className="flex gap-2 mt-6 justify-center">
            {videoPlaylist.map((_, index) => (
              <div key={index} className="h-1.5 w-12 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-600 transition-all ease-linear"
                  style={{ 
                    width: index === currentVideo ? '100%' : '0%',
                    transitionDuration: index === currentVideo ? `${CLIP_DURATION}ms` : '0ms'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}