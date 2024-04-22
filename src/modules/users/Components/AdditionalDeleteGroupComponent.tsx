import { isEmpty } from 'lodash';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button, { ButtonColors } from '../../../components/buttons/Button';
import DeleteButton from '../../../components/buttons/DeleteButton';
import RadioOptions from '../../../components/buttons/RadioOptions';
import TreeSelectField from '../../../components/fields/TreeSelect';
import CloseIcon from '../../../components/other/CloseIcon';
import LoaderComponent from '../../../components/other/LoaderComponent';
import Modal from '../../../components/other/Modal';
import { device } from '../../../styles';
import { Group } from '../../../types';
import { handleError } from '../../../utils/functions';
import { buttonsTitles } from '../../../utils/texts';
import api from '../utils/api';
import { filterOutGroup } from '../utils/functions';
import { routes } from '../utils/routes';
import {
  deleteDescriptionFirstPart,
  deleteDescriptionSecondPart,
  deleteTitles,
  descriptions,
  validationTexts,
} from '../utils/texts';

const deleteGroupUsersOptions = [
  {
    label: 'Narius priskirti grupei',
    value: false,
  },
  {
    label: 'Ištrinti visus narius',
    value: true,
  },
];

interface AdditionalDeleteGroupComponentInterface {
  group?: Group;
}

const GroupDeleteComponent = ({ group }: AdditionalDeleteGroupComponentInterface) => {
  const { id, name } = group!;
  const [groupId, setGroupId] = useState();
  const [error, setError] = useState('');
  const [deleteWithUsers, setDeleteWithUsers] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleDeleteGroup = useMutation(
    () =>
      api.deleteGroup({
        id,
        ...(!!deleteWithUsers && { params: { moveToGroup: groupId } }),
      }),
    {
      onError: () => {
        handleError();
      },
      onSuccess: () => {
        navigate(routes.groups);
      },
    },
  );

  const isGroupWithUsers = group?.usersCount! > 0;

  const { isLoading, data: groups = [] } = useQuery(
    ['groupsForGroup', isGroupWithUsers],
    async () => filterOutGroup((await api.getGroupsForGroup()).rows, id),
    {
      onError: () => {
        handleError();
      },
      enabled: isGroupWithUsers,
    },
  );

  const renderAdditionalInfo = () => {
    if (isLoading) return <LoaderComponent />;

    if (isEmpty(groups)) return <></>;

    return (
      <>
        <SmallDescription>{descriptions.deleteUsersWithGroup}</SmallDescription>
        <Row>
          <StyledRadioOptions
            options={deleteGroupUsersOptions}
            value={deleteWithUsers}
            onChange={(option: boolean) => setDeleteWithUsers(option)}
          />
          {deleteWithUsers && (
            <StyledTreeSelectField
              name={`group`}
              groupOptions={groups}
              value={groupId}
              showError={false}
              error={error}
              onChange={(group) => setGroupId(group.id)}
            />
          )}
        </Row>
      </>
    );
  };

  const handleSubmit = async () => {
    if (deleteWithUsers && !groupId) return setError(validationTexts.error);

    await handleDeleteGroup.mutateAsync();
    setOpen(false);
  };

  return (
    <>
      <DeleteButton onClick={() => setOpen(true)} />
      <Modal onClose={setOpen} visible={open}>
        <Container tabIndex={0}>
          <CloseIcon onClick={() => setOpen(false)} />
          <Title>{deleteTitles.group}</Title>
          <Description>
            {deleteDescriptionFirstPart.group}
            <Name>{name}</Name>
            {deleteDescriptionSecondPart.group}
          </Description>
          {renderAdditionalInfo()}
          <BottomRow>
            <Button
              onClick={() => setOpen(false)}
              variant={ButtonColors.TRANSPARENT}
              type="button"
              color="black"
              disabled={handleDeleteGroup.isLoading}
              height={32}
            >
              {buttonsTitles.cancel}
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              loading={handleDeleteGroup.isLoading}
              disabled={handleDeleteGroup.isLoading}
              variant={ButtonColors.DANGER}
              height={32}
            >
              {buttonsTitles.delete}
            </Button>
          </BottomRow>
        </Container>
      </Modal>
    </>
  );
};

const StyledTreeSelectField = styled(TreeSelectField)`
  width: 100%;
`;

const StyledRadioOptions = styled(RadioOptions)`
  padding-top: 0;
  div {
    margin: 0 0 8px 0;
  }
`;

const SmallDescription = styled.span`
  margin-top: 20px;
  font-size: 1.4rem;
  color: #4b5565;
  width: 100%;
  text-align: center;
  white-space: pre-line;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 18px 41px #121a5529;
  border-radius: 10px;
  padding: 40px 32px 32px 32px;
  display: flex;
  flex-direction: column;
  position: relative;

  @media ${device.mobileL} {
    padding: 40px 16px 32px 16px;
    width: 100%;
    height: 100%;
    justify-content: center;
    border-radius: 0px;
  }
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 22px;
  gap: 16px;
  width: 100%;
`;

const Title = styled.div`
  font-size: 2.4rem;
  text-align: center;
  font-weight: bold;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.error};
  width: 100%;
`;

const Description = styled.span`
  font-size: 1.6rem;
  color: #4b5565;
  width: 100%;
  text-align: center;
  white-space: pre-line;
`;

const Name = styled.span`
  font-size: 1.6rem;
  font-weight: bold;
  width: 100%;
  color: #4b5565;
`;

export default GroupDeleteComponent;
