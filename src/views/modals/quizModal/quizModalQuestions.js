import QuestionOptionsWrapper from "views/modals/common/optionsWrapper";
import styled from "styled-components";
import { Colors } from "constants/index";
import { CloseOutlined } from "@ant-design/icons";

const QuizModalQuestions = ({ questions, editQuestion, onDelete, disable }) => {
  return (
    <Container className="d-flex flex-column gap-3">
      {questions.map((question, index) => (
        <QuestionsWrapper
          className="simple-flex pointer"
          key={index}
          disable={disable}
          onClick={() => (disable ? {} : editQuestion(question))}
        >
          <div style={{ fontFamily: 600 }}>{index + 1}.</div>
          <div className="simple-flex flex-column">
            <div style={{ fontFamily: 600 }}>{question.title}</div>
            <div className="simple-flex">
              <span style={{ color: "grey" }}>options:</span>
              <QuestionOptionsWrapper
                options={question.options}
                disable={true}
              />
            </div>
            <div className="simple-flex">
              <span style={{ color: "grey" }}>multiple:</span>
              <span>{question.multiple.toString()}</span>
            </div>
          </div>
          {!disable && (
            <CloseIcon
              className="pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete(question.id);
              }}
            />
          )}
        </QuestionsWrapper>
      ))}
    </Container>
  );
};

export default QuizModalQuestions;

const Container = styled.div`
  overflow-y: scroll;
  max-height: 350px;
  margin-bottom: 10px;
  position: relative;
`;
const QuestionsWrapper = styled.div`
  padding: 15px;
  border-radius: 10px;
  cursor: ${(props) => (props.disable ? "default" : "pointer")};
  background: ${Colors.light_blue};
`;

const CloseIcon = styled(CloseOutlined)`
  position: absolute;
  top: 10px;
  right: 10px;
`;
