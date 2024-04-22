import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { actions } from "../../state/backUrl/reducer";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { buttonsTitles } from "../../utils/texts";
import Button from "../buttons/Button";
import Icon from "../other/Icons";

interface PageWrapperProps {
  children: any;
  title: string;
  buttons?: JSX.Element | null;
  back?: boolean;
  className?: string;
}

const PageWrapper = ({
  children,
  title,
  buttons,
  className,
  back = false
}: PageWrapperProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const backUrl = useAppSelector((state) => state.backUrl.storeUrl?.at(-1));

  return (
    <Container className={className}>
      {back && (
        <BackButton
          onClick={() => {
            navigate((backUrl || -1) as string);
            dispatch(actions.updateBackUrl());
          }}
          leftIcon={<StyledBackIcon name="back" />}
          variant={Button.colors.TRANSPARENT}
          type="button"
          height={32}
          buttonPadding="6px 8px"
          color="black"
        >
          {buttonsTitles.back}
        </BackButton>
      )}
      <Row>
        <Title>{title}</Title>
        {buttons}
      </Row>
      <>{children}</>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 20px 20px 20px;
`;

const Title = styled.div`
  font: normal normal bold 20px/25px Atkinson Hyperlegible;
  letter-spacing: 0px;
  color: #231f20;
  opacity: 1;
  margin-right: 16px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin: 22px 0px 33px 0px;
`;

const BackButton = styled(Button)`
  min-width: 0px;
  margin-top: 20px;
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

export default PageWrapper;
