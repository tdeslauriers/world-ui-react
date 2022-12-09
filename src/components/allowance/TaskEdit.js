import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const TaskEdit = () => {
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { tasktypes: allTasktypes} = useSelector(state => state)
  const { message: roleMessage } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  return <div>TaskEdit</div>;
};

export default TaskEdit;
