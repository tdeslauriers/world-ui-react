import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../common/Loading";
import useTable from "../../common/useTable";
import eventBus from "../../security/EventBus";
import { getMetrics } from "../../slices/dashboard";
import Daily from "./Daily";

const metricHeaders = [
  { id: "metric", label: "Metric", disableSorting: true },
  { id: "complete", label: "Total Completed", disableSorting: true },
  { id: "percentage", label: "Percentage of total", disableSorting: true },
];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { metrics: reduxMetrics } = useSelector((state) => state.dashboard);
  const { message: dashboardMessage } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const { TableContainer, TableHead } = useTable(null, metricHeaders);

  useEffect(() => {
    if (!reduxMetrics) {
      dispatch(getMetrics());
      setLoading(false);
    }
    setLoading(false);
    if (
      dashboardMessage &&
      dashboardMessage === "Request failed with status code 401"
    ) {
      eventBus.dispatch("logout");
    }
  }, [dispatch, reduxMetrics, dashboardMessage]);

  if (!isLoggedIn) {
    navigate("/login", { state: { from: location } });
  }

  if (dashboardMessage) {
    navigate("/error", { state: { from: location } });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {reduxMetrics && (
        <div>
          <h3>
            7 Day Allowance Dashboard:{" "}
            <strong>{`${reduxMetrics.firstname} ${reduxMetrics.lastname}`}</strong>
          </h3>
          <hr />
          <div className="top-column">
            <div className="child-column">
              <div>
                Current balance: <strong>{reduxMetrics.balance}</strong> USD
              </div>
              <div>
                Weekly allowance: <strong>{reduxMetrics.age}</strong>{" "}
                <sup>*based on age</sup>
              </div>
              <div>
                Total Tasks assigned: <strong>{reduxMetrics.total}</strong>
              </div>
              <br />
              <TableContainer>
                <TableHead />
                <tbody>
                  <tr>
                    <td>Completed</td>
                    <td>{reduxMetrics.totalCompleted}</td>
                    {reduxMetrics.percentageCompleted > 50 ? (
                      <td>{reduxMetrics.percentageCompleted}%</td>
                    ) : (
                      <td className="alert" style={{ borderStyle: "none" }}>
                        {reduxMetrics.percentageCompleted}%
                      </td>
                    )}
                  </tr>
                  <tr>
                    <td>Satisfactory</td>
                    <td>{reduxMetrics.totalSatisfactory}</td>
                    {reduxMetrics.percentageSatisfactory > 50 ? (
                      <td>{reduxMetrics.percentageSatisfactory}%</td>
                    ) : (
                      <td className="alert" style={{ borderStyle: "none" }}>
                        {reduxMetrics.percentageSatisfactory}%
                      </td>
                    )}
                  </tr>
                </tbody>
              </TableContainer>
              <br />
              <h4>Assigned:</h4>
              <ol>
                {reduxMetrics.assigned &&
                  reduxMetrics.assigned.map((at) => (
                    <li>
                      <span style={{ color: "var(--primary)" }}>{at.name}</span>
                      : <span>{at.cadence}</span>
                    </li>
                  ))}
              </ol>
            </div>
            <div className="child-column"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
