import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { actions } from "../../state/backUrl/reducer";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { device } from "../../styles";
import { BreadcrumbsProps, DeleteInfoProps } from "../../types";
import { buttonsTitles } from "../../utils/texts";
import Button from "../buttons/Button";
import Breadcrumbs from "../other/Breadcrumbs";
import Icon from "../other/Icons";
import InfoAboutEntity from "../other/InfoAboutEntity";

interface PageWrapperProps {
  children: any;
  title: string;
  buttons?: JSX.Element;
  entity?: any;
  back?: boolean;
  handleEdit?: () => void;
  info?: any[];
  handleDelete?: () => void;
  deleteInfo?: DeleteInfoProps;
  breadCrumbsInfo?: BreadcrumbsProps;
  additionalDeleteComponent?: (...props: any) => JSX.Element;
  customDeleteComponent?: JSX.Element;
}

const InfoPageWrapper = ({
  children,
  title,
  back = false,
  deleteInfo,
  handleDelete,
  info,
  buttons,
  breadCrumbsInfo,
  additionalDeleteComponent,
  customDeleteComponent,
  handleEdit,
  entity
}: PageWrapperProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const backUrl = useAppSelector((state) => state.backUrl.storeUrl?.at(-1));

  return (
    <Container>
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
          buttonPadding="0"
          color="black"
        >
          {buttonsTitles.back}
        </BackButton>
      )}
      {breadCrumbsInfo && (
        <Breadcrumbs
          groups={breadCrumbsInfo?.breadCrumbs}
          homeName={breadCrumbsInfo?.homeName}
          homeRoute={breadCrumbsInfo?.homeRoute}
          pathRoute={(id) => breadCrumbsInfo.pathRoute(id)}
        />
      )}

      <InfoAboutEntity
        buttons={buttons}
        handleEdit={handleEdit}
        info={info}
        entity={entity}
        handleDelete={handleDelete}
        additionalDeleteComponent={additionalDeleteComponent}
        customDeleteComponent={customDeleteComponent}
        deleteInfo={deleteInfo}
        title={title}
      />
      <>{children}</>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  min-width: 500px;
  margin: 0 auto 120px auto;
  padding: 0 16px;
  @media ${device.mobileL} {
    margin: 0 16px 20px 16px;
    padding: 0;
    width: auto;
    min-width: auto;
  }
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

export default InfoPageWrapper;
