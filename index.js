const { select, input, checkbox } = require('@inquirer/prompts');

let goals = [];

const createGoal = async () => {
  const goalValue = await input({ message: 'Digite a meta' });

  if (goalValue.length === 0) {
    console.log('A meta não pode ser vazia.');
    return;
  }

  goals.push({
    value: goalValue,
    checked: false
  });
};

const listGoals = async () => {
  const answers = await checkbox({
    message: 'Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o enter para finalizar essa etapa',
    choices: [...goals],
    instructions: false
  });

  if (answers.length === 0) {
    console.log('Nenhuma meta selecionada!');
    return;
  }

  goals.forEach((goal) => goal.checked = false);

  answers.forEach((answer) => {
    const goal = goals.find((goal) => goal.value === answer);

    goal.checked = !goal.checked;
  });

  console.log('Metas(s) concluída(s)');
};

const start = async () => {
  while (true) {
    let option = await select({
      message: 'Menu >',
      choices: [
        {
          name: 'Cadastrar meta',
          value: 'cadastrar'
        },
        {
          name: 'Listar metas',
          value: 'listar'
        },
        {
          name: 'Sair',
          value: 'sair'
        }
      ]
    });

    switch (option) {
      case 'cadastrar':
        await createGoal();
        break;
      case 'listar':
        await listGoals();
        break;
      case 'sair':
        console.log('Até a próxima');
        return;
    }
  }
};

start();