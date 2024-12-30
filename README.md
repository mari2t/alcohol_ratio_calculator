# README

## Overview

割った後のアルコール度数を計算するアプリです。  
アルコール飲料のアルコール度数を入力して計算ボタンを押すと、  
割材との比率（アルコール：割材＝1:2~1:5）に応じて下記が計算できます。

- 割った後のアルコール度数(%)
- 割材の量(ml)
- 割った後の総量(ml)
- 摂取アルコール(g)

This app helps you calculate the alcohol concentration after mixing an alcoholic beverage with a diluting drink.  
Simply input the alcohol percentage of your beverage and press the calculate button.  
Based on the mixing ratio (e.g., 1:2 to 1:5), the app calculates the following:

- Alcohol percentage (%) after dilution
- Volume (ml) of the diluting drink
- Total volume (ml)
- Alcohol intake (g)

## Example

### ![example.png](/public/image/example.png "example.png")

## Features

- Next.js
- shadcn/ui

## Creation Date

2024/12/29-2024/12/31

## Log

- [作成ログ](./MakeLog.md)

## Purpose of creation

1. 肝臓を大事にするべくアルコール量に気を付けたい。
2. 高アルコール飲料をどのくらいで割ればいいか検討したい。

## Other

摂取アルコールは厚生省のウェブサイトを参考に下記で計算しました。  
摂取アルコール(g)＝アルコール飲料(ml) × アルコール濃度（度数/100）× 0.8（アルコールの比重）
