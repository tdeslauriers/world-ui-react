import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../common/Loading";
import useTable from "../../common/useTable";
import eventBus from "../../security/EventBus";
import {
  getDailyTasks,
  updateTaskComplete,
  updateTaskQuality,
} from "../../slices/tasks";

import "./Task.css";

const headers = [
  { id: "name", label: "Task" },
  { id: "complete", label: "Complete", disableSorting: true },
  { id: "satisfactory", label: "Quality", disableSorting: true },
  { id: "date", label: "Assigned" },
  { id: "cadence", label: "Cadence" },
  { id: "category", label: "Category" },
];

const Daily = () => {
  const [loading, setLoading] = useState(true);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const location = useLocation();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { tasks: dailyTasks } = useSelector((state) => state);
  const { message: dailyMessage } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!dailyTasks.length) {
      setLoading(true);
      dispatch(getDailyTasks());
    }

    if (dailyTasks.length) {
      setLoading(false);
    }

    if (
      dailyMessage &&
      dailyMessage === "Request failed with status code 401"
    ) {
      eventBus.dispatch("logout");
    }
  }, [dispatch, dailyTasks, dailyMessage]);

  const { TableContainer, TableHead, recordsAfterTableOperations } = useTable(
    dailyTasks,
    headers,
    filterFn
  );

  const handleStatusUpdate = (event) => {
    event.preventDefault();

    let cmd = {
      taskId: parseInt(event.target.id),
      status: event.target.value === "false" ? true : false,
    };
    if (event.target.name === "complete") {
      setLoading(true);
      dispatch(updateTaskComplete(cmd));
    }
    if (event.target.name === "satisfactory") {
      if (currentUser.roles && currentUser.roles.includes("ALLOWANCE_ADMIN")) {
        setLoading(true);
        dispatch(updateTaskQuality(cmd));
      }
    }
  };

  const handleFilter = (event) => {
    event.preventDefault();

    let target = event.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") {
          return items;
        } else {
          return items.filter(
            (x) =>
              x.name.toLowerCase().includes(target.value.toLowerCase()) ||
              x.date.toLowerCase().includes(target.value.toLowerCase()) ||
              x.cadence.toLowerCase().includes(target.value.toLowerCase()) ||
              x.category.toLowerCase().includes(target.value)
          );
        }
      },
    });
  };

  if (!isLoggedIn) {
    navigate("/login", { state: { from: location } });
  }

  if (dailyMessage) {
    navigate("/error", { state: { from: location } });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h3>
        Todo List: <strong>daily, weekly, and ad-hoc tasks.</strong>
      </h3>
      <hr />
      <h4>Click on status to update.</h4>
      <input
        className="form-control"
        name="filter"
        type="text"
        placeholder="Search ToDo List"
        onChange={handleFilter}
      />
      <TableContainer>
        <TableHead />
        <tbody>
          {dailyTasks.length &&
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
                    onClick={handleStatusUpdate}
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
                    onClick={handleStatusUpdate}
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
    </div>
  );
};

export default Daily;
