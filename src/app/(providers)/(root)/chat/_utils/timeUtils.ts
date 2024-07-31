export function addHours(date: Date, hours: number): Date {
    date.setHours(date.getHours() + hours);
    return date;
  }
  
 export function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { month: 'numeric', day: 'numeric', weekday: 'short' };
    return date.toLocaleDateString('ko-KR', options);
  }