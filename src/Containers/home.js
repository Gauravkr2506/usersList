import React, { useState } from "react";
import { connect } from "react-redux";
import { countryCodeList } from "./../utilities/countryCodes";
import {
  updateReducer,
  updateUserData,
  getStateFromAPIAction,
} from "./../Store/action";

const navigationType = { ADD: "push", UPDATE: "replace" };

const NAME_ERROR = { title: "Please enter name", className: "formError" };
const ADDRESS_ERROR = { title: "Please enter address", className: "formError" };
const COUNTRY_ERROR = {
  title: "Please select country",
  className: "formError",
};
const PINCODE_ERROR = { title: "Please enter pincode", className: "formError" };
const STATE_ERROR = {
  title: "Please enter valid pincode",
  className: "formError",
};

const Home = (props) => {
  const {
    history,
    name,
    address,
    country,
    pinCode,
    state,
    id,
    formType,
  } = props;
  const { updateReducer, updateUserData, getStateFromAPIAction } = props;

  const [isSubmit, setIsSubmit] = useState(false);

  const formValidation = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    if (name.length === 0) return;
    if (address.length === 0) return;
    if (country.length === 0) return;
    if (pinCode.length === 0) return;
    if (state.length === 0) return;

    let usersList = localStorage.getItem("usersList");

    if (usersList) {
      usersList = JSON.parse(usersList);

      if (formType === "ADD") {
        let id = Math.random().toString(36).substring(7);
        usersList = [
          { name, address, country, pinCode, state, id },
          ...usersList,
        ];
      } else if (formType === "UPDATE") {
        let index = usersList.findIndex((obj) => obj.id === id);
        usersList[index] = { name, address, country, pinCode, state, id };
      }
    } else {
      let id = Math.random().toString(36).substring(7);
      usersList = [{ name, address, country, pinCode, state, id }];
    }
    updateReducer({ usersList, formType: "ADD" });
    usersList = JSON.stringify(usersList);
    localStorage.setItem("usersList", usersList);
    history[navigationType[formType]]("/usersList");
  };

  const setValueForCountry = (e) => {
    updateUserData({ country: e.target.value });
    if (pinCode !== "") {
      getStateFromAPIAction(pinCode, e.target.value);
    }
  };

  const setValueForPinCode = (e) => {
    console.log(props);
    updateUserData({ pinCode: e.target.value });
    if (country !== "") {
      getStateFromAPIAction(e.target.value, country);
    }
  };

  const getQueryResult = (result) => result;

  return (
    <form className="loginForm" onSubmit={formValidation}>
      <label
        {...getQueryResult(isSubmit && name.length === 0 ? NAME_ERROR : {})}
      >
        First Name
        <span>*</span> :
        <br />
        <input
          value={name}
          type="text"
          name="name"
          onChange={(e) => updateUserData({ name: e.target.value })}
        />
      </label>

      <label
        {...getQueryResult(
          isSubmit && address.length === 0 ? ADDRESS_ERROR : {}
        )}
      >
        Address
        <span>*</span> :
        <br />
        <textarea
          onChange={(e) => updateUserData({ address: e.target.value })}
          value={address}
          maxlength="140"
          rows="4"
          cols="50"
          type="textarea"
          name="address"
        />
      </label>
      <div className="marginTop">
        <label
          {...getQueryResult(
            isSubmit && country.length === 0 ? COUNTRY_ERROR : {}
          )}
        >
          Country
          <span>*</span> :
          <select
            onChange={setValueForCountry}
            value={country}
            className="marginLeft"
            name="country"
          >
            <option key={"xx"}>--Select Country--</option>
            {countryCodeList.map((country, index) => (
              <option key={country.name + index} value={country.iso2}>
                {country.name}
              </option>
            ))}
          </select>
        </label>

        <label
          style={{ marginLeft: 10 }}
          {...getQueryResult(
            isSubmit && pinCode.length === 0
              ? PINCODE_ERROR
              : isSubmit && state.length === 0
              ? STATE_ERROR
              : {}
          )}
        >
          Pin Code
          <span>*</span> :
          <input
            onChange={setValueForPinCode}
            value={pinCode}
            maxLength="6"
            className="marginLeft"
            type="number"
            name="pinCode"
          />
        </label>

        <label className="marginLeft">
          State:
          <input
            value={state}
            readOnly
            className="marginLeft"
            type="text"
            name="state"
          />
        </label>
      </div>

      <input className="submit" type="submit" value="Submit" />
    </form>
  );
};

const mapStateToProps = ({ userData, formType }) => ({
  ...userData,
  formType,
});

const mapDispatchToProps = {
  updateReducer,
  updateUserData,
  getStateFromAPIAction: (pinCode, country) =>
    getStateFromAPIAction(pinCode, country),
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
