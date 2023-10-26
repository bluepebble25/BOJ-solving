const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim().split('\n');
const N = Number(input[0].trim());

const [roads, price] = input.splice(1).map((line) =>
  line
    .trim()
    .split(' ')
    .map((el) => BigInt(el))
);

/*
  두번째 도시를 가기 위한 기름은 무조건 맨 처음 도시에서 넣어야 함
  구간 중에서 제일 싼 곳에서 많이 넣는게 이득

  낮은 곳부터 새로운 최저가 도시까지의 구간 길이를 구하는 방법은 for문 돌아야 해서 시간복잡도 증가
  그냥 도시 지나며 비교할 때마다 매번 최저가 * 도로길이 구하자

  2. 기준점보다 더 낮은 가격을 발견하면 최저가를 갱신하기
  3. 맨 처음에는 첫번째 주유소 가격으로 least 초기화
*/

let least = price[0];
let sum = BigInt(0);

for (let i = 0; i < N - 1; i++) {
  sum += least * roads[i];
  if (least > price[i + 1]) least = price[i + 1];
}

console.log(String(sum));
