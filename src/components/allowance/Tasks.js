import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, useLocation } from "react-router-dom";
import Loading from "../../common/Loading";
import useTable from "../../common/useTable";
import eventBus from "../../security/EventBus";
import { getTasktypesAll } from "../../slices/tasktypes";

const headers = [
  { id: "options", label: "Options" },
  { id: "name", label: "Task" },
  { id: "cadence", label: "Cadence" },
  { id: "category", label: "Category" },
];

const Tasks = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const { tasktypes: allTasktypes } = useSelector((state) => state);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message: reduxMessage } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const { TableContainer, TableHead } = useTable(allTasktypes, headers);

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
          <h3>Tasks</h3>
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
      <TableContainer>
        <TableHead />
        <tbody>
          {allTasktypes.map((tt) => (
            <tr key={tt.id}>
              <td>
                <NavLink to={`/tasks/${tt.id}/edit`}>
                  <button className="btn-table">Edit</button>
                </NavLink>
              </td>
              <td>{tt.name}</td>
              <td>{tt.cadence.toUpperCase()}</td>
              <td>{tt.category}</td>
            </tr>
          ))}
        </tbody>
      </TableContainer>
    </div>
  );
};

export default Tasks;
