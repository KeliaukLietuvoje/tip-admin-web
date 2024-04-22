import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { actions } from '../../state/backUrl/reducer';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { buttonsTitles } from '../../utils/texts';
import Icon from '../other/Icons';
import Button, { ButtonColors } from './Button';

const BackButton = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const backUrl = useAppSelector((state) => state.backUrl.storeUrl?.at(-1));

  return (
    <StyledButton
      onClick={() => {
        navigate((backUrl || -1) as string);
        dispatch(actions.updateBackUrl());
      }}
      leftIcon={<StyledBackIcon name="back" />}
      variant={ButtonColors.TRANSPARENT}
      type="button"
      height={32}
      buttonPadding="0"
      color="black"
    >
      {buttonsTitles.back}
    </StyledButton>
  );
};

const StyledButton = styled(Button)`
  min-width: 0px;
  width: fit-content;
  button {
    padding-right: 16px;
    border: none;
    font-size: 1.6rem;
    color: #121926;
  }
`;

const StyledBackIcon = styled(Icon)`
  cursor: pointer;
  margin-right: 4px;
  font-size: 2rem;
  align-self: center;
  color: #000000;
`;

export default BackButton;
