import { Modal } from "antd";
import styled from "styled-components";

export const WrapperModal = styled(Modal)`
  & .ant-modal-body {
    overflow-y: scroll;
    height: 500px;
  }
`;
