import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
  color: #fff;
  font-size: 18px;
`;

export const ButtonAddUser = styled.button`
  background: #91616d;
  color: #fff;
  font-size: 14px;
  height: 45px;
  padding: 0px 15px;
  border-radius: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: #61a3dc;
    cursor: pointer;
  }
`;
export const WrapperAvatar = styled(Upload)`
  & .ant-upload-list-item-container {
    display: none;
  }
  & .ant-upload {
    display: flex;
    align-items: center;
  }
`;
