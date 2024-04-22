import { map } from 'lodash';
import { useState } from 'react';
import styled from 'styled-components';
import { device } from '../../styles';
import { DeleteInfoProps } from '../../types';
import {
  deleteDescriptionFirstPart,
  deleteDescriptionSecondPart,
  deleteTitles,
} from '../../utils/texts';
import CheckBox from '../buttons/Checkbox';
import SimpleButton from '../fields/SimpleButton';
import AccessPopUp from './AccessPopUp';
import DeleteCard from './DeleteCard';
import Icon from './Icons';
import { TenantInfo } from './InfoAboutUserTenants';
import SimpleContainer from './SimpleContainer';

interface InfoAboutEntityProps {
  info: TenantInfo[];
  tenantsEndpoint: (input: string, page: any, tenants: any) => Promise<any>;
  roles: string[];
  roleLabels: { [key: string]: string };
  onChange: (props: any) => void;
  onDelete: (props: any) => void;
  onAdd: (props: any) => void;
  popupLoading?: boolean;
}

const InfoAboutTenants = ({
  info,
  roles,
  onChange,
  onDelete,
  roleLabels,
  tenantsEndpoint,
  onAdd,
  popupLoading,
}: InfoAboutEntityProps) => {
  const [showDelete, setShowDelete] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [values, setValues] = useState<any>();

  return (
    <SimpleContainer title="Verslo formos">
      <Container>
        {map(info, (item, index) => {
          const deleteInfo: DeleteInfoProps = {
            deleteDescriptionFirstPart: deleteDescriptionFirstPart.access,
            deleteDescriptionSecondPart: deleteDescriptionSecondPart.access,
            deleteTitle: deleteTitles.access,
            deleteName: item?.tenant?.name,
          };
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
                <IconContainer
                  onClick={() => {
                    setShowAdd(true);
                    setValues(item);
                  }}
                >
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
                  loading={popupLoading}
                  showModal={showDelete === item?.tenant?.id}
                  onClose={() => setShowDelete('')}
                  title={deleteInfo?.deleteTitle}
                  descriptionFirstPart={deleteInfo?.deleteDescriptionFirstPart}
                  descriptionSecondPart={deleteInfo?.deleteDescriptionSecondPart}
                  name={deleteInfo?.deleteName}
                  onClick={() => {
                    setShowDelete('');
                    onDelete(item);
                  }}
                />
              </Row>
            </InnerContainer>
          );
        })}
        <Row>
          <SimpleButton
            type="button"
            onClick={() => {
              setValues({ tenant: undefined, role: undefined });
              setShowAdd(true);
            }}
          >
            + Pridėti prieigą prie įmonės
          </SimpleButton>
        </Row>
        {showAdd && (
          <AccessPopUp
            accessValues={values}
            showAdd={showAdd}
            onSetShowAdd={setShowAdd}
            tenantsEndpoint={tenantsEndpoint}
            loading={popupLoading}
            roles={roles}
            roleLabels={roleLabels}
            onSubmit={values?.tenant ? onChange : onAdd}
          />
        )}
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

export default InfoAboutTenants;
