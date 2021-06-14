const word: string = 'world';

export function hello(world: string = word): string {
  return `Hello ${world}!`;
}
