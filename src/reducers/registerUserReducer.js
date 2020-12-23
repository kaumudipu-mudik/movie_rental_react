import * as actions from "../actions/actionTypes";

let registerUser = (state = { user: {} }, action) => {
  switch (action.type) {
    case actions.REGISTER_USER:
      console.log(action.user);
      return { user: { ...action.payload } };
    default:
      return state;
  }
};
export default registerUser;
