const INITIAL_STATE = {
  userAuth: null,
  accountType: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'USER':
      return {
        ...state,
        userAuth: action.payload.user,
      };
    case 'ACCOUNTTYPE':
      return {
        ...state,
        accountType: action.payload.type,
      };

    default:
      return state;
  }
};
