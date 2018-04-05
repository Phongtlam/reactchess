// see types of prompts:
// https://github.com/SBoudrias/Inquirer.js#prompt-types
//
// and for examples for prompts:
// https://github.com/SBoudrias/Inquirer.js/tree/master/examples
module.exports = [
  {
    type: 'input',
    name: 'name',
    message: "What's your component name?"
  },
  {
      type: 'list',
      name: 'type',
      message: "What's your component type?",
      choices: ['stateful', 'stateful-redux', 'stateless']
  }
];
