const userAuthAction = (user) => {
  return (dispatch) => {
    dispatch({type: 'USER', payload: {user}});
  };
};


export {userAuthAction,};
