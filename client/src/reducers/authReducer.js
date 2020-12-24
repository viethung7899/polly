const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOG_IN':
      console.log('Logging in...');
      return true;
    case 'LOG_OUT':
      return false;
    default:
      return state;
  }
};

export default authReducer;
