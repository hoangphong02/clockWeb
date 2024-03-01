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
export const WrapperSidenav = styled.div`
  & .profile {
    margin-bottom: 20px;
    margin-top: -12px;
    text-align: center;
  }
  & .profile img {
    border-radius: 50%;
    box-shadow: 0px 0px 5px 1px grey;
  }
  & .name {
    font-size: 20px;
    font-weight: bold;
    padding-top: 20px;
  }
  & .job {
    font-size: 16px;
    font-weight: bold;
    padding-top: 10px;
  }
  & .url,
  hr {
    text-align: center;
  }
  & .url hr {
    margin-left: 20%;
    width: 60%;
  }
  & .url p {
    color: #818181;
    display: block;
    font-size: 20px;
    margin: 10px 0;
    padding: 6px 8px;
    text-decoration: none;
  }
  & .url p:hover,
  .url .active {
    background-color: #e8f5ff;
    border-radius: 28px;
    color: #000;
    margin-left: 14%;
    width: 65%;
  }
`;
