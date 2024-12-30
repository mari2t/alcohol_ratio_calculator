"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { calcAlcoholGrams } from "@/lib/calcGrams";
import React from "react";

/**
 * Propsの型を定義
 */
type RatioTableProps = {
  alcoholPercentage: string; // 入力されたアルコール度数(%)を文字列で受け取る
  amount: number[];
  mixedRatio: number;
  ratio: number;
};

export function RatioTable({
  alcoholPercentage,
  amount,
  mixedRatio,
  ratio,
}: RatioTableProps) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-2">1：2 の場合</h2>
      <p>割った後のアルコール度数：{mixedRatio.toFixed(1)}%</p>
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
          {amount.map((amount, index) => {
            // 摂取アルコール量(g)を計算
            const grams = calcAlcoholGrams(
              parseFloat(alcoholPercentage),
              amount
            );

            return (
              <TableRow
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : ""}
              >
                <TableCell>{amount}</TableCell>
                <TableCell>{amount * ratio}</TableCell>
                <TableCell>{amount + amount * ratio}</TableCell>
                <TableCell>{grams.toFixed(1)} g</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}
