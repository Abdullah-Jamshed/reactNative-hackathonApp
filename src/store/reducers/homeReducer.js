const INITIAL_STATE = {
  userAuth: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'USER':
      return {
        ...state,
        userAuth: action.payload.user,
      };

    default:
      return state;
  }
};
