import styled from "styled-components";
import { Colors } from "constants/index";
import { CloseOutlined } from "@ant-design/icons";

const QuestionOptionsWrapper = ({
  options,
  onDelete,
  handleOpenOptionField,
  disable,
}) => {
  return (
    <OptionsContainer>
      {options.map((option, index) => (
        <OptionWrapper
          key={index}
          right={option.rightAnswer}
          disable={disable}
          onClick={() => (disable ? {} : handleOpenOptionField(option))}
        >
          <div>{option.title}</div>
          {onDelete && (
            <CloseOutlined
              className="pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete(option);
              }}
            />
          )}
        </OptionWrapper>
      ))}
    </OptionsContainer>
  );
};
export default QuestionOptionsWrapper;

const OptionsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
  flex-wrap: wrap;
`;

const OptionWrapper = styled.div`
  cursor: ${(props) => (props.disable ? "default" : 'pointer')};
  padding: 5px 15px;
  background: ${(props) => (props.right ? Colors.green : Colors.white)};
  color: ${(props) => (props.right ? Colors.white : Colors.black)};
  box-shadow: 0px 15px 35px 0px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  line-height: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  & svg {
    font-size: 11px;
  }
`;
