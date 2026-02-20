// lib/scheduleApi.ts


import { Schedule } from '@/types/schedule';

const API =  "/api";

export async function getSchedule(month: string): Promise<Schedule | null> {
  const res = await fetch(`${API}/schedule?month=${month}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
  });

  if (!res.ok) {
    throw new Error('GET schedule failed');
  }

  const data = await res.json();

  if (!data || !data.schedule) {
    return null;
  }

  return data.schedule;
}



export async function saveSchedule(schedule: Schedule): Promise<void> {
  const res = await fetch(`${API}/schedule`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
    body: JSON.stringify(schedule),
  });

  if (!res.ok) {
    throw new Error('POST /schedule failed');
  }
}
