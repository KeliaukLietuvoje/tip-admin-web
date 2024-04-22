
import { useState } from "react";
import styled from "styled-components";
import { device } from "../../styles";
import { DeleteInfoProps } from "../../types";
import { formatDate } from "../../utils/format";
import { useWindowSize } from "../../utils/hooks";
import { buttonsTitles } from "../../utils/texts";
import Button, { ButtonColors } from "../buttons/Button";
import DeleteCard from "./DeleteCard";
import Icon from "./Icons";

export interface DeleteComponentProps {
  deleteInfo?: DeleteInfoProps;
  values?: any;
  handleChange?: (props: any) => void;
  additionalDeleteComponent?: (...props: any) => JSX.Element;
  entity?: any;
}

const DeleteComponent = ({
  values,
  handleChange,
  additionalDeleteComponent,
  deleteInfo,
  entity
}: DeleteComponentProps) => {
  const [showModal, setShowModal] = useState(false);
  const isMobile = useWindowSize(device.mobileL);
  const [loading, setLoading] = useState(false);

  const isDeleted = entity?.deletedAt;

  const handleDelete = async () => {
    if (!deleteInfo?.handleDelete) return;

    setLoading(true);
    await deleteInfo?.handleDelete(values);
    setLoading(false);
  };

  if (isDeleted)
    return (
      <>
        {buttonsTitles.deleted} ({formatDate(entity?.deletedAt)})
      </>
    );

  if (!deleteInfo?.handleDelete) return <></>;

  return (
    <>
      <DeleteButtonContainer>
        <DeleteButton
          onClick={() => setShowModal(true)}
          variant={ButtonColors.TRANSPARENT}
          type="button"
          leftIcon={<StyledIcon name="deleteItem" />}
          buttonPadding="6px 8px"
        >
          {!isMobile ? buttonsTitles.delete : ""}
        </DeleteButton>
      </DeleteButtonContainer>
      <DeleteCard
        loading={loading}
        showModal={showModal}
        onClose={() => setShowModal(false)}
        title={deleteInfo?.deleteTitle}
        descriptionFirstPart={deleteInfo?.deleteDescriptionFirstPart}
        descriptionSecondPart={deleteInfo?.deleteDescriptionSecondPart}
        name={deleteInfo?.deleteName}
        onClick={() => handleDelete()}
        additionalComponent={
          additionalDeleteComponent &&
          additionalDeleteComponent(values, handleChange)
        }
      />
    </>
  );
};

const DeleteButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 8px 0;
  @media ${device.mobileL} {
    flex-direction: column;
  }
`;

const DeleteButton = styled(Button)`
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

export default DeleteComponent;
