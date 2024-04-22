import { useState } from 'react';
import styled from 'styled-components';
import Icon from '../other/Icons';

export interface ModuleSelectorProps {
  moduleInfo?: any;
  options?: any[];
  onChange: (option: any) => void;
}

const ModuleSelector = ({ moduleInfo, options, onChange }: ModuleSelectorProps) => {
  const [showSelect, setShowSelect] = useState(false);

  const handleClick = (option: any) => {
    setShowSelect(false);
    onChange(option);
  };

  return (
    <Container
      tabIndex={1}
      onClick={() => setShowSelect(!showSelect)}
      onBlur={() => setShowSelect(false)}
    >
      <RelativeContainer>
        <SelectorContainer onClick={() => setShowSelect(true)}>
          <ModuleContainer>
            <ModuleLabel>{moduleInfo?.name}</ModuleLabel>
            <LabelDescription>{moduleInfo?.description}</LabelDescription>
          </ModuleContainer>
          <StyledIcon name={'showMore'} />
        </SelectorContainer>
        {showSelect && (
          <OptionsContainer>
            {options?.map((option, index) => {
              return (
                <Option key={index} onClick={() => handleClick(option)}>
                  {option.name}
                </Option>
              );
            })}
          </OptionsContainer>
        )}
      </RelativeContainer>
    </Container>
  );
};

const Container = styled.div`
  display: block;
  margin-bottom: 25px;
  width: 100%;
`;

const RelativeContainer = styled.div`
  position: relative;
`;

const SelectorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px 10px 10px;
  margin-bottom: 4px;
  color: #f8fafc;
  background: #ffffff1f 0% 0% no-repeat padding-box;
  border-radius: 4px;
  cursor: pointer;
`;

const ModuleContainer = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const ModuleLabel = styled.div`
  font-size: 1.6rem;
`;

const LabelDescription = styled.div`
  font-size: 1.2rem;
  color: #ffffff8f;
`;

const StyledIcon = styled(Icon)`
  font-size: 2.4rem;
`;

const OptionsContainer = styled.div`
  display: block;
  position: absolute;
  z-index: 9;
  width: 100%;
  padding: 9px 6px 11px 6px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
`;

const Option = styled.div`
  padding: 0 12px;
  font-size: 1.6rem;
  border-radius: 2px;
  line-height: 36px;
  cursor: pointer;
  &:hover {
    background: #f8fafc 0% 0% no-repeat padding-box;
  }
`;

export default ModuleSelector;
