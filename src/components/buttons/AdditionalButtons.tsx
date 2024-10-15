import styled from 'styled-components';
import { StatusTypes } from '../../modules/tourism/utils/constants';
import { device } from '../../styles';
import { buttonsTitles } from '../../utils/texts';
import Button, { ButtonColors } from './Button';

interface ButtonProps {
  handleChange: any;
  hideReturnButton?: boolean;
  disabled?: boolean;
}

const AdditionalButtons = ({ handleChange, hideReturnButton, disabled = false }: ButtonProps) => {
  return (
    <ButtonsRow>
      <ActionButton
        variant={ButtonColors.SUCCESS}
        disabled={disabled}
        height={32}
        onClick={() => !disabled && handleChange('status', StatusTypes.APPROVED)}
      >
        {buttonsTitles.approve}
      </ActionButton>
      {!hideReturnButton && (
        <ActionButton
          variant={ButtonColors.PRIMARY}
          height={32}
          disabled={disabled}
          onClick={() => !disabled && handleChange('status', StatusTypes.RETURNED)}
        >
          {buttonsTitles.returnToCorrect}
        </ActionButton>
      )}
      <ActionButton
        variant={ButtonColors.DANGER}
        height={32}
        disabled={disabled}
        onClick={() => !disabled && handleChange('status', StatusTypes.REJECTED)}
      >
        {buttonsTitles.reject}
      </ActionButton>
    </ButtonsRow>
  );
};

const ButtonsRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 5px;
  @media ${device.mobileM} {
    flex: 1;
    flex-direction: column;
    width: 100%;
  }
`;

const ActionButton = styled(Button)`
  @media ${device.mobileM} {
    width: 100%;
  }
`;

export default AdditionalButtons;
