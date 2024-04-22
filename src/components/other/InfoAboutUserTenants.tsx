import { isEmpty, map } from 'lodash';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../../styles';
import Icon from './Icons';
import SimpleContainer from './SimpleContainer';

export interface TenantInfo {
  tenant: {
    name?: string;
    code?: string;
    id: string;
  };
  role?: string;
  url?: string;
}

interface InfoAboutEntityProps {
  info: TenantInfo[] | [];
}

const InfoAboutTenants = ({ info }: InfoAboutEntityProps) => {
  const navigate = useNavigate();

  if (isEmpty(info)) return null;

  return (
    <SimpleContainer title="Verslo formos">
      <Container>
        {map(info, (item, index) => {
          const tenantInfo = [item.tenant?.code ? `Įm.k. ${item?.tenant?.code}` : '', item.role];

          return (
            <InnerContainer showBorder={info!.length - 1 === index} key={`tenant-info-${index}`}>
              {item.url ? (
                <>
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
                  <IconContainer onClick={() => navigate(item.url!)}>
                    <StyledIcon name="northEast" />
                  </IconContainer>
                </>
              ) : (
                <FreeLancer>{'Individuali veikla'}</FreeLancer>
              )}
            </InnerContainer>
          );
        })}
      </Container>
    </SimpleContainer>
  );
};

const Title = styled.div`
  font-size: 1.4rem;
  line-height: 17px;
  color: #121926;
`;

const Dot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #697586;
`;

const FreeLancer = styled.div`
  font-size: 1.4rem;
  line-height: 17px;
  color: #121926;
  margin: 16px 0;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  @media ${device.mobileL} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Label = styled.div`
  font-size: 1.2rem;
  line-height: 20px;
  color: #697586;
  opacity: 1;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InnerContainer = styled.div<{ showBorder: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: ${({ showBorder }) => (showBorder ? 'none' : '1px solid #eef2f6')};
  @media ${device.mobileL} {
    flex-direction: column;
    align-items: flex-start;
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

const StyledIcon = styled(Icon)`
  font-size: 2.4rem;
  color: #697586;
`;

export default InfoAboutTenants;
