import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { actions } from '../../state/backUrl/reducer';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { device } from '../../styles';
import { RouteProps, User } from '../../types';
import { useLogoutMutation } from '../../utils/hooks';
import { filteredRoutes } from '../../utils/router';
import { slugs } from '../../utils/routes';
import Avatar from '../other/Avatar';
import Icon from '../other/Icons';
import Logo from '../other/Logo';
import ModuleSelector from './ModuleSelector';

interface ModuleMenuProps {
  className?: string;
}

const ModuleMenu = ({ className }: ModuleMenuProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user: User = useAppSelector((state) => state.user.userData);
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
            <Link
              onClick={() => {
                dispatch(actions.clearBackUrl());
              }}
              to={`${slug}/${tab.slug}`}
              key={tab.slug}
            >
              <Tab isActive={locationSlug?.includes(slugRoot)}>
                {tab.name}
                {tab?.icon}
              </Tab>
            </Link>
          );
        }
        return null;
      });
  };
  return (
    <Container className={className}>
      <div>
        <TitleRow>
          <TitleContainer>
            <InnerRow>
              <Logo isWhite={true} />
            </InnerRow>
          </TitleContainer>
        </TitleRow>
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
      </div>
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
            <StyledLogoutIcon name="exit" />
          </div>
        </ProfileRow>
      </BottomRow>
    </Container>
  );
};

export default ModuleMenu;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: 0;
  width: 300px;
  background-color: ${({ theme }) => theme.colors.sideBar};
  padding: 18px 16px;
`;

const Module = styled.div`
  color: white;
  font-size: 2.2rem;
  font-weight: bold;
`;

const StyledLogoutIcon = styled(Icon)`
  color: rgb(255, 255, 255, 0.64);
  font-size: 2.5rem;
`;

const StyledCloseIcon = styled(Icon)`
  display: none;
  color: #bab2b0;
  font-size: 2.5rem;
  @media ${device.mobileXL} {
    display: block;
  }
`;

const UserInfo = styled.div`
  margin: 0 20px 0 8px;
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

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const TitleRow = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 30px;
`;

const Tab = styled.div<{ isActive: boolean }>`
  padding: 9px;
  color: #f7f8fa;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  background-color: ${({ isActive }) => isActive && '#FFFFFF1F'};
  display: flex;
  justify-content: space-between;
  &:hover {
    background: #ffffff1f 0% 0% no-repeat padding-box;
  }
`;
