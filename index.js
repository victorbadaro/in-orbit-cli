// arrays, objetos
const goals = ['victor', 'hello'];

console.log(goals);
console.log(goals[0]);
console.log(goals[1]);
console.log(goals[1] + ', ' + goals[0] + '!');

const goal = {
  value: 'ler um livro por mês',
  checked: false
};

console.log('-----------------');

console.log(goal);
console.log(goal.value);
console.log(goal.checked);

console.log('-----------------');

goal.value = 'ler um livro duas vezes';

console.log(goal.value);

// function / arrow function
function isChecked() { }

const createGoal = () => { }