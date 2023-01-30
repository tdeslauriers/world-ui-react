import React, { useState } from "react";
import "./useTable.css";

export default function useTable(records, headers) {
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  const TableContainer = (props) => (
    <div className="table-card">
      <table className="table-container">{props.children}</table>
    </div>
  );

  const TableHead = (props) => {
    const handleSortRequest = (cellId) => {
      const isAsc = orderBy === cellId && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(cellId);
    };

    return (
      <thead>
        <tr>
          {headers.map((cell) => (
            <th
              key={cell.id}
              sortDirection={orderBy === cell.id ? order : false}
            >
              {cell.disableSorting ? (
                cell.label
              ) : (
                <button
                  className={`btn-sort ${orderBy === cell.id ? "active" : ""}`}
                  direction={orderBy === cell.id ? order : "asc"}
                  onClick={() => handleSortRequest(cell.id)}
                >
                  {cell.label} {orderBy === cell.id ? <sup>{order}</sup> : null}
                </button>
              )}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const recordsAfterTableOperations = () => {
    return stableSort(records, getComparator(order, orderBy));
  };

  return { TableContainer, TableHead, recordsAfterTableOperations };
}
