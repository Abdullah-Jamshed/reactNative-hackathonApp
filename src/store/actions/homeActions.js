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


export {userAuthAction,setAccountType};
