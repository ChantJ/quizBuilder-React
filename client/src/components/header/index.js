import styled from "styled-components";
import { Colors } from "constants/index";

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
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0px;
  overflow: visible;
  z-index: 2;
  width: 100%;
  height: 90px;
  background: ${(props) => props.bgdColor || Colors.darker_blue};
  box-shadow: 0px 15px 25px 0px rgba(0, 0, 0, 0.2);
  @media (max-width: 900px) {
    height: 70px;
  }
`;

const Title = styled.div`
  position: absolute;
  top: 40%;
  z-index: 1;
  font-size: 54px;
  align-items: center;
  font-weight: 800;
  background: ${Colors.light_sea_green};
  align-self: center;
  border-radius: 5px;
  box-shadow: 0px 15px 35px 0px rgba(0, 0, 0, 0.2);
  padding: 5px 30px;
  display: flex;
  justify-content: center;
  color: ${Colors.white};
  @media (max-width: 900px) {
    padding: 5px 15px;
    font-size: 34px;
  }
`;
