import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { actions } from '../../state/backUrl/reducer';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { RouteProps } from '../../types';
import { useLogoutMutation } from '../../utils/hooks';
import { filteredRoutes } from '../../utils/router';
import { slugs } from '../../utils/routes';
import Avatar from '../other/Avatar';
import Icon from '../other/Icons';
import Logo from '../other/Logo';
import ModuleSelector from './ModuleSelector';

interface MobileHeaderInterface {
  className?: string;
}

const MobileNavbar = ({ className }: MobileHeaderInterface) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.userData);

  const handleNavigate = (slug: string) => {
    navigate(slug);
    setShowMenu(false);
  };

  const location = useLocation();
  const { mutateAsync } = useLogoutMutation();
  const routes = filteredRoutes({ user });

  const module = useAppSelector((state) => state.module);
  const dispatch = useAppDispatch();

  const currentRoute = routes.find(
    (app) => location.pathname.includes(app.slug) || `/${module}` === app.slug,
  );

  const renderTabs = (route?: RouteProps, slug?: string) => {
    return (route?.routes || [])
      .filter((tab) => tab.sideBar)
      .map((tab) => {
        if (tab.name && tab.slug) {
          const slugRoot = tab.slug?.split('/')[0];
          const locationSlug = location?.pathname?.split('/')[2];
          return (
            <div
              onClick={() => {
                dispatch(actions.clearBackUrl());
                handleNavigate(`${slug}/${tab.slug}`);
              }}
              key={tab.slug}
            >
              <Tab isActive={locationSlug?.includes(slugRoot)}>
                {tab.name}
                {tab?.icon}
              </Tab>
            </div>
          );
        }
        return null;
      });
  };
  return (
    <>
      {!showMenu ? (
        <Header className={className}>
          <Logo />
          <div onClick={() => setShowMenu(true)}>
            <StyledIcon name={'burger'} />
          </div>
        </Header>
      ) : (
        <Container>
          <Cont>
            <SecondRow>
              <Logo isWhite={true} />
              <div onClick={() => setShowMenu(false)}>
                <ExitIcon name={'close'} />
              </div>
            </SecondRow>
            {routes.length > 1 ? (
              <ModuleSelector
                moduleInfo={currentRoute}
                options={routes || []}
                onChange={(option) => {
                  dispatch(actions.clearBackUrl());
                  navigate(option.slug);
                }}
              />
            ) : (
              <Module>{routes?.[0]?.name}</Module>
            )}

            {renderTabs(currentRoute, currentRoute?.slug)}
          </Cont>
          <BottomRow>
            <ProfileRow>
              <Link to={slugs.profile}>
                <InnerRow>
                  <Avatar name={user?.firstName || ''} surname={user?.lastName || ''} />
                  <UserInfo>
                    <FullName>{`${user?.firstName} ${user?.lastName}`}</FullName>
                    <Email>{user?.email}</Email>
                  </UserInfo>
                </InnerRow>
              </Link>
              <div onClick={() => mutateAsync()}>
                <StyledLogoutIcon name={'exit'} />
              </div>
            </ProfileRow>
          </BottomRow>
        </Container>
      )}
    </>
  );
};

const UserInfo = styled.div`
  margin: 0 20px 0 8px;
`;

const Cont = styled.div`
  width: 100%;
`;

const Module = styled.div`
  color: white;
  font-size: 2.2rem;
  font-weight: bold;
`;

const FullName = styled.div`
  font-size: 1.4rem;
  max-width: 110px;
  font-weight: bold;
  color: #f7f8fa;
`;

const Email = styled.div`
  font-size: 1.2rem;
  color: rgb(255, 255, 255, 0.64);
`;

const StyledLogoutIcon = styled(Icon)`
  color: rgb(255, 255, 255, 0.64);
  font-size: 2.5rem;
`;

const InnerRow = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ProfileRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
`;

const BottomRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Tab = styled.div<{ isActive: boolean }>`
  padding: 10px 8px;
  color: #121926;
  border-radius: 4px;
  color: #f7f8fa;
  font-size: 16px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: ${({ isActive }) => isActive && '#EEEBE561'};
  &:hover {
    background-color: #eeebe561;
  }
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 30px;
  gap: 8px;
`;

const SecondRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 57px;
`;

const ExitIcon = styled(Icon)`
  cursor: pointer;
  font-size: 2rem;
  vertical-align: middle;
  color: white;
`;

const Header = styled.div`
  position: sticky;
  top: 0;
  height: 64px;
  width: 100%;
  padding: 18px 19px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.sideBar};
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 5;
  padding: 18px 24px;
  overflow-y: auto;
`;

const StyledIcon = styled(Icon)`
  cursor: pointer;
  font-size: 2rem;
  vertical-align: middle;
  color: #231f20;
`;

export default MobileNavbar;
