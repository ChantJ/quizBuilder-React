import { useEffect, useState } from "react";
import styled from "styled-components";
import { Input, Checkbox } from "antd";
import { InputField, ErrorMessage } from "containers";
import IconButton from "components/iconButton";
import QuestionOptionForm from "./questionOptionForm";
import QuestionOptionsWrapper from "views/modals/common/optionsWrapper";
import FooterButtons from "components/footerButtons";

const QuestionModal = ({
  number,
  handleCancel,
  handleSubmitQuestion,
  questionToEdit,
}) => {
  const [showOptionInput, setShowOptionInput] = useState(false);
  const [form, setForm] = useState({
    title: "",
    multiple: false,
    options: [],
  });
  const [errors, setErrors] = useState({});
  const [optionToEdit, setOptionToEdit] = useState(null);

  useEffect(() => {
    if (questionToEdit) setForm({ ...questionToEdit });
  }, [questionToEdit]);

  const handleOptionAdd = (data) => {
    let newOptions = [...form.options];
    if (data.id) {
      newOptions.forEach((el, index) => {
        if (el.id === data.id) newOptions[index] = data;
      });
    } else newOptions.push({ ...data, id: form.options.length + 1 });
    setShowOptionInput(false);
    setOptionToEdit(null);
    setForm({ ...form, options: newOptions });
    setErrors({});
  };

  const handleRemoveOption = (option) => {
    let newOptions = [...form.options];
    setForm({
      ...form,
      options: newOptions.filter((el) => el.id !== option.id),
    });
  };

  const handleOpenOptionField = (option) => {
    setOptionToEdit(option);
    setShowOptionInput(true);
  };

  const handleSubmit = () => {
    const { title, multiple, options } = form;
    if (!title) setErrors({ title: "Required" });
    else if (options.length <= 1)
      setErrors({
        options: "there should be at least 2 options",
      });
    else if (options.filter((el) => el.rightAnswer).length < 1)
      setErrors({
        options: "there should be at least 1 right answers",
      });
    else if (multiple && options.filter((el) => el.rightAnswer).length === 1)
      setErrors({
        options: "there should be at least 2 right answers",
      });
    else if (!multiple && options.filter((el) => el.rightAnswer).length > 1)
      setErrors({
        options: "there should be only 1 right answer",
      });
    else {
      handleSubmitQuestion(form);
      setForm({ title: "", multiple: false, options: [] });
    }
  };

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
    setErrors({});
  };

  return (
    <Container>
      <div style={{ fontSize: 28, fontWeight: 800 }}>Question {number}</div>
      <InputField width={"100%"}>
        <Input
          placeholder="enter your question"
          value={form.title}
          onChange={(e) => {
            handleChange("title", e.target.value);
          }}
        />
        {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
      </InputField>
      <InputField className="align-self-start">
        <Checkbox
          checked={form.multiple}
          onChange={() => handleChange("multiple", !form.multiple)}
        >
          Multiple choice
        </Checkbox>
      </InputField>
      <InputField width={"100%"}>
        <label>Options</label>
        <QuestionOptionsWrapper
          options={form.options}
          onDelete={handleRemoveOption}
          handleOpenOptionField={handleOpenOptionField}
        />
        {showOptionInput && (
          <QuestionOptionForm
            option={optionToEdit}
            onCancel={() => {
              setOptionToEdit(null);
              setShowOptionInput(false);
            }}
            onSubmit={handleOptionAdd}
            multiple={form.multiple}
            hasRightAnswer={
              form.options.filter((el) => el.rightAnswer).length > 0
            }
          />
        )}
        {errors.options && <ErrorMessage>{errors.options}</ErrorMessage>}
        {form.options.length < 5 && (
          <IconButton title="Option" onClick={() => setShowOptionInput(true)} />
        )}
      </InputField>
      <FooterButtons
        submitText="Add"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </Container>
  );
};

export default QuestionModal;

const Container = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  & label,
  span {
    font-size: 16px;
    font-weight: 600;
  }
`;
