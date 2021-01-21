import React from "react";
import { connect } from "react-redux";

import { updateReducer, updateUserData } from "./../Store/action";

const columnList = ["No", "name", "address", "country", "pinCode", "state"];

function Users({ history, usersList, updateReducer, updateUserData }) {
  const deleteRow = (row) => () => {
    let usersList = localStorage.getItem("usersList");
    usersList = JSON.parse(usersList);
    let index = usersList.findIndex((obj) => obj.id === row.id);
    usersList.splice(index, 1);
    updateReducer({ usersList });
    usersList = JSON.stringify(usersList);
    localStorage.setItem("usersList", usersList);
  };

  const updateRow = (row) => () => {
    updateReducer({ formType: "UPDATE" });
    updateUserData(row);
    history.replace("/");
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <table>
        <thead>
          <tr>
            {columnList.map((column) => (
              <th key={column}>{column}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {usersList.map((user, index) => (
            <tr key={user.id + index}>
              {columnList.map((column) =>
                column === "No" ? (
                  <td key={user.id + index + column}>{index + 1}</td>
                ) : (
                  <td key={user.id + index + column}>{user[column]}</td>
                )
              )}
              <td>
                <p onClick={updateRow(user)} className="greenColor pointer">
                  UPDATE
                </p>{" "}
                <p onClick={deleteRow(user)} className="redColor pointer">
                  DELETE
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = ({ usersList }) => ({
  usersList: usersList || [],
  length: !!usersList ? usersList.length : null,
});

const mapDispatchToProps = { updateReducer, updateUserData };

export default connect(mapStateToProps, mapDispatchToProps)(Users);
