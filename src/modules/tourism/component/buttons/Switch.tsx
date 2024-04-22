import styled from 'styled-components';

export interface SwitchProps {
  checked?: boolean;
  enabledLabel: string;
  disabledLabel: string;
  onChange: () => void;
}

const Switch = ({ checked = false, onChange, enabledLabel, disabledLabel }: SwitchProps) => {
  const label = checked ? enabledLabel : disabledLabel;

  return (
    <>
      <StyledInput onChange={() => {}} checked={checked} type="checkbox" />
      <Container>
        <StyledLabel onClick={onChange} checked={checked}>
          <span />
        </StyledLabel>
        <Label checked={checked}>{label}</Label>
      </Container>
    </>
  );
};

export default Switch;

const Container = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 12px;
  cursor: 'pointer';
`;

const Label = styled.div<{ checked: boolean }>`
  color: #4ca98b;
  width: 100%;
  color: ${({ checked }) => (checked ? '#4ca98b' : '#9ea7b5')};
`;

const StyledInput = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
`;

const StyledLabel = styled.label<{ checked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ checked }) => (checked ? 'flex-start' : 'flex-end')};
  cursor: pointer;
  width: 40px;
  height: 24px;
  border-radius: 24px;
  position: relative;
  transition: background-color 0.2s;

  span {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    border-radius: 45px;
    transition: 0.2s;
    background: #9ea7b5;
  }

  ${({ checked }) =>
    checked
      ? `
    background-color:#C7E6DC;
    span{
    left: calc(100% - 2px);
    transform: translateX(-100%);
    background: #4ca98b;;
    }
  `
      : `
  background-color:#CDD5DF;
  `}
`;
