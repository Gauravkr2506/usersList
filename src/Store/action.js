export const ActionTypes = {
  UPDATE_REDUCER: "UPDATE_REDUCER",
  UPDATE_USER_DATA: "UPDATE_USER_DATA",
};

export const updateReducer = (payload) => ({
  payload,
  type: ActionTypes.UPDATE_REDUCER,
});

export const updateUserData = (payload) => ({
  payload,
  type: ActionTypes.UPDATE_USER_DATA,
});

export const getStateFromAPIAction = (pinCode, country) => (dispatch) => {
  return fetch(
    `https://api.worldpostallocations.com/pincode?postalcode=${pinCode}&countrycode=${country}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.result.length > 0) {
        dispatch(updateUserData({ state: data.result[0].state }));
      } else {
        dispatch(updateUserData({ state: "" }));
      }
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};
