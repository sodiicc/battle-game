let initialState = {item: {}}


let item = function (state = initialState, action) {
  switch (action.type) {
    case "SET_ITEM":
      return {...state, item: action.payload};
    case "DELETE_ITEM":
      return {...state, item: {}};
    default:
      return state;
  }
};

export default item