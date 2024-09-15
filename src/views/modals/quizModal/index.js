import { useState, useEffect } from "react";
import styled from "styled-components";
import { Colors } from "constants/index";
import Header from "components/header";
import { Input } from "antd";
import { InputField, ErrorMessage } from "containers";
import QuizModalQuestions from "./quizModalQuestions";
import IconButton from "components/iconButton";
import ModalComponent from "components/modal";
import QuestionModal from "views/modals/questionModal";
import FooterButtons from "components/footerButtons";

const QuizModal = ({ number, handleCancel, handleSubmit, quiz }) => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [errors, setErrors] = useState({});
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [questionToEdit, setQuestiontoEdit] = useState(null);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    if (quiz) {
      setTitle(quiz.title);
      setQuestions(JSON.parse(quiz.questions));
      setDisable(true);
    } else setDisable(false);
  }, [quiz]);

  const handleSubmitQuestion = (data) => {
    setErrors({});
    let newQuestions = [...questions];
    if (data.id) {
      newQuestions.forEach((el, index) => {
        if (el.id === data.id) newQuestions[index] = data;
      });
    } else newQuestions.push({ ...data, id: questions.length + 1 });
    setShowQuestionModal(false);
    setQuestions(newQuestions);
  };

  const handleEdit = (question) => {
    setQuestiontoEdit(question);
    setShowQuestionModal(true);
  };

  const handleRemove = (id) => {
    let newQuestions = [...questions];
    setQuestions(newQuestions.filter((el) => el.id !== id));
  };

  const onSubmit = () => {
    if (!title) setErrors({ title: "Required" });
    else if (!questions.length)
      setErrors({
        questions: "There should be at least 1 question to publish",
      });
    else {
      handleSubmit({ title, questions: JSON.stringify(questions) });
      reset();
    }
  };

  const reset = () => {
    setTitle("");
    setQuestions([]);
    setErrors({});
  };

  const onCancel = () => {
    reset();
    handleCancel();
  };
  return (
    <div>
      <Header
        className="modal-header"
        title={`Quiz ${number}`}
        bgdColor={Colors.dark_blue}
      />
      <BodyWrapper>
        <InputField>
          <label>Quiz Title</label>
          <Input
            readOnly={disable}
            placeholder="enter a quiz title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors({});
            }}
          />
          {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
        </InputField>
        <InputField>
          <label>Questions:</label>
          <QuizModalQuestions
            questions={questions}
            disable={disable}
            editQuestion={handleEdit}
            onDelete={handleRemove}
          />
          {errors.questions && <ErrorMessage>{errors.questions}</ErrorMessage>}
          {questions.length < 10 && !disable && (
            <IconButton
              title="Question"
              onClick={() => setShowQuestionModal(true)}
            />
          )}
        </InputField>
      </BodyWrapper>
      <FooterButtons
        submitText="Publish"
        onSubmit={onSubmit}
        hideSubmit={disable}
        onCancel={onCancel}
      />
      <ModalComponent isVisible={showQuestionModal} className="question-modal">
        <QuestionModal
          number={questions.length + 1}
          handleCancel={() => setShowQuestionModal(false)}
          handleSubmitQuestion={handleSubmitQuestion}
          questionToEdit={questionToEdit}
        />
      </ModalComponent>
    </div>
  );
};

export default QuizModal;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 30px 30px;
  & label {
    font-size: 18px;
  }
`;
