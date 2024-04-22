import styled from "styled-components";
import Icon from "./Icons";

const EditIcon = ({ onClick }) => (
  <IconContainer onClick={onClick}>
    <StyledIcon name="edit" />
  </IconContainer>
);
const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const StyledIcon = styled(Icon)`
  font-size: 2.4rem;
  color: #697586;
`;
export default EditIcon;
