import { Location, NavigateFunction } from "react-router-dom";
import styled from "styled-components";
import { RouteProps } from "../../types";

import Icon from "../other/Icons";

interface MultiTabProps {
  route?: {
    routes?: RouteProps[];
    name?: string;
    slug: string;
    permission?: string;
    sideBar?: boolean;
    component?: JSX.Element;
    superAdmin?: boolean;
    showDropdown?: boolean;
  };
  slug?: string;
  navigate: NavigateFunction;
  handleUpdateOpenedTabs: (tabs: string[]) => void;
  location: Location;
  openedTabs: string[];
}

const MultiTab = ({
  route,
  slug,
  navigate,
  location,
  openedTabs,
  handleUpdateOpenedTabs
}: MultiTabProps) => {
  const currentTab = slug?.split("/")?.slice(-1)?.[0]!;
  const isOpen = openedTabs.includes(currentTab);

  return (
    <>
      <Tab
        index={1}
        isOpen={isOpen}
        first={true}
        isSelected={false}
        onClick={() => {
          const newTabs = openedTabs.includes(currentTab)
            ? openedTabs.filter((tab) => tab !== currentTab)
            : [...openedTabs, currentTab];
          handleUpdateOpenedTabs(newTabs);
        }}
      >
        <div>{route?.name}</div>
        <StyledIcon name="arrowDown" />
      </Tab>
      {isOpen &&
        route?.routes
          ?.filter((tab) => tab.sideBar)
          .map((innerTab, i) => {
            if (innerTab.routes) {
              return MultiTab({
                route: innerTab,
                slug: `${slug}/${innerTab.slug}`,
                navigate,
                location,
                openedTabs,
                handleUpdateOpenedTabs
              });
            }

            const newSlug = `${slug}/${innerTab?.slug}`;

            return (
              <>
                <Tab
                  key={`multiTab-${innerTab.slug}`}
                  last={route?.routes && i === route?.routes?.length - 1}
                  isOpen={isOpen}
                  isSelected={location.pathname.includes(newSlug)}
                  index={i}
                  onClick={() => {
                    navigate(newSlug);
                  }}
                >
                  {innerTab.name}
                </Tab>
              </>
            );
          })}
    </>
  );
};

export default MultiTab;

const Tab = styled.div<{
  isOpen?: boolean;
  first?: boolean;
  last?: boolean;
  isSelected: boolean;
  index: number;
}>`
  padding: 9px;
  color: #f7f8fa;
  font-size: 16px;
  display: flex;

  justify-content: space-between;
  cursor: pointer;

  background-color: ${({ isOpen, index, isSelected }) =>
    isOpen
      ? isSelected
        ? "#ffffff1f"
        : index % 2 === 0
        ? `#524E4E`
        : "#716C6B"
      : "transparent;"};

  border-radius: ${({ isOpen, first, last }) =>
    isOpen
      ? first
        ? `4px 4px 0px 0px`
        : last
        ? "0px 0px 4px 4px"
        : "0px"
      : "4px"};

  &:hover {
    background-color: #ffffff1f;
  }
`;

const StyledIcon = styled(Icon)`
  cursor: pointer;
  margin: auto 8px;
  font-size: 2rem;
  align-self: center;
  color: rgb(122, 126, 159);
`;
