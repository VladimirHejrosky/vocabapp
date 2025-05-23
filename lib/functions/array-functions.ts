export function getRandomItems<T>(array: T[], count: number = 10): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
