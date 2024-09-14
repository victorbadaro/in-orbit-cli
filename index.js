const { select, input, checkbox } = require('@inquirer/prompts');

let message = 'Bem-vindo(a) ao app de metas!';
let goals = [];

const createGoal = async () => {
  const goalValue = await input({ message: 'Digite a meta' });

  if (goalValue.length === 0) {
    message = 'A meta não pode ser vazia.';
    return;
  }

  goals.push({
    value: goalValue,
    checked: false
  });

  message = 'Meta cadastrada com sucesso!';
};

const listGoals = async () => {
  const answers = await checkbox({
    message: 'Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o enter para finalizar essa etapa',
    choices: [...goals],
    instructions: false
  });

  goals.forEach((goal) => goal.checked = false);

  if (answers.length === 0) {
    message = 'Nenhuma meta selecionada!';
    return;
  }

  answers.forEach((answer) => {
    const goal = goals.find((goal) => goal.value === answer);

    goal.checked = !goal.checked;
  });

  message = 'Metas(s) marcada(s) como concluída(s)';
};

const doneGoals = async () => {
  const completedGoals = goals.filter((goal) => goal.checked);

  if (completedGoals.length === 0) {
    message = 'Não existem metas realizadas! :(';
    return;
  }

  await select({
    message: 'Metas realizadas',
    choices: [...completedGoals]
  });
};

const showOpenGoals = async () => {
  const openGoals = goals.filter((goal) => !goal.checked);

  if (openGoals.length === 0) {
    message = 'Não existem metas abertas! :)';
    return;
  }

  await select({
    message: 'Metas Abertas: ' + openGoals.length,
    choices: [...openGoals]
  });
};

const deleteGoals = async () => {
  const uncheckedGoals = goals.map((goal) => ({
    ...goal,
    checked: false
  }));
  const goalsToDelete = await checkbox({
    message: 'Selecione um ou mais itens para deletar',
    choices: [...uncheckedGoals],
    instructions: false
  });

  if (goalsToDelete.length === 0) {
    message = 'Nenhum item para deletar';
    return;
  }

  goalsToDelete.forEach((goalToDelete) => {
    goals = goals.filter(goal => goal.value != goalToDelete);
  });

  message = 'Meta(s) deletada(s) com sucesso!';
};

const showMessage = () => {
  console.clear();

  if (message !== '') {
    console.log(message);
    console.log('');
    message = '';
  }
};

const start = async () => {
  while (true) {
    showMessage();

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
          name: 'Metas realizadas',
          value: 'realizadas'
        },
        {
          name: 'Metas abertas',
          value: 'abertas'
        },
        {
          name: 'Deletar metas',
          value: 'deletar'
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
      case 'realizadas':
        await doneGoals();
        break;
      case 'abertas':
        await showOpenGoals();
        break;
      case 'deletar':
        await deleteGoals();
        break;
      case 'sair':
        console.log('Até a próxima');
        return;
    }
  }
};

start();