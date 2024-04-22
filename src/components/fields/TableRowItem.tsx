import styled from "styled-components";
import { device } from "../../styles";

export interface TableRowItemProps {
  items: JSX.Element[];
}

const TableRowItem = ({ items }: TableRowItemProps) => {
  return <Container>{items.map((item) => item)}</Container>;
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  @media ${device.mobileL} {
    flex-wrap: wrap;
  }
`;

export default TableRowItem;
