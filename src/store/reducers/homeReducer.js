const INITIAL_STATE = {
  userAuth: null,
  accountType: null,
  formShow: false,
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
    case 'FORMSHOW':
      return {
        ...state,
        formShow: action.payload.show,
      };

    default:
      return state;
  }
};
