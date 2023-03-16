import React from "react";
import useTable from "../../common/useTable";

const headers = [
  { id: "name", label: "Task" },
  { id: "complete", label: "Complete", disableSorting: true },
  { id: "satisfactory", label: "Quality", disableSorting: true },
  { id: "date", label: "Assigned" },
  { id: "cadence", label: "Cadence" },
  { id: "category", label: "Category" },
];

const TaskView = ({tasks, statusUpdate, filtered}) => {
  
  const { TableContainer, TableHead, recordsAfterTableOperations } = useTable(
    tasks,
    headers,
    filtered
  );

  return (
    <>
      <TableContainer>
        <TableHead />
        <tbody>
          {tasks.length &&
            recordsAfterTableOperations().map((t) => (
              <tr key={t.id}>
                <td>{t.name}</td>
                <td>
                  <button
                    id={t.id}
                    name="complete"
                    value={t.complete}
                    className={
                      t.complete
                        ? "button-status-success"
                        : "button-status-alert"
                    }
                    onClick={statusUpdate}
                  >
                    {t.complete ? "Complete" : "Incomplete"}
                  </button>
                </td>
                <td>
                  <button
                    id={t.id}
                    name="satisfactory"
                    value={t.satisfactory}
                    className={
                      t.satisfactory
                        ? "button-status-success"
                        : "button-status-alert"
                    }
                    onClick={statusUpdate}
                  >
                    {t.satisfactory ? "Satisfactory" : "Unsatisfactory"}
                  </button>
                </td>
                <td>{t.date}</td>
                <td>{t.cadence}</td>
                <td>{t.category}</td>
              </tr>
            ))}
        </tbody>
      </TableContainer>
    </>
  );
};

export default TaskView;
