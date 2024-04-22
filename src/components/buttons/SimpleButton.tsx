import styled from "styled-components";
import Icon from "../other/Icons";

export interface SimpleButtonProps {
  text: string;
  iconName?: string;
  onClick: () => void;
}

const SimpleButton = ({ iconName, text, onClick }: SimpleButtonProps) => {
  return (
    <Container onClick={onClick}>
      {iconName ? (
        <IconContainer>
          <StyledIcons name={iconName} />
        </IconContainer>
      ) : null}
      {text}
    </Container>
  );
};

const Container = styled.div`
  color: black;
  cursor: pointer;
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

const IconContainer = styled.div`
  margin-right: 4px;
`;

const StyledIcons = styled(Icon)`
  font-size: 1.6rem;
  vertical-align: middle;
`;
export default SimpleButton;
