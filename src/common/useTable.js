import React from "react";
import { object } from "yup";

export default function useTable(records, headers) {
  const TableContainer = (props) => <table>{props.children}</table>;

  const TableHead = (props) => {
    return (
      <thead>
        <tr>
          {headers.map((cell) => (
            <th key={cell.id}>{cell.label}</th>
          ))}
        </tr>
      </thead>
    );
  };

  return { TableContainer, TableHead };
}
