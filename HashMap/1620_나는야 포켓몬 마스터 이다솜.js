const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');
const [N, M] = input[0].trim().split(' ').map(Number);

function solution() {
  const pokemonMap = new Map();
  const pokemonList = new Array(N + 1);
  const result = [];

  for (let i = 1; i <= N; i++) {
    const pokemon = input[i].trim();
    pokemonList[i] = pokemon;
    pokemonMap.set(pokemon, i);
  }

  for (let i = N + 1; i <= N + M; i++) {
    const target = input[i].trim();
    if (isNaN(target)) {
      result.push(pokemonMap.get(target));
    } else {
      result.push(pokemonList[Number(target)]);
    }
  }

  console.log(result.join('\n'));
}

solution();

/*
  - 포켓몬명으로 도감번호를 찾는 것은 Map 오브젝트를 사용,
  - 도감명으로 포켓몬명 찾는 것은 배열 사용
*/
