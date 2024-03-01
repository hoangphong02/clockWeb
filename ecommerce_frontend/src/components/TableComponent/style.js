import { Table } from "antd";
import styled from "styled-components";
export const WrapperButtonExportExcel = styled.button`
  padding: 7px;
  color: #fff;
  background: darkseagreen;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const WrapperTable = styled(Table)`
  & .ant-table {
    background: linear-gradient(
        127.09deg,
        rgba(6, 11, 40, 0.94) 19.41%,
        rgb(21 39 133 / 49%) 76.65%
      )
      border-box;
    color: #fff;
  }
  & .ant-table :hover {
    color: #000;
  }
  & .ant-table-row-selected {
    color: #000;
  }
  & .ant-pagination {
    padding: 0 50px;
  }
  & .ant-pagination .ant-pagination-prev .ant-pagination-item-link {
    color: #fff;
  }
  & .ant-pagination .ant-pagination-item {
    color: #fff;
  }

  & .ant-pagination .ant-pagination-next .ant-pagination-item-link {
    color: #fff;
  }
  & .ant-pagination .ant-pagination-item-active {
    color: #000;
  }
`;
