import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

export default function SortingComponent({ sortType, onSort = () => {} }) {
  return sortType === "ASC" ? (
    <FaSortUp className="sortIcon" color="red" onClick={onSort("DESC")} />
  ) : sortType === "DESC" ? (
    <FaSortDown className="sortIcon" color="red" onClick={onSort(null)} />
  ) : (
    <FaSort className="sortIcon" onClick={onSort("ASC")} />
  );
}
