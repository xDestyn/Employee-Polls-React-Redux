const logger = (store) => (next) => (action) => {
  console.group('Action Type: ', action.type);
  console.log('The Action Is: ', action);

  const nextMiddleware = next(action);

  console.log('After LoggerMW - The New State Is: ', store.getState());
  console.groupEnd();

  return nextMiddleware;
};

export default logger;
