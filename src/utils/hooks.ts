import { isEqual } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { TableData, TableRow } from '../components/tables/MainTable';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { actions as userAction } from '../state/user/reducer';
import { device } from '../styles';
import { Columns, User } from '../types';
import api from './api';
import { pathToModule, ServerErrorCodes } from './constants';
import { handleErrorToastFromServer, mapSlug, sortDesktop, sortMobile } from './functions';
import { clearCookies, emptyUser } from './loginFunctions';
import { slugs } from './routes';

interface TableDataProp {
  endpoint: () => Promise<any>;
  mapData: (props: any) => TableRow[];
  dependencyArray: any[];
  name: string;
}
const cookies = new Cookies();

export const useGenericTablePageHooks = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { page } = Object.fromEntries([...Array.from(searchParams)]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  return { page, navigate, dispatch, location, id };
};

export const useTableData = ({ endpoint, mapData, dependencyArray, name }: TableDataProp) => {
  const [tableData, setTableData] = useState<TableData>({ data: [] });

  const { isFetching } = useQuery([name, ...dependencyArray], () => endpoint(), {
    onError: () => {
      handleErrorToastFromServer();
    },
    onSuccess: (list) => {
      setTableData({
        data: mapData(list?.rows || []),
        totalPages: list?.totalPages,
      });
    },
  });

  return { tableData, loading: isFetching };
};

export const useCheckAccess = (access: string) => {
  const currentUser = useAppSelector((state) => state.user.userData);
  const pathModule = useGetCurrentPathModule();
  const currentModule = pathToModule[pathModule];

  return currentUser?.permissions?.[currentModule].accesses?.some((a) => ['*', access].includes(a));
};

export const useGetCurrentPathModule = () => {
  const location = useLocation();
  return location.pathname.split('/')[1];
};

export const useCurrentTab = (tabs) => {
  const location = useLocation();

  const currentTab = tabs.find((tab) => location.pathname.endsWith(mapSlug(tab.route || '')));

  return currentTab?.value;
};

export const useGetSortedColumns = (columns: Columns) => {
  const isMobile = useWindowSize(device.mobileL);

  const sortedColumns = Object.keys(columns)
    .sort((key, key2) =>
      isMobile ? sortMobile(columns, key, key2) : sortDesktop(columns, key, key2),
    )
    .reduce((obj, key) => {
      const isVisible = !columns[key].hasOwnProperty('visible') || columns[key].visible;

      if (isVisible) {
        obj[key] = columns[key];
      }
      return obj;
    }, {});

  return sortedColumns;
};

export const useWindowSize = (width: string) => {
  const [isInRange, setIsInRange] = useState(false);

  const handleResize = useCallback(() => {
    const mediaQuery = window.matchMedia(width);
    setIsInRange(mediaQuery.matches);
  }, [width]);

  useEffect(() => {
    handleResize();
  }, [handleResize]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return isInRange;
};

export const useUserInfoMutation = () => {
  const dispatch = useAppDispatch();
  const token = cookies.get('token');

  const { isLoading } = useQuery([token], () => api.getUserInfo(), {
    onError: ({ response }: any) => {
      if (isEqual(response.status, ServerErrorCodes.NO_PERMISSION)) {
        clearCookies();
        dispatch(userAction.setUser(emptyUser));
        return;
      }

      return handleErrorToastFromServer();
    },
    onSuccess: (data: User) => {
      if (data) {
        dispatch(userAction.setUser({ userData: data, loggedIn: true }));
      }
    },
    retry: false,
    enabled: !!token,
  });

  return { isLoading };
};

export const useLogoutMutation = () => {
  const dispatch = useAppDispatch();

  const { mutateAsync } = useMutation(() => api.logout(), {
    onError: () => {
      handleErrorToastFromServer();
    },
    onSuccess: () => {
      clearCookies();
      cookies.remove('refreshToken', { path: '/' });
      dispatch(userAction.setUser(emptyUser));
    },
  });

  return { mutateAsync };
};

export const useVerifyUser = () => {
  const [searchParams] = useSearchParams();
  const { h, s } = Object.fromEntries([...Array.from(searchParams)]);
  const navigate = useNavigate();

  if (!h || !s) {
    navigate(slugs.login);
  }

  const { data, mutateAsync, isLoading } = useMutation(() => api.verifyUser({ h, s }), {
    onError: () => {
      navigate(slugs.login);
    },
  });

  useEffect(() => {
    mutateAsync();
  }, [mutateAsync]);

  return { data, mutateAsync, isLoading };
};

export const useSetPassword = () => {
  const [searchParams] = useSearchParams();
  const { h, s } = Object.fromEntries([...Array.from(searchParams)]);

  const { data, mutateAsync, isLoading } = useMutation(
    ({ password }: { password: string }) => {
      return api.setPassword({ h, s, password });
    },
    {
      onError: () => {
        handleErrorToastFromServer();
      },
    },
  );

  return { isSuccess: data?.success, mutateAsync, isLoading };
};
