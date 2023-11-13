const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim().split('\n');
const [N, M] = input[0].trim().split(' ').map(Number);
const map = [];
const viruses = [];
const empty = [];

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

for (let y = 1; y <= N; y++) {
  const line = input[y]
    .trim()
    .split(' ')
    .map((el, x) => {
      const cell = Number(el);
      if (cell === 2) {
        viruses.push([x, y - 1]);
      } else if (cell === 0) {
        empty.push([x, y - 1]);
      }
      return cell;
    });
  map.push(line);
}

function getCombination(count, arr, start = 0, selected = [], result = []) {
  if (count === 0) {
    result.push([...selected]);
    return;
  }

  for (let i = start; i < arr.length; i++) {
    selected.push(arr[i]);
    getCombination(count - 1, arr, i + 1, selected, result);
    selected.pop();
  }

  return result;
}

function bfs(start, map) {
  const queue = [start];
  while (queue.length > 0) {
    const [x, y] = queue.shift();
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && nx < M && ny >= 0 && ny < N && map[ny][nx] === 0) {
        map[ny][nx] = 2;
        queue.push([nx, ny]);
      }
    }
  }
}

function solution() {
  const walls = getCombination(3, empty);
  let maxCount = 0;

  walls.forEach((locations) => {
    let count = 0;
    const newMap = JSON.parse(JSON.stringify(map));

    for (let i = 0; i < 3; i++) {
      const [x, y] = locations[i];
      newMap[y][x] = 1;
    }

    viruses.forEach((viruse) => {
      bfs(viruse, newMap);
    });

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (newMap[i][j] === 0) {
          count += 1;
        }
      }
    }

    maxCount = Math.max(maxCount, count);
  });

  console.log(maxCount);
}

solution();
