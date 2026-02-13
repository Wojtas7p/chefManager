import { User } from '@/types/user';
import { ScheduleDay } from '@/types/schedule';

interface Props {
  users: User[];
  schedule: Record<string, ScheduleDay[]>;
  monthCalendar: { dayNumber: number; weekDay: string; monthShort: string }[];
  isExporting?: boolean;
  onChange?: (userId: string, dayIndex: number, newDay: ScheduleDay) => void;
}

export default function ScheduleGrid({ users, schedule, monthCalendar, onChange }: Props) {
  return (

      
      <table className="w-full ">
        <thead >
          <tr>
            <th className="sticky top-0 bg-[#d5d5d5] z-20 text-start"> 
                        <div className=' border p-1 h-13'>
                             Pracownicy  
                        </div>
                  
            </th>

            {monthCalendar.map(d => (
              <th
                key={d.dayNumber}
                className="sticky top-0 bg-[#d5d5d5] z-20  text-start"
              > 
                <div className='border p-1 h-13'>
                <div className="text-start">{d.weekDay}</div>
                <div className="text-xs flex gap-2">
                  <p>{d.monthShort}</p>
                  <p>{d.dayNumber}</p>
                </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {users.map(user => {
            const userSchedule = schedule[user._id] ?? [];

            return (
              <tr key={user._id}>
                <td >
                  <p className="py-1 px-2 border w-50 overflow-hidden">{user.name}</p>
                </td>

                {monthCalendar.map((d, i) => {
                  const dayData = userSchedule[i] || { day: d.dayNumber };

                  return (
                    <td key={d.dayNumber} className="border p-1 text-center ">
                      {onChange ? (
                        <div className="flex flex-col gap-1">
                          <input
                            type="time"
                            value={dayData.startHour ?? ''}
                            onChange={e =>
                              onChange(user._id, i, {
                                ...dayData,
                                startHour: e.target.value
                              })
                            }
                          />
                          <input
                            type="time"
                            value={dayData.endHour ?? ''}
                            onChange={e =>
                              onChange(user._id, i, {
                                ...dayData,
                                endHour: e.target.value
                              })
                            }
                          />
                        </div>
                      ) : (
                        <div className="flex gap-1 justify-center w-30 text-sm font-semibold">
                          <span>{dayData.startHour ?? ' '}</span>
                          <span>-</span>
                          <span>{dayData.endHour ?? ' '}</span>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
  
  );
}

