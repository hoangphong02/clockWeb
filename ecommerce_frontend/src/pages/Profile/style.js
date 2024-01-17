import Upload from "antd/es/upload/Upload";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
  color: #000;
  font-size: 18px;
  margin: 4px 0;
`;

export const WrapperContentProfile = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  width: 600px;
  margin: 0 auto;
  padding: 30px;
  border-radius: 10px;
  gap: 20px;
  margin-bottom: 25px;
`;

export const WrapperLabel = styled.label`
  color: #000;
  font-size: 12px;
  font-weight: 600;
  width: 50px;
`;

export const WrapperInput = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const WrapperAvatar = styled(Upload)`
  & .ant-upload-list-item-container {
    display: none;
  }
`;
