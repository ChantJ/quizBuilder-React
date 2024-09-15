import styled from "styled-components";
import { Colors } from "constants/index";
import { Button } from "antd";

export const VerticalCenteredFlex = styled.div`
  display: flex;
  align-items: center;
`;

export const InputField = styled.div`
  label {
    margin-bottom: 5px;
    font-weight: 600;
  }
  input,
  .ant-input-password {
    padding: 15px;
    background: ${Colors.white};
    border-radius: 5px;
    border-color: ${Colors.light_sea_green};
    &:hover {
      border-color: ${Colors.light_sea_green};
    }
  }
  margin-bottom: 20px;
  width: ${(props) => props.width || "700px"};
  @media (max-width: 900px) {
    width: ${(props) => props.width || "80%"};
  }
`;

export const ErrorMessage = styled.div`
  color: ${Colors.dark_red};
`;

export const BtnContainer = styled(Button)`
  width: ${(props) => props.width || "700px"};
  background: ${Colors.light_sea_green};
  color: ${Colors.white};
  border-radius: 5px;
  font-size: 20px;
  font-weight: 600;
  height: ${(props) => props.height || "50px"};
  border: none;
  &:hover {
    background: ${Colors.light_sea_green};
    color: ${Colors.white};
  }

  @media (max-width: 900px) {
    width: ${(props) => props.width || "80%"};
  }
`;
