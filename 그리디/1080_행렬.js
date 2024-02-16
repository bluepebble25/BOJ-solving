const fs = require('fs');
const input = fs
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.trim());
const [N, M] = input.shift().split(' ');
const A = input.slice(0, N).map((line) => line.split(''));
const B = input.slice(N).map((line) => line.split(''));

function solution() {
  let count = 0;
  for (let y = 0; y < N - 2; y++) {
    for (let x = 0; x < M - 2; x++) {
      if (A[y][x] !== B[y][x]) {
        flip(x, y);
        count++;
      }
    }
  }

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (A[y][x] !== B[y][x]) count = -1;
    }
  }

  return count;
}

function flip(x, y) {
  for (let i = y; i < y + 3; i++) {
    for (let j = x; j < x + 3; j++) {
      A[i][j] = A[i][j] === '1' ? '0' : '1';
    }
  }
}

console.log(solution());

/*
  한번 뒤집을 때 한 칸 말고 3x3만큼의 구역을 한꺼번에 뒤집어야 한다는 제약이 있지만,
  특정 타일의 숫자가 내가 원하는 숫자가 아니라면 원하는 만큼 뒤집어도 된다.

  0000  1001
  0010  1011
  0000  1001  

  좌표를 (x,y)라고 치면
  A에서 (0,0) 지점이 B와 다르다. 그러면 그 지점부터 3x3 구역을 뒤집고,
  그 다음 (1,0) 부분을 검사해서 같다면 뒤집지 않고 다르면 뒤집는다.
  이런 식으로 왼쪽 맨 위 모서리만 신경쓰면 된다.

  뒤집는 행위가 빈번히 일어나므로 flip이라는 함수를 따로 만들어주자.
  그리고 3x3 구역의 맨 왼쪽 위를 검사할 때는 N x M을 벗어나면 안되므로 검사 범위를 N-2, M-2 까지로 잡아주자.
*/
