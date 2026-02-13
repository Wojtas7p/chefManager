export const WEEK_DAYS = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Nd'];
export const MONTHS_SHORT = ['Sty','Lut','Mar','Kwi','Maj','Cze','Lip','Sie','Wrz','Paź','Lis','Gru'];

export function generateMonthCalendar(month: string) {
  const [year, monthIndex] = month.split('-').map(Number);
  const daysInMonth = new Date(year, monthIndex, 0).getDate();

  return Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const date = new Date(year, monthIndex - 1, day);
    const jsDay = date.getDay();
    const weekDayIndex = jsDay === 0 ? 6 : jsDay - 1;

    return { 
      dayNumber: day, 
      weekDay: WEEK_DAYS[weekDayIndex],
      monthShort: MONTHS_SHORT[monthIndex - 1] 
    };
  });
}

