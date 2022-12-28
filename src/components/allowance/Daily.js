import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../common/Loading";
import eventBus from "../../security/EventBus";

const Daily = () => {
  //   const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.auth);

  const { message: dailyMessage } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      dailyMessage &&
      dailyMessage === "Request failed with status code 401"
    ) {
      eventBus.dispatch("logout");
    }
  }, [dispatch, dailyMessage]);

  if (!isLoggedIn) {
    navigate("/login", { state: { from: location } });
  }

  if (dailyMessage) {
    navigate("/error", { state: { from: location } });
  }

  //   if (loading) {
  //     return <Loading />;
  //   }

  return (
    <div>
      <h3>
        Todo List: <strong>daily, weekly, and ad-hoc tasks.</strong>
      </h3>
      <hr />
      <h4>Click on status to update.</h4>
    </div>
  );
};

export default Daily;
