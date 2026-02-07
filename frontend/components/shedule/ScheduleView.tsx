// components/shedule/SheduleView.tsx


'use client';

import { useEffect, useState } from 'react';
import { getSchedule } from '@/lib/scheduleApi';
import { Schedule } from '@/types/schedule';

interface Props {
  month: string;
  reload: boolean;
}

export default function ScheduleView({ month, reload }: Props) {
  const [data, setData] = useState<Schedule | null>(null);

  useEffect(() => {
    getSchedule(month).then(setData);
  }, [month, reload]);

  if (!data) return <p>Brak grafiku</p>;

  return (
    <div>
      <h3>Podgląd</h3>

      {data.users.map(u => (
        <div key={u.user}>
          <strong>{u.user}</strong>
          <table>
            <tbody>
              {u.days.map(d => (
                <tr key={d.day}>
                  <td>{d.day}</td>
                  <td>{d.startHour || '-'}</td>
                  <td>{d.endHour || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
