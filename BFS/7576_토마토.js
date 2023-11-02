const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim().split('\n');
const [M, N] = input[0].split(' ').map(Number);

/*
  문제 분석
  - 토마토는 혼자 익지 못한다고 하므로, 고립된 채 0인 토마토는 익지 못한다.
  - 출력: 다 못익으면 -1 반환, 다 익을 수 있다면 최소 날짜 반환 (처음부터 익어있으면 0이므로 day=0 초기값 그대로 반환하면 된다)
  - 토마토 다 못익었나 판별은 (전체 토마토 개수 - 익은 토마토 개수)로 하자.
  - for문으로 box를 만드는 김에 토마토 개수 세자. 그 다음 bfs로 탐색하며 토마토 익게 만들기

  - 토마토의 길찾기 문제가 아니라 여러개의 토마토가 동시에 네 방향을 탐색해야 하므로
    토마토 뭉텅이 단위로 bfs 실시하고 day 증가
  - 토마토 뭉텅이 돌며 다음에 탐색할 토마토들을 새 배열에 담아놓자.
*/

// 상하좌우
const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

function solution() {
  let totalCount = M * N;
  let ripeCount = 0;
  let prevTomatoes = [];
  let day = 0;

  const box = input.splice(1).map((line, y) =>
    line
      .trim()
      .split(' ')
      .map((el, x) => {
        let tomato = Number(el);
        if (tomato === -1) totalCount--;
        if (tomato === 1) {
          ripeCount++;
          prevTomatoes.push([x, y]);
        }
        return tomato;
      })
  );

  while (true) {
    const prev = prevTomatoes.slice();
    prevTomatoes = [];

    prev.forEach((dxy) => {
      const [x, y] = dxy;
      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx >= 0 && nx < M && ny >= 0 && ny < N && box[ny][nx] === 0) {
          box[ny][nx] = 1;
          ripeCount++;
          prevTomatoes.push([nx, ny]);
        }
      }
    });
    if (prevTomatoes.length === 0) break;
    day++;
  }

  return totalCount - ripeCount > 0 ? -1 : day;
}

console.log(solution());
