import styled from "styled-components";
import { Colors } from "constants/index";
import { Button } from "antd";

export const Title = styled.div`
  position: absolute;
  top: 40px;
  z-index: 1;
  height: 85px;
  font-size: 54px;
  align-items: center;
  font-weight: 800;
  background: ${Colors.light_sea_green};
  align-self: center;
  box-shadow: 0px 15px 35px 0px rgba(0, 0, 0, 0.2);
  width: ${(props) => props.width || "600px"};
  display: flex;
  justify-content: center;
  color: ${Colors.white};
`;

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
`;
