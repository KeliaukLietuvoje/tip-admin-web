import { map } from 'lodash';
import { useState } from 'react';
import styled from 'styled-components';
import { device } from '../../styles';
import { deleteDescriptionFirstPart } from '../../utils/texts';
import CheckBox from '../buttons/Checkbox';
import SimpleButton from '../fields/SimpleButton';
import DeleteCard from './DeleteCard';
import Icon from './Icons';
import { TenantInfo } from './InfoAboutUserTenants';
import SimpleContainer from './SimpleContainer';

interface InfoAboutTenantProps {
  info: TenantInfo[];
  roleLabels: { [key: string]: string };
  onEdit: (props: any) => void;
  onDelete: (props: any) => void;
  onToggleFreelancer?: () => void;
  isFreeLancer?: boolean;
  onShowPopUp?: any;
}

const UserTenantContainer = ({
  info,
  onEdit,
  onDelete,
  onToggleFreelancer,
  roleLabels,
  isFreeLancer,
  onShowPopUp,
}: InfoAboutTenantProps) => {
  const [showDelete, setShowDelete] = useState('');

  const handleEdit = (item) => {
    onShowPopUp(true);
    onEdit(item);
  };

  const handleDelete = (item) => {
    setShowDelete('');
    onDelete(item);
  };

  return (
    <SimpleContainer title="Verslo formos">
      <Container>
        {onToggleFreelancer && (
          <StyledCheckBox
            onChange={onToggleFreelancer}
            value={isFreeLancer}
            label={'Vykdo individualią veiklą'}
          />
        )}
        {map(info, (item, index) => {
          const tenantInfo = [
            item?.tenant?.code ? `Įm.k. ${item?.tenant?.code}` : '',
            roleLabels[item.role!],
          ];

          return (
            <InnerContainer bottom={info.length - 1 === index} key={`tenant-info-${index}`}>
              <RowContainer>
                <Title>{item?.tenant?.name}</Title>

                <Row>
                  {tenantInfo.map((text, tenantInfoIndex) => {
                    if (!text) return null;

                    return (
                      <Row key={`tenant-user-info-${tenantInfoIndex}`}>
                        <Label>{text}</Label>
                        {tenantInfo?.length !== tenantInfoIndex + 1 && <Dot />}
                      </Row>
                    );
                  })}
                </Row>
              </RowContainer>
              <Row>
                <IconContainer onClick={() => handleEdit(item)}>
                  <EditIcon name="edit" />
                </IconContainer>
                <IconContainer
                  onClick={() => {
                    setShowDelete(item?.tenant?.id!);
                  }}
                >
                  <DeleteIcon name="trash" />
                </IconContainer>
                <DeleteCard
                  showModal={showDelete === item?.tenant?.id}
                  onClose={() => setShowDelete('')}
                  title={deleteDescriptionFirstPart.access}
                  descriptionFirstPart={deleteDescriptionFirstPart.access}
                  descriptionSecondPart={deleteDescriptionFirstPart.access}
                  name={item?.tenant?.name}
                  onClick={() => handleDelete(item)}
                />
              </Row>
            </InnerContainer>
          );
        })}
        <Row>
          <SimpleButton
            type="button"
            onClick={() => {
              onShowPopUp(true);
            }}
          >
            + Pridėti prieigą prie įmonės
          </SimpleButton>
        </Row>
      </Container>
    </SimpleContainer>
  );
};

const Title = styled.div`
  font-size: 1.4rem;
  line-height: 17px;
  color: #121926;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Label = styled.div`
  font-size: 1.2rem;
  line-height: 20px;
  color: #697586;
  opacity: 1;
`;

const StyledCheckBox = styled(CheckBox)`
  margin-bottom: 16px;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InnerContainer = styled.div<{ bottom: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: ${({ bottom }) => (bottom ? 'none' : '1px solid #eef2f6')};
  @media ${device.mobileL} {
    flex-direction: column;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const DeleteIcon = styled(Icon)`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.danger};
`;

const Dot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #697586;
`;

const EditIcon = styled(Icon)`
  font-size: 2rem;
  color: #697586;
`;

export default UserTenantContainer;
