import styled from 'styled-components';
import Button, { ButtonColors } from '../../../../components/buttons/Button';
import TextAreaField from '../../../../components/fields/TextAreaField';
import Icon from '../../../../components/other/Icons';
import Modal from '../../../../components/other/Modal';
import { device } from '../../../../styles';
import { StatusTypes } from '../../utils/constants';
import {
  actionButtonLabels,
  buttonColors,
  buttonsTitles,
  formActionLabels,
  inputLabels,
} from '../../utils/texts';

interface ObservationFormModalProps {
  status?: StatusTypes;
  onChange: (key: string, data: any) => void;
  onValidate: () => void;
  comment?: string;
}

const FormPopUp = ({ status, onChange, comment, onValidate }: ObservationFormModalProps) => {
  const handleClose = () => {
    onChange('status', '');
  };

  const visible = !!status;
  return (
    <Modal onClose={handleClose} visible={visible}>
      <Container>
        <IconContainer onClick={handleClose}>
          <StyledCloseButton name={'close'} />
        </IconContainer>
        <Title>{formActionLabels[status!]}</Title>

        <TextAreaField
          label={inputLabels.comment}
          value={comment}
          padding={'16px 0 16px 0'}
          rows={2}
          name={'comment'}
          onChange={(comment) => onChange('comment', comment)}
        />

        <BottomRow>
          <StyledButton onClick={handleClose} variant={ButtonColors.TRANSPARENT} height={32}>
            {buttonsTitles.cancel}
          </StyledButton>
          <StyledButton onClick={onValidate} variant={buttonColors[status!]} height={32}>
            {actionButtonLabels[status!]}
          </StyledButton>
        </BottomRow>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  background-color: white;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  padding: 20px;
  position: relative;
  height: fit-content;
  min-width: 600px;
  background-color: white;
  flex-basis: auto;
  margin: auto;

  @media ${device.mobileL} {
    min-width: 100%;
    min-height: 100%;
    border-radius: 0px;
  }

  @media ${device.mobileXL} {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const StyledCloseButton = styled(Icon)`
  color: rgb(122, 126, 159);
  font-size: 2rem;
  @media ${device.mobileL} {
    display: none;
  }
`;

const StyledButton = styled(Button)``;

const IconContainer = styled.div`
  cursor: pointer;
  position: absolute;
  right: 9px;
  top: 9px;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  gap: 16px;
`;

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #231f20;
`;

export default FormPopUp;
