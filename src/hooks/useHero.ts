// hooks/useHero.ts
import { useState } from "react";

interface HeroData {
  title: string;
  subtitle: string;
  ctaText: string;
  imageUrl?: string;
}

export const useHero = (initialData: HeroData) => {
  const [hero, setHero] = useState<HeroData>(initialData);
  return { hero, setHero };
};
