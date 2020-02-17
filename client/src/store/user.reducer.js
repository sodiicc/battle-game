let initialState = {name: ''}


let user = function (state = initialState, action) {
  switch (action.type) {
    case "SET_USER":
      return {...state, name: action.payload};
    case "LOGOUT_USER":
      return {...state, name: ''};
    default:
      return state;
  }
};

export default user