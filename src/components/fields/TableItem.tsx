import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { actions as backUrlActions } from "../../state/backUrl/reducer";
import { useAppDispatch } from "../../state/hooks";
import Icon from "../other/Icons";

export interface TableItemProps {
  label: string;
  bottomLabel?: string | JSX.Element;
  url?: string;
  leftIconName?: string;
  rightIcon?: JSX.Element;
  leftIcon?: JSX.Element;
  showLeftIcon?: boolean;
}

const TableItem = ({
  label,
  url,
  bottomLabel,
  leftIconName = "eye",
  rightIcon,
  leftIcon
}: TableItemProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (!label) {
    return <>-</>;
  }

  const handleClick = (e) => {
    if (!url) return;

    e.stopPropagation();
    dispatch(
      backUrlActions.setBackUrl(
        window.location.href.replace(window.location.origin, "")
      )
    );
    navigate(url);
  };

  return (
    <>
      <Container>
        {(url || leftIcon) && (
          <IconContainer onClick={handleClick}>
            {leftIcon || <StyledIcons name={leftIconName} />}
          </IconContainer>
        )}
        <Label>{label}</Label>
        {rightIcon && <IconContainer>{rightIcon}</IconContainer>}
      </Container>
      {bottomLabel && <BottomLabel>{bottomLabel}</BottomLabel>}
    </>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.div`
  font-size: 1.3rem;
  color: #121926;
  opacity: 1;
  white-space: nowrap;
`;

const BottomLabel = styled.div`
  font-size: 1.2rem;
  color: #697586;
  opacity: 1;
  line-height: 12px;
`;

const StyledIcons = styled(Icon)`
  font-size: 1.6rem;
  vertical-align: middle;
  &:hover {
    opacity: 50%;
  }
`;

export default TableItem;
