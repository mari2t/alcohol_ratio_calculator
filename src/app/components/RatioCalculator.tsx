"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RatioTable } from "./RatioTable";

export default function RatioCalculator() {
  const [alcoholPercentage, setAlcoholPercentage] = useState<string>("");
  const [showTable, setShowTable] = useState<boolean>(false);

  // 1:2, 1:3, 1:4, 1:5 それぞれの混合後アルコール度数を保持するステート
  const [mixedRatios, setMixedRatios] = useState<number[]>([]);
  const [mixedRatio12, setMixedRatio12] = useState<number>(0);
  const [mixedRatio13, setMixedRatio13] = useState<number>(0);
  const [mixedRatio14, setMixedRatio14] = useState<number>(0);
  const [mixedRatio15, setMixedRatio15] = useState<number>(0);

  // アルコールの飲料の量ml
  const alcoholAmount: number[] = [20, 40, 60, 80, 100];

  // 割材の比率
  const ratioNumbers: number[] = [2, 3, 4, 5];

  // 1:2 の (アルコール ml, 割材 ml) のペア
  const ratioPairs12: number[][] = [
    [20, 40],
    [40, 80],
    [60, 120],
    [80, 160],
    [100, 200],
  ];

  // 1:3 の (アルコール ml, 割材 ml) のペア
  const ratioPairs13: number[][] = [
    [20, 60],
    [40, 120],
    [60, 180],
    [80, 240],
    [100, 300],
  ];

  // 1:4 の (アルコール ml, 割材 ml) のペア
  const ratioPairs14: number[][] = [
    [20, 80],
    [40, 160],
    [60, 240],
    [80, 320],
    [100, 400],
  ];

  // 1:5 の (アルコール ml, 割材 ml) のペア
  const ratioPairs15: number[][] = [
    [20, 100],
    [40, 200],
    [60, 300],
    [80, 400],
    [100, 500],
  ];

  /**
   * 計算ボタンを押したとき
   */
  const handleCalculate = () => {
    const percentage = parseFloat(alcoholPercentage);
    if (!isNaN(percentage)) {
      // 配列をセット
      setMixedRatios(calculateMixedPercentage(percentage, 1, ratioNumbers));

      // 各比率の個別計算
      setMixedRatio12(calculateMixedPercentage(percentage, 1, [2])[0]);
      setMixedRatio13(calculateMixedPercentage(percentage, 1, [3])[0]);
      setMixedRatio14(calculateMixedPercentage(percentage, 1, [4])[0]);
      setMixedRatio15(calculateMixedPercentage(percentage, 1, [5])[0]);

      setShowTable(true);
    } else {
      setMixedRatios([]);
      setShowTable(false);
    }
  };

  /**
   * (アルコール度数, アルコール量, 割材量) → 実際のアルコール度数
   */
  const calculateMixedPercentage = (
    percentage: number,
    a: number,
    ratioNumber: number[]
  ): number[] => {
    if (isNaN(percentage)) return [];

    const inputFraction = percentage / 100;
    const pureAlcohol = a * inputFraction;

    const results: number[] = [];
    for (let i = 0; i < ratioNumber.length; i++) {
      const ratio = ratioNumber[i];
      const mixer = a * ratio;
      const totalVolume = a + mixer;
      const mixedPercentage = (pureAlcohol / totalVolume) * 100;
      results.push(mixedPercentage);
    }

    return results; // 計算結果を返す
  };

  /**
   * 摂取アルコール量（g）を計算
   *  -> アルコール量 (ml) × (度数 / 100) × 0.789
   */
  const calculateAlcoholGrams = (
    percentage: number,
    alcoholMl: number
  ): number => {
    const fraction = percentage / 100;
    // アルコール量(ml) × 度数(小数) = 純アルコール量(ml)
    // 純アルコール1ml ≒ 0.789g
    return alcoholMl * fraction * 0.789;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>アルコール度数計算アプリ</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <div className="">飲料のアルコール度数 </div>
          <Input
            id="alcohol-input"
            type="number"
            value={alcoholPercentage}
            onChange={(e) => setAlcoholPercentage(e.target.value)}
            placeholder="アルコール度数 (%)"
            className="max-w-[100px]"
          />{" "}
          <div className="">％</div>
          <Button onClick={handleCalculate}>計算</Button>
        </div>

        {showTable && (
          <div className="mt-6 space-y-8">
            {/* --- 1:2 のテーブル --- */}
            <RatioTable
              alcoholPercentage={alcoholPercentage}
              amount={alcoholAmount}
              mixedRatio={2}
              ratio={2}
            />
            <section>
              <h2 className="text-lg font-semibold mb-2">1：2 の場合</h2>
              <p>割った後のアルコール度数：{mixedRatio12.toFixed(1)}%</p>
              <Table className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>アルコール (ml)</TableHead>
                    <TableHead>割材 (ml)</TableHead>
                    <TableHead>合計 (ml)</TableHead>
                    <TableHead>摂取アルコール量 (g)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ratioPairs12.map(([alcoholMl, mixerMl], index) => {
                    // 摂取アルコール量(g)を計算
                    const grams = calculateAlcoholGrams(
                      parseFloat(alcoholPercentage),
                      alcoholMl
                    );

                    return (
                      <TableRow
                        key={index}
                        className={index % 2 === 0 ? "bg-gray-100" : ""}
                      >
                        <TableCell>{alcoholMl}</TableCell>
                        <TableCell>{alcoholMl * 2}</TableCell>
                        <TableCell>{alcoholMl + alcoholMl * 2}</TableCell>
                        <TableCell>{grams.toFixed(1)} g</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </section>

            {/* --- 1:3 のテーブル --- */}
            <section>
              <h2 className="text-lg font-semibold mb-2">1：3 の場合</h2>
              <p>割った後のアルコール度数：{mixedRatio13.toFixed(1)}%</p>
              <Table className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>アルコール (ml)</TableHead>
                    <TableHead>割材 (ml)</TableHead>
                    <TableHead>合計 (ml)</TableHead>
                    <TableHead>摂取アルコール量 (g)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ratioPairs13.map(([alcoholMl, mixerMl], index) => {
                    const grams = calculateAlcoholGrams(
                      parseFloat(alcoholPercentage),
                      alcoholMl
                    );
                    return (
                      <TableRow
                        key={index}
                        className={index % 2 === 0 ? "bg-gray-100" : ""}
                      >
                        <TableCell>{alcoholMl}</TableCell>
                        <TableCell>{alcoholMl * 3}</TableCell>
                        <TableCell>{alcoholMl + alcoholMl * 3}</TableCell>
                        <TableCell>{grams.toFixed(1)} g</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </section>

            {/* --- 1:4 のテーブル --- */}
            <section>
              <h2 className="text-lg font-semibold mb-2">1：4 の場合</h2>
              <p>割った後のアルコール度数：{mixedRatio14.toFixed(1)}%</p>
              <Table className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>アルコール (ml)</TableHead>
                    <TableHead>割材 (ml)</TableHead>
                    <TableHead>合計 (ml)</TableHead>
                    <TableHead>摂取アルコール量 (g)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ratioPairs14.map(([alcoholMl, mixerMl], index) => {
                    const grams = calculateAlcoholGrams(
                      parseFloat(alcoholPercentage),
                      alcoholMl
                    );
                    return (
                      <TableRow
                        key={index}
                        className={index % 2 === 0 ? "bg-gray-100" : ""}
                      >
                        <TableCell>{alcoholMl}</TableCell>
                        <TableCell>{mixerMl}</TableCell>
                        <TableCell>{alcoholMl + mixerMl}</TableCell>
                        <TableCell>{grams.toFixed(1)} g</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </section>

            {/* --- 1:5 のテーブル --- */}
            <section>
              <h2 className="text-lg font-semibold mb-2">1：5 の場合</h2>
              <p>割った後のアルコール度数：{mixedRatio15.toFixed(1)}%</p>
              <Table className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>アルコール (ml)</TableHead>
                    <TableHead>割材 (ml)</TableHead>
                    <TableHead>合計 (ml)</TableHead>
                    <TableHead>摂取アルコール量 (g)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ratioPairs15.map(([alcoholMl, mixerMl], index) => {
                    const grams = calculateAlcoholGrams(
                      parseFloat(alcoholPercentage),
                      alcoholMl
                    );
                    return (
                      <TableRow
                        key={index}
                        className={index % 2 === 0 ? "bg-gray-100" : ""}
                      >
                        <TableCell>{alcoholMl}</TableCell>
                        <TableCell>{mixerMl}</TableCell>
                        <TableCell>{alcoholMl + mixerMl}</TableCell>
                        <TableCell>{grams.toFixed(1)} g</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </section>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
