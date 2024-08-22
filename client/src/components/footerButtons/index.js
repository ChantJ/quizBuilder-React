import { Button } from "antd";
import { BtnContainer } from "containers";
import styled from "styled-components";

const FooterButtons = ({ onSubmit, onCancel, submitText, hideSubmit }) => {
  return (
    <Container>
      <Button type="text" onClick={onCancel}>
        Cancel
      </Button>
      {!hideSubmit && (
        <BtnContainer
          width={"fit-content"}
          height={"40px"}
          type="text"
          onClick={onSubmit}
        >
          {submitText}
        </BtnContainer>
      )}
    </Container>
  );
};

export default FooterButtons;

const Container = styled.div`
  bottom: 20px;
  right: 20px;
  width: 100%;
  justify-content: end !important;
  gap: 8px;
  align-items: center;
  display: flex;
  position: absolute;
`;
