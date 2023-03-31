import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../../../common/Loading";
import eventBus from "../../../security/EventBus";
import roleService from "../../../services/roleService";
import { setMessage } from "../../../slices/message";
import { saveRole, updateRole } from "../../../slices/roles";
import { updateRoleForUsers } from "../../../slices/users";

const RoleEdit = () => {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { roles: allRoles } = useSelector((state) => state);
  const { message: roleMessage } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const getRole = (id) => {
    roleService
      .getRoleById(id)
      .then((response) => {
        setRole(response);
        setLoading(false);
      })
      .catch((error) => {
        const message = error.message || error.status;
        dispatch(setMessage(message));
      });
  };

  useEffect(() => {
    if (id && allRoles.length === 0) {
      setLoading(true);
      getRole(id);
    }

    if (id && allRoles.length > 0) {
      let exists = allRoles.find((r) => {
        return r.id === parseInt(id);
      });
      setRole(exists);
      setLoading(false);
    }

    if (roleMessage && roleMessage === "Request failed with status code 401") {
      eventBus.dispatch("logout");
    }
  }, [dispatch, allRoles, id, roleMessage]);

  const handleRoleChange = (event) => {
    event.preventDefault();
    setRole((previousRole) => ({
      ...previousRole,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();

    if (!id) {
      dispatch(saveRole(role))
        .unwrap()
        .then(() => {
          if (location.state?.from) {
            navigate(location.state.from);
          } else {
            navigate("/roles");
          }
        });
    }

    if (id) {
      dispatch(updateRole(role))
        .unwrap()
        .then(() => {
          dispatch(updateRoleForUsers(role));

          if (location.state?.from) {
            navigate(location.state.from);
          } else {
            navigate("/roles");
          }
        });
    }
  };

  const handleCancel = (event) => {
    location.state?.from ? navigate(location.state.from) : navigate("/roles");
  };

  if (!isLoggedIn) {
    navigate("/login", { state: { from: location } });
  }

  if (roleMessage) {
    navigate("/error", {
      state: { from: location },
    });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {role && (
        <>
          <form>
            <div className="top-column">
              <div className="child-column">
                {id ? (
                  <h3>
                    Edit Role: <strong>{role.title}</strong>
                  </h3>
                ) : (
                  <h3>Add Role:</h3>
                )}
              </div>
              <div className="child-column">
                <div className="btngroup">
                  <button className="btn-profile" onClick={handleSave}>
                    Save
                  </button>
                  <button
                    className="btn-profile btn-cancel"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
            <hr />
            <div className="profile-form">
              <input
                className="form-control"
                name="title"
                type="text"
                placeholder="Role Title"
                value={role.title}
                onChange={handleRoleChange}
              />
              <input
                className="form-control"
                name="role"
                type="text"
                placeholder="Role/Scope"
                value={role.role}
                onChange={handleRoleChange}
              />
              <input
                className="form-control"
                name="description"
                type="text"
                placeholder="Description"
                value={role.description}
                onChange={handleRoleChange}
              />
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default RoleEdit;
