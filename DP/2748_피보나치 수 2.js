const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim();
const n = Number(input);

const Fibo = [0, 1];

// n이 90 이하이므로 피보나치 수는 매우 큰 수. 따라서 BigInt 필요
for (let i = 2; i <= n; i++) {
  Fibo.push(BigInt(Fibo[i - 1]) + BigInt(Fibo[i - 2]));
}

console.log(Fibo[n].toString());
