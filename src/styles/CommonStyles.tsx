import styled from 'styled-components';
import { device } from '.';
import TabBar from '../components/other/TabBar';

export const InnerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  @media ${device.mobileL} {
    flex-direction: column;
    gap: 0;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  @media ${device.mobileL} {
    flex-direction: column;
    gap: 0;
  }
`;

export const ColumnOne = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  @media ${device.mobileL} {
    min-width: 100%;
  }
`;
export const ColumnTwo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 280px;
  flex: 1;
`;

export const ItalicText = styled.div`
  font-style: italic;
`;

export const TableButtonsRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
  margin: 16px 0;
`;

export const TableButtonsInnerRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

export const ViewContainer = styled.div`
  max-width: 1200px;
  min-width: 500px;
  margin: 22px auto 120px auto;
  padding: 0 16px;
  @media ${device.mobileL} {
    margin: 0 16px 20px 16px;
    padding: 0;
    width: auto;
    min-width: auto;
  }
`;

export const ViewRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 55px;
`;
export const ViewInnerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  @media ${device.mobileL} {
    flex-direction: column;
    align-items: flex-start;
  }
`;
export const ViewTitle = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #121926;
  line-height: 20px;
`;

export const StyledTabBar = styled(TabBar)`
  margin: -8px -16px 16px -16px;
  padding: 0 16px;
`;

export const FormRow = styled.div<{ columns?: number }>`
  display: grid;
  margin-top: 16px;
  grid-template-columns: repeat(${({ columns }) => columns || 3}, 1fr);
  gap: 16px;
  @media ${device.mobileL} {
    grid-template-columns: 1fr;
  }
`;

export const FormColumn = styled.div<{ columns?: number }>`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
`;

export const LargeFormContainer = styled.div`
  margin: 0 20px 20px 20px;
  @media ${device.mobileL} {
    margin: 0 16px 20px 16px;
    padding: 0;
    width: auto;
    min-width: auto;
  }
`;

export const FormTitleRow = styled.div`
  display: flex;
  align-items: center;
  margin: 22px 0px 33px 0px;
  font-weight: bold;
  font-size: 2rem;
  line-height: 25px;
  color: #231f20;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin: 16px 0;
  @media ${device.mobileL} {
    grid-template-columns: repeat(1, 1fr);
  }
`;
export const FormTitle = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #121926;
  line-height: 20px;
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 90px;
`;

export const TitleInnerRow = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  align-items: flex-start;
`;
export const TitleInnerSecondRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;
