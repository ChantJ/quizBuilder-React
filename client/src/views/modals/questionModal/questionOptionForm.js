import { useEffect, useState } from "react";
import { Input, Checkbox } from "antd";
import { InputField, ErrorMessage } from "containers";
import FooterButtons from "components/footerButtons";
import styled from "styled-components";

const QuestionOptionForm = ({
  onSubmit,
  onCancel,
  multiple,
  hasRightAnswer,
  option,
}) => {
  const [form, setForm] = useState({ title: "", rightAnswer: false });
  const [errors, setErrors] = useState({});
  const handleCancel = () => {
    onCancel();
  };

  useEffect(() => {
    if (option) setForm(option);
  }, [option]);

  const handleSubmitOption = (data) => {
    if (form.title) onSubmit(form);
    else setErrors({ title: "required" });
  };

  return (
    <Container className="simple-flex flex-column">
      <InputField width={"100%"}>
        <Input
          placeholder="enter option name"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
      </InputField>
      {(multiple || (!multiple && !hasRightAnswer)) && (
        <InputField width={"fit-content"}>
          <Checkbox
            name="rightAnswer"
            onChange={(e) => {
              setForm({ ...form, rightAnswer: e.target.checked });
            }}
            checked={form.rightAnswer}
          >
            Right answer
          </Checkbox>
        </InputField>
      )}
      <FooterButtons
        submitText="Add"
        onSubmit={handleSubmitOption}
        onCancel={handleCancel}
      />
    </Container>
  );
};

export default QuestionOptionForm;

const Container = styled.div`
  box-shadow: 0px 15px 35px 0px rgba(0, 0, 0, 0.1);
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  position: relative;
  min-height: 150px;
`;
