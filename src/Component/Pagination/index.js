import React, { useState, useEffect } from "react";
import "./index.css";

const defaultButton = (props) => <button {...props}>{props.children}</button>;

export default function PaginationComponent(props) {
  const [visiblePages, setVisiblePage] = useState([]);

  useEffect(() => {
    setVisiblePage(getVisiblePages(props.page, props.pages));
    changePage(props.page + 1);
  }, [props.page, props.pages]);

  const filterPages = (visiblePages, totalPages) => {
    return visiblePages.filter((page) => page <= totalPages);
  };

  const getVisiblePages = (page, total) => {
    if (total < 7) {
      return filterPages([1, 2, 3, 4, 5, 6], total);
    } else {
      if (page % 5 >= 0 && page > 4 && page + 2 < total) {
        return [1, page - 1, page, page + 1, total];
      } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
        return [1, total - 3, total - 2, total - 1, total];
      } else {
        return [1, 2, 3, 4, 5, total];
      }
    }
  };

  const changePage = (page) => {
    const activePage = props.page + 1;

    if (page === activePage) {
      return;
    }

    const visiblePages = getVisiblePages(page, props.pages);

    setVisiblePage(filterPages(visiblePages, props.pages));

    props.onPageChange(page - 1);
  };

  const changePageSize = (e) => {
    props.onPageSizeChange(parseInt(+e.target.value), 0);
  };

  const { PageButtonComponent = defaultButton, size = 0 } = props;
  const activePage = props.page + 1;
  const pageSize = props.pageSize;
  const from = props.data.length > 0 ? props.page * pageSize + 1 : 0;
  const currentRecordCount = props.data.length > 0 ? props.data.length : 0;
  const to = props.data.length > 0 ? from + currentRecordCount - 1 : 0;
  return (
    <div className="paginationRoot">
      <div className="paginationLeft">
        <div>
          <select onChange={changePageSize} value={props.pageSize}>
            {props.pageSizeOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
            <option key={props.allText} value={1000000}>
              {props.allText}
            </option>
          </select>
        </div>
        <span>
          &nbsp; Showing {from} to {to} of {size} Results
        </span>
      </div>

      <div>
        <PageButtonComponent
          onClick={() => {
            if (activePage === 1 || props.filter_applied) return;
            changePage(activePage - 1);
          }}
          disabled={activePage === 1}
        >
          {props.previousText}
        </PageButtonComponent>

        {visiblePages.map((page, index, array) => {
          return (
            <PageButtonComponent
              key={page}
              className={activePage === page ? props.activeClass : ""}
              onClick={changePage.bind(null, page)}
            >
              {array[index - 1] + 2 < page ? `...${page}` : page}
            </PageButtonComponent>
          );
        })}

        <PageButtonComponent
          onClick={() => {
            if (activePage === props.pages || props.filter_applied) return;
            changePage(activePage + 1);
          }}
          disabled={activePage === props.pages || props.filter_applied}
        >
          {props.nextText}
        </PageButtonComponent>
      </div>
    </div>
  );
}
