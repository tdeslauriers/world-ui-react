import React, { useState } from "react";
import "./useTable.css";

export default function useTable(records, headers) {
  const TableContainer = (props) => (
    <div className="table-card">
      <table className="table-container">{props.children}</table>
    </div>
  );

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
