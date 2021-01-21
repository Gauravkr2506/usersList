import { ActionTypes } from "./action";

const initialUserData = {
  name: "",
  address: "",
  country: "",
  pinCode: "",
  state: "",
};

const getInitialState = () => {
  let usersList = localStorage.getItem("usersList");
  if (usersList) {
    usersList = JSON.parse(usersList);
  } else {
    usersList = [];
  }

  const initialState = {
    usersList: usersList,
    userData: initialUserData,
    formType: "ADD",
  };

  return initialState;
};

const Reducer = (state = getInitialState(), { type, payload }) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (type) {
    case ActionTypes.UPDATE_REDUCER:
      return { ...newState, ...payload };

    case ActionTypes.UPDATE_USER_DATA:
      return { ...newState, userData: { ...newState.userData, ...payload } };

    default:
      return state;
  }
};
export default Reducer;
