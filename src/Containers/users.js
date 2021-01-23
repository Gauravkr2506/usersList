import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { updateReducer, updateUserData } from "./../Store/action";

import Pagination from "../Component/Pagination";
import { paginationConstant } from "./../Constant/pagination";

const columnList = ["No", "name", "address", "country", "pinCode", "state"];

function Users({ history, usersList, updateReducer, updateUserData }) {
  const [searchText, setSearchText] = useState("");
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(paginationConstant.defaultPageSize);
  // const [data, setData] = useState([]);

  useEffect(() => {
    if (searchText) {
    } else {
    }
  }, [searchText]);

  const searchFilter = () => {
    if (searchText) {
      return usersList.filter((obj) =>
        obj.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      );
    }
    return usersList;
  };

  const searchFilterData = searchFilter();

  const tableData = searchFilterData.slice(
    pageNo * pageSize,
    pageNo * pageSize + pageSize
  );

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
    <>
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        type="text"
        placeholder="Search"
      />
      <div className="wrapTable" style={{ overflowX: "auto" }}>
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
            {tableData.map((user, index) => (
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
      <Pagination
        page={pageNo}
        onPageChange={(pageNo) => setPageNo(pageNo)}
        pageSize={pageSize}
        onPageSizeChange={(pageSize) => {
          setPageSize(pageSize);
          setPageNo(0);
        }}
        data={tableData}
        size={searchFilterData.length}
        pages={Math.ceil(searchFilterData.length / pageSize)}
        pageSizeOptions={paginationConstant.defaultPageSizeOptions}
        previousText={paginationConstant.previousText}
        nextText={paginationConstant.nextText}
        allText={paginationConstant.allText}
        activeClass="activePage"
      />
    </>
  );
}

const mapStateToProps = ({ usersList }) => ({
  usersList: usersList || [],
  length: !!usersList ? usersList.length : null,
});

const mapDispatchToProps = { updateReducer, updateUserData };

export default connect(mapStateToProps, mapDispatchToProps)(Users);
