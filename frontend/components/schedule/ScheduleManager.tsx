'use client';

import { useEffect, useState } from 'react';
import { getSchedule, saveSchedule } from '@/lib/scheduleApi';
import { getUsers } from '@/lib/api';
import { Schedule } from '@/types/schedule';
import { User } from '@/types/user';
import ScheduleGrid from './ScheduleGrid';
import { generateMonthCalendar } from '@/lib/calendar';

interface Props {
  month: string;
  exportRef?: React.RefObject<HTMLDivElement | null>;
  isExporting?: boolean;
}
export default function ScheduleManager({ month, exportRef, isExporting }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [scheduleData, setScheduleData] = useState<Schedule | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [localSchedule, setLocalSchedule] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  const monthCalendar = generateMonthCalendar(month);



  const buildFullUserSchedule = (userSchedule: any[] = []) => {
    return monthCalendar.map(d => {
      const existing = userSchedule.find(x => x.day === d.dayNumber);
      return existing ? { ...existing } : { day: d.dayNumber };
    });
  };

  useEffect(() => {
    setLoading(true);
    setIsEditing(false);

    Promise.all([getUsers(), getSchedule(month)])
      .then(([usersData, schedule]) => {
        setUsers(usersData || []);

        const copy: Record<string, any[]> = {};

        (schedule?.users || []).forEach(u => {
          if (!u.user) return;
          const userId = typeof u.user === 'string' ? u.user : u.user._id;
          copy[userId] = buildFullUserSchedule(u.days);
        });

        (usersData || []).forEach((u: User) => {
          if (!copy[u._id]) copy[u._id] = buildFullUserSchedule([]);
        });

        setScheduleData(schedule || null);
        setLocalSchedule(copy);
      })
      .finally(() => setLoading(false));
  }, [month]);

  const handleChange = (userId: string, dayIndex: number, newDay: any) => {
    setLocalSchedule(prev => {
      const copy = { ...prev };
      const userDays = copy[userId] ? [...copy[userId]] : buildFullUserSchedule();
      userDays[dayIndex] = newDay;
      copy[userId] = userDays;
      return copy;
    });
  };

  const handleSave = async () => {
    const payload: Schedule = {
      month,
      users: Object.entries(localSchedule).map(([userId, days]) => {
        const foundUser = users.find(u => u._id === userId);
        return {
          user: foundUser ? { _id: foundUser._id, name: foundUser.name } : null,
          days,
        };
      }),
    };

    await saveSchedule(payload);

    const updated = await getSchedule(month);
    if (updated) {
      setScheduleData(updated);

      const copy: Record<string, any[]> = {};
      updated.users.forEach(u => {
        if (!u.user) return;
        const userId = typeof u.user === 'string' ? u.user : u.user._id;
        copy[userId] = buildFullUserSchedule(u.days);
      });

      users.forEach(u => {
        if (!copy[u._id]) copy[u._id] = buildFullUserSchedule([]);
      });

      setLocalSchedule(copy);
    }

    setIsEditing(false);
  };

  const handleCancel = () => {
    const copy: Record<string, any[]> = {};
    scheduleData?.users.forEach(u => {
      if (!u.user) return;
      const userId = typeof u.user === 'string' ? u.user : u.user._id;
      copy[userId] = buildFullUserSchedule(u.days);
    });

    users.forEach(u => {
      if (!copy[u._id]) copy[u._id] = buildFullUserSchedule([]);
    });

    setLocalSchedule(copy);
    setIsEditing(false);
  };

  if (loading) return <div className="text-center p-4">Ładowanie grafiku...</div>;

  return (
    <div>
      <div className="flex gap-2 mb-4 pl-5">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded"
          onClick={() => setIsEditing(true)}
          disabled={isEditing}
        >
          Edytuj
        </button>
        {isEditing && (
          <>
            <button
              className="px-3 py-1 bg-green-500 text-white rounded"
              onClick={handleSave}
            >
              Zapisz
            </button>
            <button
              className="px-3 py-1 bg-gray-500 text-white rounded"
              onClick={handleCancel}
            >
              Anuluj
            </button>
          </>
        )}
      </div>

   <div
        ref={exportRef}
        className={`w-280 px-5 ${isExporting ? '' : 'overflow-auto max-h-[300px]'}`}
      >
        <ScheduleGrid
          users={users}
          schedule={localSchedule}
          monthCalendar={monthCalendar}
          onChange={isEditing ? handleChange : undefined}
          isExporting={isExporting}
        />
      </div>
    </div>
  );
}
