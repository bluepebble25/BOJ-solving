const fs = require('fs');
const str = fs.readFileSync('input.txt').toString().trim();

function solution() {
  const alpha = Array(26).fill(0);

  for (let i = 0; i < str.length; i++) {
    const ascii = str[i].toLowerCase().charCodeAt();
    alpha[ascii - 97]++;
  }

  const max = Math.max(...alpha);
  const maxIndex = alpha.indexOf(max);

  for (let i = 0; i < 26; i++) {
    if (alpha[i] === max && i !== maxIndex) {
      return '?';
    }
  }

  return String.fromCharCode(maxIndex + 65);
}

console.log(solution());
/*
  charCodeAt()을 이용해 아스키코드로 변환한다.
  A는 65, a는 97
  a~z까지를 배열에 담아 count한다.
  0번은 a, 26번째 문자인 z는 25번 인덱스에 넣어야 하므로
  문자를 toLowerCase()로 소문자로 만든 다음, 97을 빼서 인덱스를 구한다.
  그리고 해당 인덱스의 값을 1 증가시킨다.
  
  max와 maxIndex를 구한다. max는 Math.max, maxIndex는 Array.indexOf(max)로 구한다.
  가장 많이 사용되는 알파벳이 여러개가 존재하는 경우는 max값과 값이 같으면서 인덱스가 다른 것이 존재하는 경우이다.
  이때는 ?를 반환하자.
  최종적으로 maxIndex를 대문자로 변환하기 위해 String.fromCharCode(maxIndex + 65)을 한다.
*/
