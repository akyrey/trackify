export default (on: any, config: any) => {
  return require('@cypress/code-coverage/task')(on, config);
};
