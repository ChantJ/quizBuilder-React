import styled from "styled-components";
import { Colors } from "constants/index";
import { Title } from "containers";

const Header = ({ title, bgdColor, className, titleWidth, children }) => {
  return (
    <Container bgdColor={bgdColor} className={className}>
      <Title width={titleWidth}>{title}</Title>
      {children}
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  position: sticky;
  top: 0px;
  overflow: visible;
  z-index: 2;
  width: 100%;
  height: 90px;
  background: ${(props) => props.bgdColor || Colors.darker_blue};
  box-shadow: 0px 15px 25px 0px rgba(0, 0, 0, 0.2);
  justify-content: center;
  align-items: center;
`;
