import { isEmpty } from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { device } from '../../styles';
import { DeleteInfoProps } from '../../types';
import DeleteComponent from './DeleteComponent';
import Icon from './Icons';
interface InfoAboutEntityProps {
  title: string;
  handleEdit?: () => void;
  info?: any[];
  handleDelete?: () => void;
  handleChange?: (props: any) => void;
  additionalDeleteComponent?: (...props: any) => JSX.Element;
  customDeleteComponent?: JSX.Element;
  additionalButtons?: JSX.Element;
  deleteInfo?: DeleteInfoProps;
  values?: any;
  buttons?: JSX.Element;
  entity?: any;
}

const InfoAboutEntity = ({
  title,
  info,
  handleDelete,
  deleteInfo,
  additionalDeleteComponent,
  handleChange,
  values,
  buttons,
  handleEdit,
  customDeleteComponent,
  additionalButtons,
  entity,
}: InfoAboutEntityProps) => {
  return (
    <>
      <Container>
        <Row>
          <InnerRow>
            <Title>{title}</Title>
            {!!handleEdit && (
              <IconContainer onClick={() => handleEdit()}>
                <StyledIcon name="edit" />
              </IconContainer>
            )}
          </InnerRow>
          {buttons}
          <InnerRow>
            {additionalButtons}
            {customDeleteComponent}
            <DeleteComponent
              entity={entity}
              deleteInfo={{ handleDelete, ...deleteInfo }}
              additionalDeleteComponent={additionalDeleteComponent}
              handleChange={handleChange}
              values={values}
            />
          </InnerRow>
        </Row>
        {!isEmpty(info) && (
          <SecondRow>
            {info
              ?.filter((item) => item)
              .map((item, index, arr) => {
                const isValidElement = React.isValidElement(item);
                const isNextValidElement = React.isValidElement(arr[index + 1]);

                const element = !isValidElement ? <Label>{item}</Label> : item;

                return (
                  <SecondInnerRow key={`tenant-info-${index}`}>
                    {element} {arr?.length !== index + 1 && <Dot show={!isNextValidElement} />}
                  </SecondInnerRow>
                );
              })}
          </SecondRow>
        )}
      </Container>
    </>
  );
};

const Title = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #121926;
  opacity: 1;
`;

const Dot = styled.div<{ show: boolean }>`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${({ show }) => (show ? '#697586' : 'transparent')};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const InnerRow = styled.div`
  display: flex;
  align-items: center;

  gap: 8px;
  @media ${device.mobileL} {
    width: 100%;
    flex-direction: column-reverse;
    align-items: flex-start;
  }
`;

const SecondInnerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  @media ${device.mobileL} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SecondRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  @media ${device.mobileL} {
    flex-direction: column;
    margin-top: 12px;
    align-items: flex-start;
  }
`;

const Label = styled.div`
  font-size: 1.6rem;
  line-height: 20px;
  color: #697586;
  opacity: 1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  @media ${device.mobileXL} {
    margin-bottom: 0px;
  }
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

export default InfoAboutEntity;
