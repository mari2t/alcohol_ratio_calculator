"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RatioTable } from "./RatioTable";

export default function RatioCalculator() {
  const [alcoholPercentage, setAlcoholPercentage] = useState<string>("");
  const [showTable, setShowTable] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  // 1:2, 1:3, 1:4, 1:5 それぞれの混合後アルコール度数を保持するステート
  const [mixedRatios, setMixedRatios] = useState<number[]>([]);

  // アルコールの飲料の量ml
  const alcoholAmount: number[] = [20, 40, 60, 80, 100];

  // 割材の比率
  const ratioNumbers: number[] = [2, 3, 4, 5, 6];

  const alertText = "アルコール度数は1～99％の範囲で入力してください。";

  /**
   * 計算ボタンを押したとき
   */
  const handleCalculate = () => {
    const percentage = parseFloat(inputValue);
    if (percentage <= 0 || percentage >= 100) {
      alert(alertText);
      return;
    }
    if (!isNaN(percentage)) {
      setAlcoholPercentage(inputValue);
      setMixedRatios(calculateMixedPercentage(percentage, ratioNumbers));
      setShowTable(true);
    } else {
      setAlcoholPercentage("");
      setMixedRatios([]);
      setShowTable(false);
    }
  };

  /**
   * (アルコール度数, アルコール量, 割材量) → 実際のアルコール度数
   */
  const calculateMixedPercentage = (
    percentage: number,
    ratioNumber: number[]
  ): number[] => {
    if (isNaN(percentage)) return [];

    const amountAlcohol = 1;
    const inputFraction = percentage / 100;
    const pureAlcohol = amountAlcohol * inputFraction;

    return ratioNumber.map((ratio) => {
      const mixer = amountAlcohol * ratio;
      const totalVolume = amountAlcohol + mixer;
      return (pureAlcohol / totalVolume) * 100;
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="m-4 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center">
        <CardTitle className="text-2xl font-bold w-full">
          割った後のアルコール度数計算アプリ
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4 mb-6">
          <label htmlFor="alcohol-input" className="text-lg font-medium">
            アルコール飲料の度数
          </label>
          <div className="flex items-center">
            <Input
              id="alcohol-input"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="度数"
              className="w-24 text-center"
            />
            <span className="ml-2 text-lg">％</span>
          </div>
          <Button
            onClick={handleCalculate}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            計算
          </Button>
        </div>
        <label
          htmlFor="alcohol-input"
          className="text-sm font-medium text-gray-500"
        >
          {alertText}
        </label>

        {showTable && (
          <div className="mt-8 space-y-10">
            {ratioNumbers.map((ratio) => (
              <RatioTable
                key={ratio}
                alcoholPercentage={alcoholPercentage}
                amount={alcoholAmount}
                mixedRatios={mixedRatios}
                ratio={ratio}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
