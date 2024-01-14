const fs = require('fs');
const trees = fs
  .readFileSync('./input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.trim());

function solution() {
  const list = new Map();
  const count = trees.length;

  for (const name of trees) {
    list.set(name, list.has(name) ? list.get(name) + 1 : 1);
  }

  const sortedList = Array.from(list).sort();
  const result = sortedList.map(
    (el) => `${el[0]} ${((el[1] / count) * 100).toFixed(4)}`
  );
  return result.join('\n');
}

console.log(solution());

/*
  Map & 문자열 문제. Map은 안어려운데
  오히려 문제에서 소수 넷째자리까지 나타내라는게 넷째자리 이상 존재할때만 절삭하라는건지,
  무조건 네자리로 만들기 위해 0을 채우라는건지 헷갈려서 애먹음. 재밌다
  -----------------------------------------------
  
  Map을 만들어 각 나무의 개수를 저장한다.
  백분율을 구할 때 전체 나무의 수가 필요함. -> input.length
  list.has(name)으로 존재 여부를 검사하고, 없다면 초기값으로 1을, 아니면 value 얻어서 +=1

  Map을 Array.from으로 배열로 만든 다음 sort로 정렬한다.
  소수 넷째자리까지 백분율의 반올림은
  toFixed(4)로 반올림한다.
  정수인 경우에는 0으로 4자리가 채워지겠지만 문제에서는 소수 넷째자리까지 출력하라고 했으니까 괜찮다
*/
