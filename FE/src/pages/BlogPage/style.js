import { Modal } from "antd";
import styled from "styled-components";

export const WrapperModal = styled(Modal)`
  & .ant-modal-body {
    overflow-y: scroll;
    height: 500px;
    scrollbar-width: none;
  }
`;

export const WrapperBlogItem = styled.div`
  width: 900px;
  height: 100%;
  border-radius: 30px;
  box-shadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px";

  background: #fff;
  // filter: drop-shadow(1px 2px 2px #333);
  margin-bottom: 30px;
  @media (max-width: 768px) {
    width: 95%;
  }
`;

export const WrapperContentComment = styled.div`
  background: #f0f2f5;
  padding: 15px;
  border-radius: 15px;
  width: 800px;
  overflow: hidden;
  display: flex;
  gap: 12px;
  flex: 1;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
