let initialState = { name: "", class: "" };

let user = function(state = initialState, action) {
  switch (action.type) {
    case "SET_USER":
      localStorage.setItem("userChamp", JSON.stringify(action.payload));
      return { ...state, ...action.payload };
    case "SET_USER_NAME":
      return { ...state, name: action.payload };
    case "LOGOUT_USER":
      localStorage.removeItem("userChamp");
      return { ...state, name: "", class: "" };
    case "SET_USER_CHAMP":
      localStorage.setItem("userChamp", JSON.stringify(action.payload));
      return { ...state, ...action.payload };
    case "SET_ENEMY_CHAMP":
      return { ...state, enemyChamp: action.payload };
    default:
      return state;
  }
};

export default user;
