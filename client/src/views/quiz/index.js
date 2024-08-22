import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import { Radio, Checkbox } from "antd";
import { isEqual } from "lodash";
import {
  selectSingleQuiz,
  selectSingleQuizError,
  resetQuizErrorMessage,
} from "store/quiz";
import Header from "components/header";
import { BtnContainer } from "containers";
import { getQuizz } from "store/quiz/asyncActions";
import { Colors } from "constants/index";
import { toast } from "react-toastify";

const TakeQuizComp = () => {
  const dispatch = useDispatch();
  const { permalink } = useParams();
  const quizError = useSelector(selectSingleQuizError);
  const quiz = useSelector(selectSingleQuiz);
  const [quizData, setQuizData] = useState({});
  const [answers, setAnswers] = useState({});
  const [rightAnswered, setRigthAnswered] = useState(0);
  useEffect(() => {
    if (quizError) {
      toast.error(quizError);
      dispatch(resetQuizErrorMessage());
    }
  }, [dispatch, quizError]);

  useEffect(() => {
    dispatch(getQuizz(permalink));
  }, [dispatch, permalink]);

  useEffect(() => {
    if (quiz.title) {
      let newQuiz = { ...quiz };
      newQuiz.questions = JSON.parse(quiz.questions);
      newQuiz.questions.forEach((el) => {
        el.options.forEach((option) => {
          option.label = option.title;
          option.value = option.title;
        });
      });
      setQuizData(newQuiz);
    }
  }, [quiz]);

  const onChange = (e, index) => {
    let newAnswers = { ...answers };
    newAnswers[index] = e;
    setAnswers(newAnswers);
  };

  const onSubmit = () => {
    let originalRightAnswers = {};
    let answeredRightAnswersQTY = 0;
    quizData.questions.forEach((el, index) => {
      let rightAnswer = el.options
        .filter((option) => option.rightAnswer)
        .map((option) => option.value);
      if (el.multiple) originalRightAnswers[index] = rightAnswer;
      else originalRightAnswers[index] = rightAnswer[0];
    });
    Object.keys(answers).forEach((key) => {
      if (isEqual(answers[key], originalRightAnswers[key]))
        answeredRightAnswersQTY++;
    });
    setRigthAnswered(answeredRightAnswersQTY.toString());
  };

  return (
    <div className=" flex-column h-100 align-items-center">
      <Header
        className="px-5"
        title={rightAnswered ? "Quiz Result" : "Take a Quiz"}
      />
      <BodyWrapper>
        {rightAnswered ? (
          <ResultWrapper
            score={rightAnswered}
            total={quizData.questions?.length}
          >
            <div>You scored</div>
            <div className="result d-flex">
              {rightAnswered} / {quizData.questions?.length}
            </div>
            <div>thank you for taking the quiz</div>
          </ResultWrapper>
        ) : (
          <div className="d-flex flex-column">
            <TitleWrapper>
              <div>Title: </div>
              <div className="quiz-title">{quizData.title} </div>
            </TitleWrapper>
            <QuestionsContainer>
              <div className="quiz-title">Questions:</div>
              {quizData.questions?.map((question, index) => (
                <QuestionsWrapper key={index} className="d-flex gap-2">
                  <div>{index + 1}. </div>
                  <div className="d-flex flex-column">
                    <div> {question.title}</div>
                    {question.multiple ? (
                      <Checkbox.Group
                        options={question.options}
                        defaultValue={[]}
                        onChange={(e) => onChange(e, index)}
                      />
                    ) : (
                      <Radio.Group
                        options={question.options}
                        onChange={(e) => onChange(e.target.value, index)}
                      />
                    )}
                  </div>
                </QuestionsWrapper>
              ))}
            </QuestionsContainer>
            <BtnContainer
              width={"200px"}
              className="align-self-center mt-3"
              height={"50px"}
              type="text"
              onClick={onSubmit}
            >
              Submit
            </BtnContainer>
          </div>
        )}
      </BodyWrapper>
    </div>
  );
};
export default TakeQuizComp;

const BodyWrapper = styled.div`
  padding: 80px 50px;
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
  & > div {
    width: 70%;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  & * {
    font-weight: 600;
    font-size: 22px;
  }
`;

const QuestionsContainer = styled.div`
  flex-direction: column;
  display: flex;
  gap: 10px;
  & * {
    font-size: 18px;
  }
`;

const QuestionsWrapper = styled.div`
  padding: 15px;
  border-radius: 10px;
  background: ${Colors.white};
`;

const ResultWrapper = styled(QuestionsWrapper)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 400px !important;
  align-items: center;
  & * {
    font-weight: 600;
    font-size: 22px;
  }
  .result {
    font-size: 32px;
    font-weight: 800;
    color: ${(props) =>
      props.score < props.total / 2 ? Colors.dark_red : Colors.green};
  }
`;
