import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogoutOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import Quizzes from "./quizzes";
import Header from "components/header";
import AddButton from "components/addButton";
import {
  selectCreateQuizzMessage,
  selectQuizError,
  resetCreateQuizzMessage,
  resetErrorMessage,
  selectQuizStatus,
} from "store/quiz";
import { getMyQuizzes } from "store/quiz/asyncActions";
import { resetRegisterMessage, selectRegisterMessage } from "store/auth";
import { Status } from "constants";
import { logoutRequestAsync } from "store/auth/asyncActions";
import "./quizzes.css";

const Home = () => {
  const dispatch = useDispatch();
  const quizError = useSelector(selectQuizError);
  const quizCreateMessage = useSelector(selectCreateQuizzMessage);
  const authRegisteredMessage = useSelector(selectRegisterMessage);
  const quizStatus = useSelector(selectQuizStatus);
  const [showQuizModal, setShowQuizModal] = useState(false);

  useEffect(() => {
    dispatch(getMyQuizzes());
  }, [dispatch]);

  useEffect(() => {
    if (quizCreateMessage) {
      toast.success(quizCreateMessage);
      dispatch(resetCreateQuizzMessage());
    } else if (quizError && quizStatus === Status.FAILED) {
      toast.error(quizError);
      dispatch(resetErrorMessage());
    } else if (authRegisteredMessage) {
      toast.success(authRegisteredMessage);
      dispatch(resetRegisterMessage());
    }
  }, [
    dispatch,
    quizCreateMessage,
    quizError,
    authRegisteredMessage,
    quizStatus,
  ]);

  const handleLogout = () => {
    dispatch(logoutRequestAsync());
  };
  return (
    <div className="d-flex flex-column h-100">
      <Header className="px-5" title={"Published Quizzes"}>
        <div className="w-100 d-flex justify-content-between">
          <AddButton title="Quiz" onClick={() => setShowQuizModal(true)} />
          <AddButton
            title="Logout"
            icon={LogoutOutlined}
            onClick={handleLogout}
          />
        </div>
      </Header>
      <Quizzes
        showQuizModal={showQuizModal}
        setShowQuizModal={setShowQuizModal}
      />
    </div>
  );
};

export default Home;
