const userAuthAction = (user) => {
  return (dispatch) => {
    dispatch({type: 'USER', payload: {user}});
  };
};

const setAccountType = (type) => {
  return (dispatch) => {
    dispatch({type: 'ACCOUNTTYPE', payload: {type}});
  };
};

const setFormShow = (show) => {
  return (dispatch) => {
    dispatch({type: 'FORMSHOW', payload: {show}});
  };
};

export {userAuthAction, setAccountType, setFormShow};
