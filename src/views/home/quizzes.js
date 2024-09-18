import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spin } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import ModalComponent from "components/modal";
import QuizModal from "views/modals/quizModal/index";
import { selectQuizStatus, selectQuizData } from "store/quiz";
import { publishQuizz, deleteQuizz } from "store/quiz/asyncActions";
import { Status } from "constants/index";
import "./quizzes.css";

const Quizzes = ({ setShowQuizModal, showQuizModal }) => {
  const dispatch = useDispatch();
  const myQuizzes = useSelector(selectQuizData);
  const quizStatus = useSelector(selectQuizStatus);
  const [quizToEdit, setQuizToEdit] = useState(null);

  const handleSubmit = (data) => {
    dispatch(publishQuizz(data));
    setShowQuizModal(false);
    setQuizToEdit(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteQuizz(id));
  };

  const handleReview = (quiz) => {
    setQuizToEdit(quiz);
    setShowQuizModal(true);
  };

  if (quizStatus === Status.PENDING) {
    return (
      <div className="d-flex p-5 h-100 w-100 align-items-center">
        <Spin size="large" className="w-100" />
      </div>
    );
  }

  return (
    <div className="quizzes-container">
      {myQuizzes?.map((quiz, index) => (
        <div
          className="quiz-container d-flex flex-column gap-2"
          key={index}
          style={{ cursor: "pointer" }}
          onClick={() => handleReview(quiz)}
        >
          <div className="quiz-header">Quiz {index + 1}</div>
          <div className="quiz-title">{quiz.title}</div>
          <div className="quiz-questions-qty">
            {JSON.parse(quiz.questions).length} questions
          </div>
          <div className="quiz-action-footer">
            <Button
              shape="circle"
              icon={<ShareAltOutlined />}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigator.clipboard.writeText(quiz.permalink);
              }}
            />
            <Button
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDelete(quiz.id);
              }}
            />
          </div>
        </div>
      ))}
      <div className="quiz-container">
        <div className="add-quiz-container">
          <div
            className="btn-container"
            style={{ paddingRight: 10, background: "none" }}
            onClick={() => setShowQuizModal(true)}
          >
            <div className="icon-wrapper">
              <PlusOutlined />
            </div>
            <span className="px-3"> Quiz </span>
          </div>
        </div>
      </div>
      <ModalComponent isVisible={showQuizModal} className="quiz-modal">
        {showQuizModal && (
          <QuizModal
            quiz={quizToEdit}
            number={myQuizzes.length + 1}
            handleCancel={() => {
              setQuizToEdit(null);
              setShowQuizModal(false);
            }}
            handleSubmit={handleSubmit}
          />
        )}
      </ModalComponent>
    </div>
  );
};

export default Quizzes;
