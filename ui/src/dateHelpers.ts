export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
}

export function endOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
}

type ReadonlyArrayWithDate = ReadonlyArray<{ readonly date: Date }>;

export function sortByDate(data: ReadonlyArrayWithDate): ReadonlyArrayWithDate {
  return data.slice().sort((a, b) => b.date.getTime() - a.date.getTime());
}