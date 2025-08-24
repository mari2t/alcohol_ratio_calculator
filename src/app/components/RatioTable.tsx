"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calcAlcoholGrams } from "@/lib/calcGrams";

/**
 * Propsの型を定義
 */
type RatioTableProps = {
  alcoholPercentage: string; // 入力されたアルコール度数(%)を文字列で受け取る
  amount: number[];
  mixedRatios: number[];
  ratio: number;
};

export function RatioTable({
  alcoholPercentage,
  amount,
  mixedRatios,
  ratio,
}: RatioTableProps) {
  const mixedPercentage = parseFloat(mixedRatios[ratio - 2].toFixed(0));

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-100 to-purple-100">
        <CardTitle className="text-xl flex flex-col items-center">
          <span className="text-center font-bold mb-2">
            1：{ratio} で割る場合
          </span>
          <span className="text-base">
            割った後のアルコール度数　{mixedPercentage}　%
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold w-1/4">
                アルコール飲料 (ml)
              </TableHead>
              <TableHead className="font-semibold w-1/4">割材 (ml)</TableHead>
              <TableHead className="font-semibold w-1/4">合計 (ml)</TableHead>
              <TableHead className="font-semibold w-1/4">
                摂取アルコール量 (g)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {amount.map((amount, index) => {
              // 摂取アルコール量(g)を計算
              const grams = calcAlcoholGrams(
                parseFloat(alcoholPercentage),
                amount
              );

              return (
                <TableRow
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"}
                >
                  <TableCell className="font-medium w-1/4">{amount}</TableCell>
                  <TableCell className="w-1/4">{amount * ratio}</TableCell>
                  <TableCell className="w-1/4">
                    {amount + amount * ratio}
                  </TableCell>
                  <TableCell className="w-1/4">{grams.toFixed(1)} g</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
