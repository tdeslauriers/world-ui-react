import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../../common/Loading";
import eventBus from "../../security/EventBus";
import tasktypeService from "../../services/tasktypeService";
import { getAllowances } from "../../slices/allowances";
import { setMessage } from "../../slices/message";
import { CADENCE_MENU, CATEGORY_MENU } from ".";
import { saveTasktype, updateTasktype } from "../../slices/tasktypes";
import useSelect from "../../common/useSelect";
import useTable from "../../common/useTable";

const headers = [
  { id: "firstname", label: "Firstname" },
  { id: "lastname", label: "Lastname" },
  { id: "options", label: "Options" },
];

const TaskEdit = () => {
  const [loading, setLoading] = useState(false);
  const [tasktype, setTasktype] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { tasktypes: allTasktypes } = useSelector((state) => state);
  const { allowances: allAllowances } = useSelector((state) => state);
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
      !allAllowances.length &&
      currentUser.roles.includes("ALLOWANCE_ADMIN")
    ) {
      dispatch(getAllowances());
    }

    if (
      tasktypeMessage &&
      tasktypeMessage === "Request failed with status code 401"
    ) {
      eventBus.dispatch("logout");
    }
  }, [dispatch, allTasktypes, tasktypeMessage, allAllowances]);

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
        allowances: tasktype.allowances,
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

  const handleAllowanceSelect = (event) => {
    event.preventDefault();
    let updated = [];
    if (tasktype.allowances) {
      updated = [...tasktype.allowances];
    }
    let selected = allAllowances.find((a) => a.userUuid === event.target.value);
    if (!updated.find((a) => a.id === selected.id)) {
      updated.push(selected);
      setTasktype((previousTasktype) => ({
        ...previousTasktype,
        allowances: updated,
      }));
    }
  };

  const handleAllowanceRemove = (event) => {
    event.preventDefault();
  };

  const SelectCadence = useSelect(
    "cadence",
    tasktype.cadence,
    handleFieldChange
  );

  const SelectCategory = useSelect(
    "category",
    tasktype.category,
    handleFieldChange
  );

  const SelectAllowance = useSelect("name", null, handleAllowanceSelect);

  const { TableContainer, TableHead } = useTable(tasktype.allowances, headers);

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

  const isAdmin = currentUser.roles.includes("ALLOWANCE_ADMIN");

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
        <div className="top-column">
          <div className="chlid-column">
            <input
              className="form-control"
              name="name"
              type="text"
              placeholder="Task"
              value={tasktype.name}
              onChange={handleFieldChange}
            />
            <SelectCadence>
              {CADENCE_MENU.map((c, i) => (
                <option key={i + 1} value={c}>
                  {c}
                </option>
              ))}
            </SelectCadence>
            <SelectCategory>
              {CATEGORY_MENU.map((c, i) => (
                <option key={i + 1} value={c}>
                  {c}
                </option>
              ))}
            </SelectCategory>
          </div>
          <div className="chlid-column profile-form">
            {isAdmin && (
              <SelectAllowance>
                {allAllowances &&
                  allAllowances.map((a) => (
                    <option key={a.id} value={a.userUuid}>
                      {`${a.firstname} ${a.lastname}`}
                    </option>
                  ))}
              </SelectAllowance>
            )}
            <hr />
            {tasktype.allowances ? (
              <TableContainer>
                <TableHead />
                <tbody>
                  {tasktype.allowances.map((a) => (
                    <tr key={a.id}>
                      <td>{a.firstname}</td>
                      <td>{a.lastname}</td>
                      <td>
                        <button
                          className="btn-alert"
                          onClick={handleAllowanceRemove}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </TableContainer>
            ) : (
              <>No one assigned.</>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default TaskEdit;
