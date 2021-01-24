import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Sorting from "./../Component/Sorting";

import { updateReducer, updateUserData } from "./../Store/action";

import Pagination from "../Component/Pagination";
import { paginationConstant } from "./../Constant/pagination";

const columnList = ["name", "address", "country", "pinCode", "state"];

function Users({
  history,
  usersList: mainList,
  updateReducer,
  updateUserData,
}) {
  const usersList = JSON.parse(JSON.stringify(mainList));
  const [searchText, setSearchText] = useState("");
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(paginationConstant.defaultPageSize);
  const [sortType, setSortType] = useState({ key: null, value: null });

  useEffect(() => {
    if (searchText) {
    } else {
    }
  }, [searchText]);

  const compare = (a, b) => {
    const { key } = sortType;
    if (a[key] < b[key]) {
      return -1;
    }
    if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  };

  const getSortData = () => {
    debugger;
    const { value } = sortType;
    if (value) {
      if (value === "ASC") {
        return usersList.sort((a, b) => compare(a, b));
      } else if (value === "DESC") {
        return usersList.sort((a, b) => compare(b, a));
      }
      return usersList;
    }
    return usersList;
  };

  const sortData = getSortData();

  const getSearchFilterData = () => {
    if (searchText) {
      return sortData.filter((obj) =>
        columnList.some((column) =>
          obj[column]
            .toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase())
        )
      );
    }
    return sortData;
  };

  const searchFilterData = getSearchFilterData();

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
    if (tableData.length <= 1) {
      if (pageNo) {
        setPageNo(pageNo - 1);
      }
    }
  };

  const updateRow = (row) => () => {
    updateReducer({ formType: "UPDATE" });
    updateUserData(row);
    history.replace("/");
  };

  const onSort = (key) => (value) => () => {
    setSortType({ key, value });
  };

  return (
    <>
      <ToastContainer />
      <input
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          setPageNo(0);
        }}
        type="text"
        placeholder="Search"
      />
      <div className="wrapTable" style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>No</th>
              {columnList.map((column) => (
                <th key={column}>
                  {column}{" "}
                  <Sorting
                    onSort={onSort(column)}
                    sortType={sortType.key === column ? sortType.value : null}
                  />
                </th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((user, index) => (
              <tr key={user.id + index}>
                <td key={user.id + index}>{index + 1}</td>
                {columnList.map((column) => (
                  <td key={user.id + index + column}>{user[column]}</td>
                ))}
                <td>
                  <FaEdit
                    title="Edit Record"
                    onClick={updateRow(user)}
                    className="greenColor pointer"
                  />
                  &nbsp;
                  <FaTrashAlt
                    title="Delete Record"
                    onClick={deleteRow(user)}
                    className="redColor pointer"
                  />
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
