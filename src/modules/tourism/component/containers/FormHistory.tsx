import { map } from "lodash";
import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ButtonColors } from "../../../../components/buttons/Button";
import Avatar from "../../../../components/other/Avatar";
import Icon from "../../../../components/other/Icons";
import LoaderComponent from "../../../../components/other/LoaderComponent";
import SimpleContainer from "../../../../components/other/SimpleContainer";
import { device } from "../../../../styles";
import { intersectionObserverConfig } from "../../../../utils/configs";
import { formatDateAndTime } from "../../../../utils/format";
import { handleError } from "../../../../utils/functions";
import { HistoryTypes } from "../../utils/constants";
import { formLabels } from "../../utils/texts";
import { theme } from "../../utils/theme";
import { FormHistory } from "../../utils/types";

interface FormHistoryContainerProps {
  formHistoryLabels: { [key: string]: string };
  endpoint: (props: any) => Promise<any>;
  name: string;
}

const iconsByHistoryType = {
  [HistoryTypes.APPROVED]: (
    <Icon name="approved" color={theme.colors[ButtonColors.SUCCESS]} />
  ),
  [HistoryTypes.REJECTED]: (
    <Icon name="rejected" color={theme.colors[ButtonColors.DANGER]} />
  ),
  [HistoryTypes.RETURNED]: (
    <Icon name="returned" color={theme.colors[ButtonColors.PRIMARY]} />
  )
};

const FormHistoryContainer = ({
  formHistoryLabels,
  endpoint,
  name
}: FormHistoryContainerProps) => {
  const { id } = useParams();
  const observerRef = useRef(null);

  const fetchData = async (page: number) => {
    const data = await endpoint({
      id,
      page: page,
      pageSize: 5
    });

    return {
      data: data?.rows,
      page: data.page < data.totalPages ? data.page + 1 : undefined
    };
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery([name], ({ pageParam }) => fetchData(pageParam), {
      onError: () => {
        handleError();
      },
      getNextPageParam: (lastPage) => lastPage.page,
      cacheTime: 60000
    });

  useEffect(() => {
    const currentObserver = observerRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, intersectionObserverConfig);

    if (currentObserver) {
      observer.observe(currentObserver);
    }

    return () => {
      if (currentObserver) {
        observer.unobserve(currentObserver);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, data]);

  const suggestions = data
    ? data.pages
        .flat()
        .map((item) => item?.data)
        .flat()
    : [];

  return (
    <SimpleContainer title={formLabels.history}>
      <Container>
        {map(suggestions, (history: FormHistory, index: number) => {
          const hasIcon = !!iconsByHistoryType[history.type];

          return (
            <Row key={`formHistory-${index}`}>
              <StyledAvatar
                name={`${history?.createdBy?.firstName || "Sistema"}`}
                surname={`${history?.createdBy?.lastName || " "}`}
              />
              <Column>
                <FullName>
                  {!history?.createdBy?.firstName &&
                  !history?.createdBy?.lastName
                    ? "Sistema"
                    : `${history?.createdBy?.firstName} ${history?.createdBy?.lastName}`}
                </FullName>
                <DateContainer>
                  {formatDateAndTime(history.createdAt)}
                </DateContainer>
                <Comment>{history.comment}</Comment>
                <InnerContainer>
                  <InnerRow>
                    {hasIcon && iconsByHistoryType[history.type]}
                    <HistoryType>{formHistoryLabels[history.type]}</HistoryType>
                  </InnerRow>
                </InnerContainer>
              </Column>
            </Row>
          );
        })}
        {observerRef && <div ref={observerRef} />}
        {isFetching && <LoaderComponent />}
      </Container>
    </SimpleContainer>
  );
};

export default FormHistoryContainer;

const StyledAvatar = styled(Avatar)`
  margin-right: 12px;
`;

const Container = styled.div`
  max-height: 500px;
  overflow-y: auto;

  @media ${device.mobileL} {
    max-height: 100%;
  }
`;

const Comment = styled.div`
  font-size: 1.4rem;
  color: #121926;
  margin-bottom: 6px;
  white-space: pre-line;
  word-break: break-word;
`;
const HistoryType = styled.div`
  font-size: 1.2rem;
  color: #121926;
`;

const DateContainer = styled.div`
  font-size: 1.2rem;
  color: #697586;
  margin-bottom: 12px;
`;

const FullName = styled.div`
  font-size: 1.6rem;
  color: #231f20;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 36px 1fr;
  margin-bottom: 18px;
`;

const InnerRow = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InnerContainer = styled.div`
  background-color: #f2f2f2;
  width: 100%;
  height: 40px;
  padding: 3px 8px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media ${device.mobileL} {
    width: 100%;
  }
`;
