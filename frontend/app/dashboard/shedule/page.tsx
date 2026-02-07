// dashboard/shedule/page.tsx

'use client';

import { useState } from 'react';
import ScheduleEditor from '@/components/shedule/SheduleEditor';
import ScheduleView from '@/components/shedule/ScheduleView';

export default function SchedulePage() {
  const [month, setMonth] = useState('');
  const [reload, setReload] = useState(false);

  return (
    <div>
      <h1>Grafik pracy</h1>

      <input
        type="month"
        value={month}
        onChange={e => setMonth(e.target.value)}
      />

      {month && (
        <>
          <ScheduleEditor month={month} onSaved={() => setReload(r => !r)} />
          <ScheduleView month={month} reload={reload} />
        </>
      )}
    </div>
  );
}

