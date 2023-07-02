import Rand from "rand-seed";

export function randSeedRange(seed: string, from: number, to: number): number {
  const rand = new Rand(seed).next();
	const range = to - from
  const number = range * rand + from;
  return number;
}
