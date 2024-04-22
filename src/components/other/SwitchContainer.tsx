import { map } from "lodash";
import styled from "styled-components";
import { device } from "../../styles";
import Switch from "../buttons/SwitchButton";
import SimpleContainer from "./SimpleContainer";
import FieldWrapper from "../fields/components/FieldWrapper";

export interface SwitchItem {
  id?: string;
  selected?: boolean;
  name?: string;
  description?: string;
}

interface SwitchContainerProps {
  title: string;
  items: SwitchItem[];

  error?: string;
  handleChange: (props: SwitchItem) => void;
  isSelected: (props: any) => boolean;
}

const SwitchContainer = ({
  title,
  error,
  items,
  handleChange,
  isSelected
}: SwitchContainerProps) => {
  return (
    <SimpleContainer title={title}>
      <FieldWrapper error={error}>
        {map(items, (item, index) => {
          return (
            <Row
              showBorder={items.length - 1 === index}
              key={`switch-item-row-${index}`}
            >
              <Column>
                <Name>{item?.name}</Name>
                {item.description && (
                  <Description>{item.description}</Description>
                )}
              </Column>

              <Switch
                isOn={isSelected(item)}
                onChange={() => handleChange(item)}
              />
            </Row>
          );
        })}
      </FieldWrapper>
    </SimpleContainer>
  );
};

const Row = styled.div<{ showBorder: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: ${({ showBorder }) =>
    showBorder ? "none" : "1px solid #eef2f6"};

  @media ${device.mobileL} {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-size: 1.4rem;
  color: #121926;
`;

const Description = styled.div`
  font-size: 1.2rem;
  color: #9aa4b2;
  margin-top: -5px;
`;

export default SwitchContainer;
