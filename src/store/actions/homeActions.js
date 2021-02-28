const userAction = (user) => {
  return (dispatch) => {
    dispatch({type: 'USER', payload: {user}});
  };
};


export {userAction,};
