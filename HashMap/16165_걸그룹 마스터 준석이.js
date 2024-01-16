const fs = require('fs');
const input = fs
  .readFileSync('input.txt')
  .toString()
  .split('\n')
  .map((line) => line.trim());
const [N, M] = input.shift().split(' ').map(Number);

function solution() {
  const result = [];
  const groupMap = new Map();
  const memberMap = new Map();

  let index = 0;

  for (let i = 0; i < N; i++) {
    const groupName = input[index];
    const memberCount = Number(input[index + 1]);
    const memberList = input.slice(index + 2, index + 2 + memberCount).sort();

    groupMap.set(groupName, memberList); // 그룹-멤버리스트
    memberList.forEach((member) => memberMap.set(member, groupName)); // 멤버-그룹명

    index += memberCount + 2;
  }

  for (let i = 0; i < M; i++) {
    const quiz = input[index];
    const type = Number(input[index + 1]);

    switch (type) {
      case 0:
        result.push(...groupMap.get(quiz));
        break;
      case 1:
        result.push(memberMap.get(quiz));
        break;
    }

    index += 2;
  }

  return result.join('\n');
}

console.log(solution());

/*
  입력을 어떻게 처리할까가 더 문제다.
  
  그룹명과 이름 받는 법
  바깥 for문으로 그룹 수(N)만큼 돈다
  - 다음 그룹명으로 갈 수 있게 해주는 index 변수 필요
  - 그룹명 : input[index]
  - 멤버의 수 : memberCount = input[index + 1]
  - 멤버 리스트 : slice(index + 2, index + 2 + memberCount)
  - 멤버 리스트 다 받으면 index = index + 2 + memberCount, 즉 index += memberCount + 2
  
  퀴즈 받는 법
  마지막 그룹 정보 처리할 때 index += memberCount + 2로 인해 퀴즈 줄로 넘어왔을 것이다.
  - for문으로 M만큼 돌고
  - input[index], index[index + 1]로 퀴즈와 타입을 구한다.
  - 퀴즈에 답하면 index += 2를 한다.
*/
