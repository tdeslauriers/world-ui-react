import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../common/Loading";
import eventBus from "../../security/EventBus";
import {
  updateCompleteStatus,
  updateSatisfactoryStatus,
} from "../../slices/taskInspects";
import {
  getDailyTasks,
  updateTaskComplete,
  updateTaskQuality,
} from "../../slices/tasks";

import "./Task.css";
import TaskView from "./TaskView";

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

  const handleStatusUpdate = (event) => {
    event.preventDefault();

    let cmd = {
      taskId: parseInt(event.target.id),
      status: event.target.value === "false" ? true : false,
    };
    if (event.target.name === "complete") {
      dispatch(updateTaskComplete(cmd))
        .unwrap()
        .then(() => {
          dispatch(updateCompleteStatus(cmd));
        });
    }
    if (event.target.name === "satisfactory") {
      if (currentUser.roles && currentUser.roles.includes("ALLOWANCE_ADMIN")) {
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
      <TaskView
        tasks={dailyTasks}
        statusUpdate={handleStatusUpdate}
        filtered={filterFn}
      />
    </div>
  );
};

export default Daily;
