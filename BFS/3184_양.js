const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim().split('\n');
const [R, C] = input.shift().trim().split(' ').map(Number);
const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

const map = input.map((line) => line.trim().split(''));

function solution() {
  const visited = Array.from({ length: R }, () => Array(C).fill(false));

  function bfs(start) {
    const queue = [start];

    let sheepCount = 0;
    let wolfCount = 0;

    while (queue.length > 0) {
      const [x, y] = queue.shift();

      if (map[y][x] === 'o') sheepCount++;
      if (map[y][x] === 'v') wolfCount++;

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (
          nx < 0 ||
          nx >= C ||
          ny < 0 ||
          ny >= R ||
          map[ny][nx] === '#' ||
          visited[ny][nx]
        )
          continue;

        visited[ny][nx] = true;
        queue.push([nx, ny]);
      }
    }

    return sheepCount > wolfCount ? [sheepCount, 0] : [0, wolfCount];
  }

  let totalWolf = 0;
  let totalSheep = 0;

  for (let y = 0; y < R; y++) {
    for (let x = 0; x < C; x++) {
      if (map[y][x] !== '#' && !visited[y][x]) {
        visited[y][x] = true;
        const [sheep, wolf] = bfs([x, y]);

        totalSheep += sheep;
        totalWolf += wolf;
      }
    }
  }

  console.log(`${totalSheep} ${totalWolf}`);
}

solution();

/*
  구역 내의 양과 늑대의 수를 각각 세고 대소를 비교해 누구를 없앨지 정한다.
  '#'이 아니라면 그 지점부터 bfs를 시작해서 v와 o를 센다.
*/
