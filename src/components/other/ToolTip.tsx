import styled from "styled-components";

export interface ToolTipProps {
  label: string;
}

const ToolTip = ({ label }: ToolTipProps) => {
  return <TooltipBox>{label}</TooltipBox>;
};

export const TooltipBox = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  z-index: 1;
  left: -5px;
  color: transparent;
  background-color: transparent;
  display: none;
  padding: 4px 4px;
  border-radius: 4px;

  &:before {
    content: "";
    z-index: 38;
    width: 0;
    height: 0;
    left: 10px;
    top: -4px;
    position: absolute;
    border: 5px solid transparent;
    transform: rotate(135deg);
    transition: border 0.3s ease-in-out;
  }
`;

export default ToolTip;
