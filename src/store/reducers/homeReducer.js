const INITIAL_STATE = {
  user: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'USER':
      return {
        ...state,
        user: action.payload.user,
      };
 
    default:
      return state;
  }
};
