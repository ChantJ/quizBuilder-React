import { useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { tokenUtils } from "utils";
import { selectLoginStatus, setStatus } from "store/auth";
import Login from "views/login";
import Home from "views/home";
import TakeQuizComp from "views/quiz";
import { Status } from "constants/index";

const MainRoutes = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();
  const authStatus = useSelector(selectLoginStatus);

  useEffect(() => {
    const token = tokenUtils.getToken();
    if (token) {
      if (authStatus !== Status.SUCCEEDED)
        dispatch(setStatus(Status.SUCCEEDED));
    } else {
      if (!location.pathname.includes("quizzes")) {
        dispatch(setStatus(Status.IDLE));
        history("/login");
      }
    }
  }, [dispatch, history, authStatus]);

  return (
    <div className="h-100">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/quizzes/:permalink" element={<TakeQuizComp />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default MainRoutes;
