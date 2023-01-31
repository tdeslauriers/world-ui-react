import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, useLocation } from "react-router-dom";
import Loading from "../../common/Loading";
import useTable from "../../common/useTable";
import eventBus from "../../security/EventBus";
import tasktypeService from "../../services/tasktypeService";
import {
  getTasktypesAll,
  removeFromTasktypes,
  updateTasktype,
} from "../../slices/tasktypes";
import "./Task.css";

const headers = [
  { id: "options", label: "Options", disableSorting: true },
  { id: "name", label: "Task" },
  { id: "cadence", label: "Cadence" },
  { id: "category", label: "Category" },
];

const Tasks = () => {
  const [loading, setLoading] = useState(false);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const location = useLocation();

  const { tasktypes: allTasktypes } = useSelector((state) => state);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message: reduxMessage } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const { TableContainer, TableHead, recordsAfterTableOperations } = useTable(
    allTasktypes,
    headers,
    filterFn
  );

  useEffect(() => {
    if (!allTasktypes.length) {
      setLoading(true);
      dispatch(getTasktypesAll());
    }

    if (allTasktypes.length) {
      setLoading(false);
    }

    if (
      reduxMessage &&
      reduxMessage === "Request failed with status code 401"
    ) {
      eventBus.dispatch("logout");
    }
  }, [dispatch, allTasktypes, reduxMessage]);

  const handleArchiveClick = (event) => {
    event.preventDefault();
    const tasktype = allTasktypes.find(
      (tt) => tt.id === parseInt(event.target.id)
    );
    const toArchive = {
      ...tasktype,
      archived: true,
    };
    dispatch(updateTasktype(toArchive))
      .unwrap()
      .then(() => dispatch(removeFromTasktypes(toArchive)));
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
              x.cadence.toLowerCase().includes(target.value.toLowerCase()) ||
              x.category.toLowerCase().includes(target.value.toLowerCase())
          );
        }
      },
    });
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="top-column">
        <div className="child-column">
          <h3>
            Tasks: <strong>Create and edit tasks globally.</strong>
          </h3>
        </div>
        <div className="child-column">
          <div className="btngroup">
            <NavLink to={"/tasks/add"}>
              <button className="btn-profile">Add Task</button>
            </NavLink>
          </div>
        </div>
      </div>
      <hr />
      <h4>
        Archiving a task will remove it from the list. It will also stop new
        daily/weekly tasks from being created.
      </h4>
      <input
        className="form-control"
        name="filter"
        type="text"
        placeholder="Search Tasks"
        onChange={handleFilter}
      />
      <TableContainer>
        <TableHead />
        <tbody>
          {recordsAfterTableOperations().map((tt) => (
            <tr key={tt.id}>
              <td>
                <NavLink to={`/tasks/${tt.id}/edit`}>
                  <button className="btn-table">Edit</button>
                </NavLink>
                <button
                  id={tt.id}
                  name="archiveTask"
                  className="btn-table btn-alert task-button"
                  onClick={handleArchiveClick}
                >
                  Archive
                </button>
              </td>
              <td>{tt.name}</td>
              <td>{tt.cadence}</td>
              <td>{tt.category}</td>
            </tr>
          ))}
        </tbody>
      </TableContainer>
    </div>
  );
};

export default Tasks;
