const fs = require('fs');
const str = fs.readFileSync('input.txt').toString();

function solution() {
  if (str === '0') return 0;
  const answer = [];
  const bin = new Map([
    ['0', '000'],
    ['1', '001'],
    ['2', '010'],
    ['3', '011'],
    ['4', '100'],
    ['5', '101'],
    ['6', '110'],
    ['7', '111'],
  ]);
  for (let i = 0; i < str.length; i++) {
    answer.push(i !== 0 ? bin.get(str[i]) : parseInt(str[i], 8).toString(2));
  }
  return answer.join('');
}

console.log(solution());

/*

  풀이1) 틀림(X)
  8진수 -> 10진수 -> 2진수
  const dec = parseInt(oct, 8), const binary = dec.toString(2)
  과정으로 변환하려고 했는데 수가 클 때는 오차가 생기나 보다.
  예제의 숫자를 넣으면 맞는데 결과는 틀렸다고 나왔다.
  
  풀이2)
  8진수 -> 2진수 변환의 정의를 이용하기로 했다.
  8진수의 한 자리는 이진수 세 자리를 묶어서 계산한 결과이다.
  예를 들어 314는 '011' + '001' + '100' = '011001100' 이고, 앞에서 0을 제거해서 11001100이다.

  각 자릿수를 8 -> 10 -> 2의 과정을 거쳐 2진수로 만든다...는 방법도 있는데
  전체가 아니라 각 자릿수라는 0~7까지의 숫자밖에 없으므로 매핑테이블을 만들자.
  
  결과의 앞자리에 0이 들어있는 것을 방지하기 위해
  맨 첫자리에 한해 parseInt(str[i], 8).toString(2)를 이용해 2진수로 변환해주자.
  둘째자리 변환 결과가 0으로 시작하는지 신경쓸 필요 없는 이유는,
  첫째자리는 적어도 001 처럼 1이 중간에 막고 있는 것이 보장되기 때문이다.
  000으로 시작하는 경우는 주어진 수가 0일 때밖에 없다.
*/
