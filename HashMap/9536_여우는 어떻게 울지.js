const fs = require('fs');
const input = fs
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.trim());
const T = Number(input.shift());

function getTestCase() {
  const TC = [];
  let chunk = [];

  input.forEach((line) => {
    if (line !== 'what does the fox say?') {
      chunk.push(line);
    } else {
      TC.push(chunk);
      chunk = [];
    }
  });

  return TC;
}

function getFoxSound(testCase) {
  const sound = testCase[0].split(' ');
  const animalSoundSet = new Set();

  for (let i = 1; i < testCase.length; i++) {
    animalSoundSet.add(testCase[i].split(' goes ')[1]);
  }

  return sound.filter((s) => !animalSoundSet.has(s)).join(' ');
}

const TC = getTestCase();
const result = TC.map((testCase) => getFoxSound(testCase));
console.log(result.join('\n'));
