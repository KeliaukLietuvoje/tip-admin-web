import styled from "styled-components";
import { device } from "../../styles";
import { buttonsTitles } from "../../utils/texts";
import Button, { ButtonColors } from "../buttons/Button";
import Icon from "./Icons";
import Modal from "./Modal";

interface ConfirmPopUpWrapperProps {
  onSubmit?: (data?: any) => void;
  value?: string;
  fields?: JSX.Element;
  title?: string;
  buttonColor?: ButtonColors;
  confirmText?: string;
  additionalButtons?: JSX.Element;
  color?: string;
  onClose: () => void;
  isOpen: boolean;
  isSubmit?: boolean;
  loading?: boolean;
  disabled?: boolean;
  width?: string;
}

const ConfirmPopUpWrapper = ({
  title,
  disabled,
  onSubmit,
  fields,
  buttonColor = ButtonColors.PRIMARY,
  confirmText,
  additionalButtons,
  color,
  onClose,
  isOpen,
  isSubmit = true,
  loading,
  width
}: ConfirmPopUpWrapperProps) => {
  return (
    <Modal onClose={() => onClose()} visible={isOpen}>
      <Container width={width} tabIndex={0}>
        <IconContainer onClick={() => onClose()}>
          <StyledCloseButton name={"close"} />
        </IconContainer>
        {title && <Title>{title} </Title>}
        {fields}
        {!disabled && (
          <BottomRow>
            {additionalButtons && (
              <StyledButton
                onClick={() => onClose()}
                variant={ButtonColors.TRANSPARENT}
                type="button"
                height={32}
                buttonPadding="6px 8px"
              >
                {buttonsTitles.cancel}
              </StyledButton>
            )}
            <InnerBottomRow>
              {additionalButtons}
              {!additionalButtons && (
                <StyledButton
                  onClick={() => onClose()}
                  variant={ButtonColors.TRANSPARENT}
                  type="button"
                  height={32}
                  buttonPadding="6px 8px"
                >
                  {buttonsTitles.cancel}
                </StyledButton>
              )}
              <StyledButton
                onClick={onSubmit}
                variant={buttonColor}
                loading={loading}
                disabled={loading}
                color={color}
                type={isSubmit ? "submit" : "button"}
                height={32}
                buttonPadding="6px 8px"
              >
                {confirmText || buttonsTitles.save}
              </StyledButton>
            </InnerBottomRow>
          </BottomRow>
        )}
      </Container>
    </Modal>
  );
};

const Container = styled.div<{ width?: string }>`
  background-color: white;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  padding: 20px;
  position: relative;
  height: fit-content;
  min-width: 440px;
  width: ${({ width }) => width};

  background-color: white;
  flex-basis: auto;
  margin: auto;

  @media ${device.mobileL} {
    min-width: 100%;
    min-height: 100%;
    border-radius: 0px;
  }
`;

const StyledCloseButton = styled(Icon)`
  color: rgb(122, 126, 159);
  font-size: 2rem;
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
  flex-wrap: wrap-reverse;
  gap: 16px;
`;

const InnerBottomRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  @media ${device.mobileL} {
    flex-direction: column-reverse;
    width: 100%;
  }
`;

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #231f20;
`;

export default ConfirmPopUpWrapper;
