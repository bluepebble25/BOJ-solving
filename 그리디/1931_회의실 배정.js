const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');

const meetings = input.splice(1).map((line) =>
  line
    .trim()
    .split(' ')
    .map((el) => Number(el))
);

meetings.sort((a, b) => {
  if (a[1] !== b[1]) {
    return a[1] - b[1];
  } else {
    return a[0] - b[0];
  }
});

let count = 0;
let end = 0;

meetings.forEach((meeting) => {
  if (end <= meeting[0]) {
    end = meeting[1];
    count++;
  }
});

console.log(count);
/*
  끝나는 시간 순으로 정렬을 하고, 끝나는 시간이 같다면 시작시간이 빠른 순으로 정렬
  왜냐하면 (3,5)와 (5,5)가 있을 때 (3,5)를 먼저 선택해야 (5,5)를 선택할 수 있기 때문. 반대는 성립X
  선택한 현재 회의를 저장 (meeting)
  그 다음 요소들을 순회하며 meeting 끝 시간보다 시작시간이 같거나 큰 가장 먼저 만나는 회의가 새 meeting
  count++
 */
