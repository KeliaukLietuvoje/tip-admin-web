import Div100vh from 'react-div-100vh';
import styled from 'styled-components';
import LoginImage from '../../assets/LoginImage.jpg';
import { device } from '../../styles';
import Logo from '../other/Logo';

export interface LoginLayoutProps {
  children?: JSX.Element;
}

const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <Div100vh>
      <Container>
        <LayoutImage alt="login-background-image" src={LoginImage} />
        <InnerContainer>
          <StyledLogo />
          {children}
        </InnerContainer>
      </Container>
    </Div100vh>
  );
};

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  height: 100%;
  overflow-y: auto;
`;

const StyledLogo = styled(Logo)`
  svg {
    width: 150px;
    height: 100px;
  }
`;

const InnerContainer = styled.div`
  background-color: #ffffff;
  padding: 0 48px 16px 55px;
  width: 100%;
  height: fit-content;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media ${device.mobileM} {
    padding: 16px;
  }
`;

const LayoutImage = styled.img`
  min-width: 70%;
  top: 0;
  position: sticky;
  object-fit: cover;
  @media ${device.mobileL} {
    display: none;
  }
`;

export default LoginLayout;
