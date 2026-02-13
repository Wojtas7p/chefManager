
'use client';

import { useState, useRef } from 'react';
import ScheduleManager from '@/components/schedule/ScheduleManager';
import Image from 'next/image';
import { exportAsImage, exportAsPDF } from '@/lib/exportElement';

const getCurrentMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

export default function SchedulePage() {
  const [month, setMonth] = useState(getCurrentMonth());
  const scheduleRef = useRef<HTMLDivElement>(null); 
  const [isExporting, setIsExporting] = useState(false);

  const exportImage = async () => {
    if (!scheduleRef.current) return;

    setIsExporting(true);
    await new Promise(r => setTimeout(r, 100));

    await exportAsImage(scheduleRef.current, {
      fileName: `grafik-${month}.jpg`
    });

    setIsExporting(false);
  };


   const exportPDF = async () => {
    if (!scheduleRef.current) return;

    setIsExporting(true);
    await new Promise(r => setTimeout(r, 100));

    await exportAsPDF(scheduleRef.current, {
      fileName: `grafik-${month}.pdf`,
      orientation: 'l'
    });

    setIsExporting(false);
  };
  return (
    <main className="main relative">
      <Image
        src="/bgUserPage.png"
        alt="Tło"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-white/60 z-10" />

      <div className="relative z-20 pt-14 flex flex-col items-start w-full">

        <div className='w-full  flex flex-col items-center'>
        <h1>Grafik pracy</h1>

        <input
          type="month"
          value={month}
          onChange={e => setMonth(e.target.value)}
          className="mb-4 p-1 border rounded"
        />

        <div className="flex gap-4 mb-6">
          <button
            onClick={exportImage}
            className="px-4 py-2 rounded bg-teal-600 text-white"
          >
            Pobierz JPG
          </button>

          <button
            onClick={exportPDF}
            className="px-4 py-2 rounded bg-gray-800 text-white"
          >
            Pobierz PDF
          </button>
        </div>
        </div>

        {month && (
          <ScheduleManager month={month} exportRef={scheduleRef}  isExporting={isExporting}/>
        )}
      </div>
    </main>
  );
}
