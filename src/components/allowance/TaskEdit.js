import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../../common/Loading";
import eventBus from "../../security/EventBus";
import tasktypeService from "../../services/tasktypeService";
import { setMessage } from "../../slices/message";
import { CADENCE_MENU, CATEGORY_MENU } from ".";
import { saveTasktype, updateTasktype } from "../../slices/tasktypes";

const TaskEdit = () => {
  const [loading, setLoading] = useState(false);
  const [tasktype, setTasktype] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { tasktypes: allTasktypes } = useSelector((state) => state);
  const { message: tasktypeMessage } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const getTasktype = (id) => {
    tasktypeService
      .getTasktypeById(id)
      .then((response) => {
        setTasktype(response);
        setLoading(false);
      })
      .catch((error) => {
        const message = error.message || error.status;
        dispatch(setMessage(message));
      });
  };

  useEffect(() => {
    if (id && allTasktypes.length === 0) {
      setLoading(true);
      getTasktype(id);
    }

    if (id && allTasktypes.length > 0) {
      let exists = allTasktypes.find((tt) => {
        return tt.id === parseInt(id);
      });
      setTasktype(exists);
      setLoading(false);
    }

    if (
      tasktypeMessage &&
      tasktypeMessage === "Request failed with status code 401"
    ) {
      eventBus.dispatch("logout");
    }
  }, [dispatch, allTasktypes, tasktypeMessage]);

  const handleFieldChange = (event) => {
    event.preventDefault();
    setTasktype((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();

    if (!id) {
      const saved = {
        name: tasktype.name,
        cadence: tasktype.cadence,
        category: tasktype.category,
        archived: false,
      };
      dispatch(saveTasktype(saved))
        .unwrap()
        .then(() => {
          if (location.state?.from) {
            navigate(location.state.from);
          } else {
            navigate("/tasks");
          }
        });
    }

    if (id) {
      dispatch(updateTasktype(tasktype))
        .unwrap()
        .then(() => {
          if (location.state?.from) {
            navigate(location.state.from);
          } else {
            navigate("/tasks");
          }
        });
    }
  };

  const handleCancel = (event) => {
    location.state?.from ? navigate(location.state.from) : navigate("/tasks");
  };

  if (!isLoggedIn) {
    navigate("/login", { state: { from: location } });
  }

  if (tasktypeMessage) {
    navigate("/error", {
      state: { from: location },
    });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <form>
        <div className="top-column">
          <div className="child-column">
            {id ? (
              <h3>
                Edit Task: <strong>{tasktype.name}</strong>
              </h3>
            ) : (
              <h3>
                Add Task: <strong>{tasktype.name}</strong>
              </h3>
            )}
          </div>
          <div className="child-column">
            <div className="btngroup">
              <button className="btn-profile" onClick={handleSave}>
                Save
              </button>
              <button className="btn-profile btn-cancel" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
        <hr />
        <>
          <input
            className="form-control"
            name="name"
            type="text"
            placeholder="Task"
            value={tasktype.name}
            onChange={handleFieldChange}
          />
          <select
            className="form-control"
            id={tasktype.id}
            name="cadence"
            text="text"
            value={
              tasktype.cadence
                ? `${tasktype.cadence.replace(/\w\S*/g, function (type) {
                    return (
                      type.charAt(0).toUpperCase() +
                      type.substr(1).toLowerCase()
                    );
                  })}`
                : "Select Cadence"
            }
            onChange={handleFieldChange}
          >
            <option k={0} value="Select Cadence" disabled hidden>
              Select Cadence
            </option>
            {CADENCE_MENU.map((c, i) => (
              <option key={i + 1} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            className="form-control"
            id={tasktype.id}
            name="category"
            text="text"
            value={
              tasktype.category
                ? `${tasktype.category.replace(/\w\S*/g, function (type) {
                    return (
                      type.charAt(0).toUpperCase() +
                      type.substr(1).toLowerCase()
                    );
                  })}`
                : "Select Category"
            }
            onChange={handleFieldChange}
          >
            <option k={0} value="Select Category" disabled hidden>
              Select Category
            </option>
            {CATEGORY_MENU.map((c, i) => (
              <option key={i + 1} value={c}>
                {c}
              </option>
            ))}
          </select>
        </>
      </form>
    </>
  );
};

export default TaskEdit;
