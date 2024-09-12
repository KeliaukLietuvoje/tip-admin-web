import { map } from 'lodash';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Icon from './Icons';

export interface Tab {
  value?: string | boolean;
  label?: string;
  route?: string;
  search?: string;
}

const TabBar = ({
  tabs,
  showOneTab = false,
  activeTab,
  className,
  onClick,
}: {
  tabs: Tab[];
  showOneTab?: boolean;
  activeTab: any;
  className?: string;
  onClick?: (tab: Tab) => void;
}) => {
  const navigate = useNavigate();

  if (tabs.length <= 1 && !showOneTab) {
    return null;
  }

  const handleClick = (tab: Tab) => {
    if (onClick) {
      return onClick(tab);
    }

    if (tabs.length > 1 && tab.route) {
      navigate({
        ...(tab.route && {
          pathname: tab.route,
        }),
        ...(tab.search && {
          search: tab.search,
        }),
      });
    }
  };

  return (
    <Container className={className}>
      {map(tabs, (tab) => (
        <TabButton
          key={`${tab.value}`}
          isActive={tab.value === activeTab}
          onClick={() => {
            handleClick(tab);
          }}
        >
          <TabLabel>{tab.label}</TabLabel>
        </TabButton>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  border-bottom: 1px #c4c4c4 solid;
  margin-bottom: 24px;
  white-space: nowrap;
  overflow-x: auto;
`;

const TabButton = styled.div<{ isActive: boolean }>`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: center;
  border-bottom: ${({ isActive, theme }) =>
    `2px ${isActive ? theme.colors.primary : 'transparent'} solid`};
  margin-right: 24px;
  cursor: pointer;
`;

const TabLabel = styled.span`
  margin: 8px 0;
  color: #121926;
  font-size: 1.4rem;
`;

const StyledIcon = styled(Icon)`
  font-size: 1.8rem;
  color: #9aa4b2;
  cursor: 'not-allowed';
`;

export default TabBar;
