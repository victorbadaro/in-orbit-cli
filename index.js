const { select } = require('@inquirer/prompts');

const start = async () => {
  while (true) {
    let option = await select({
      message: 'Menu >',
      choices: [
        {
          name: 'Cadasrar meta',
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
        console.log('vamos cadastrar');
        break;
      case 'listar':
        console.log('vamos listar');
        break;
      case 'sair':
        console.log('Até a próxima');
        return;
    }
  }
};

start();