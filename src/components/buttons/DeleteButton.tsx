import styled from 'styled-components';
import { device } from '../../styles';
import { useWindowSize } from '../../utils/hooks';
import { buttonsTitles } from '../../utils/texts';
import Icon from '../other/Icons';
import Button, { ButtonColors } from './Button';

const DeleteButton = ({ onClick }) => {
  const isMobile = useWindowSize(device.mobileL);

  return (
    <StyledButton
      onClick={onClick}
      variant={ButtonColors.TRANSPARENT}
      type="button"
      leftIcon={<StyledIcon name="deleteItem" />}
      buttonPadding="6px 8px"
    >
      {!isMobile ? buttonsTitles.delete : ''}
    </StyledButton>
  );
};

const StyledButton = styled(Button)`
  button {
    border-color: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.danger};
  }
  min-width: fit-content;
`;

const StyledIcon = styled(Icon)`
  cursor: pointer;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.danger};
  margin-right: 8px;
  @media ${device.mobileL} {
    margin: 0;
  }
`;

export default DeleteButton;
