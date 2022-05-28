const prompts = require("prompts");

module.exports = {
  initial: [
    {
      type: 'list',
      name: 'baseUrl',
      message: 'What is the BaseURL?',
      initial: '',
      separator: ',',
    },
    {
      type: 'list',
      name: 'get',
      message: 'Provide a list of getAll requests e.g. (getTodos=/todos, getTasks=/tasks)',
      separator: ',',
    },
    {
      type: 'list',
      name: 'getById',
      message: 'Provide a list of getById requests e.g. (getTodo=/todos/:id, getTask=/tasks/:id)',
      separator: ',',
    },
    {
      type: 'list',
      name: 'mutate',
      message: 'Provide a list of all mutation requests e.g. (updateTodo=/todos/:id, updateTask=/tasks/:id)',
      separator: ',',
    }
  ]
};