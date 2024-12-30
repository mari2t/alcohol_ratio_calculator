export function calcAlcoholGrams(
  percentage: number,
  alcoholMl: number
): number {
  const fraction = percentage / 100; // 例: 40% → 0.4
  const pureAlcoholMl = alcoholMl * fraction;
  // 1mlあたり0.789gで計算
  return pureAlcoholMl * 0.789;
}
