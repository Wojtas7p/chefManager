// components/shedule/SheduleEditor.tsx


'use client';

import { useEffect, useState } from 'react';
import { saveSchedule } from '@/lib/scheduleApi';
import { User } from '@/types/user';
import { Schedule } from '@/types/schedule';

interface Props {
  month: string;
  onSaved: () => void;
}

export default function ScheduleEditor({ month, onSaved }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [schedule, setSchedule] = useState<Record<string, any[]>>({});

  useEffect(() => {
    fetch('http://localhost:3000/api/users', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
    })
      .then(res => res.json())
      .then(setUsers);
  }, []);

  const daysInMonth = new Date(
    Number(month.split('-')[0]),
    Number(month.split('-')[1]),
    0
  ).getDate();

  const save = async () => {
    const payload: Schedule = {
      month,
      users: Object.entries(schedule).map(([user, days]) => ({
        user,
        days,
      })),
    };

    await saveSchedule(payload);
    onSaved();
  };

  return (
    <div>
      <h3>Utwórz / edytuj grafik</h3>

      {users.map(u => (
        <div key={u._id}>
          <label>
            <input
              type="checkbox"
              onChange={e => {
                if (!e.target.checked) {
                  const copy = { ...schedule };
                  delete copy[u._id];
                  setSchedule(copy);
                } else {
                  setSchedule({
                    ...schedule,
                    [u._id]: [],
                  });
                }
              }}
            />
            {u.name}
          </label>

          {schedule[u._id] && (
            <div>
              {Array.from({ length: daysInMonth }).map((_, i) => (
                <div key={i}>
                  Dzień {i + 1}
                  <input
                    type="time"
                    onChange={e => {
                      const days = [...schedule[u._id]];
                      days[i] = {
                        day: i + 1,
                        ...days[i],
                        startHour: e.target.value,
                      };
                      setSchedule({ ...schedule, [u._id]: days });
                    }}
                  />
                  <input
                    type="time"
                    onChange={e => {
                      const days = [...schedule[u._id]];
                      days[i] = {
                        day: i + 1,
                        ...days[i],
                        endHour: e.target.value,
                      };
                      setSchedule({ ...schedule, [u._id]: days });
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <button onClick={save}>Zapisz grafik</button>
    </div>
  );
}
