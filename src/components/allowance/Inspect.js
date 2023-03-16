import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../common/Loading";
import eventBus from "../../security/EventBus";
import {
  getInspectionTasks,
  updateCompleteStatus,
  updateSatisfactoryStatus,
} from "../../slices/taskInspects";
import { updateTaskComplete, updateTaskQuality } from "../../slices/tasks";
import TaskView from "./TaskView";

const Inspect = () => {
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
  const { taskInspects: inspects } = useSelector((state) => state);
  const { message: inspectMessage } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!inspects.length) {
      setLoading(true);
      dispatch(getInspectionTasks());
    }

    if (inspects.length) {
      setLoading(false);
    }

    if (inspects && inspects === "Request failed with status code 401") {
      eventBus.dispatch("logout");
    }
  }, [dispatch, inspects]);

  const handleStatusUpdate = (event) => {
    event.preventDefault();

    let cmd = {
      taskId: parseInt(event.target.id),
      status: event.target.value === "false" ? true : false,
    };
    if (event.target.name === "complete") {
      setLoading(true);
      dispatch(updateTaskComplete(cmd))
        .unwrap()
        .then(() => {
          dispatch(updateCompleteStatus(cmd));
        });
    }
    if (event.target.name === "satisfactory") {
      if (currentUser.roles && currentUser.roles.includes("ALLOWANCE_ADMIN")) {
        setLoading(true);
        dispatch(updateTaskQuality(cmd))
          .unwrap()
          .then(() => {
            dispatch(updateSatisfactoryStatus(cmd));
          });
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

  if (inspectMessage) {
    navigate("/error", { state: { from: location } });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h3>Task Inspection:</h3>
      <hr />
      <input
        className="form-control"
        name="filter"
        type="text"
        placeholder="Search daily tasks"
        onChange={handleFilter}
      />
      <ul>
        <li>Search bar filters all tables</li>
        <li>Click on any status to update</li>
      </ul>
      {inspects &&
        inspects.map((i) => (
          <div key={i.id}>
            <h3>
              Daily Tasks: <strong>{`${i.firstname} ${i.lastname}`}</strong>
            </h3>
            {i.tasks ? (
              <>
                <TaskView
                  tasks={i.tasks}
                  statusUpdate={handleStatusUpdate}
                  filtered={filterFn}
                />
              </>
            ) : (
              <>None assigned.</>
            )}
            <br />
            <hr />
          </div>
        ))}
    </div>
  );
};

export default Inspect;
