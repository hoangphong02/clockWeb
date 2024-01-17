import styled from "styled-components";
import { Row } from "antd";

export const WrapperHeader = styled(Row)`
  align-items: center;
  gap: 16px;
  flex-wrap: nowrap;
  // width: 1270px;
  // padding: 20px 30px;
`;

export const WrapperTextHeader = styled.span`
  font-size: 18px;
  // color: #fff;
  font-weight: bold;
`;

export const WrapperHeaderAccount = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  gap: 10px;
`;

export const WrapperTextHeaderSmall = styled.span`
  font-size: 13px;
  color: #fff;
  white-space: nowrap;
`;

export const WrapperCartHeader = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const WrapperContentPopover = styled.p`
  cursor: pointer;
  &:hover {
    color: rgb(10, 104, 255);
  }
`;

export const WrapperImgAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;
export const WrapperTypeProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: flex-start;

  height: 44px;
`;

export const WrapperButtonDropdown = styled.div`
  &:hover {
    button {
      color: rgb(189, 24, 24) !important;
    }
    // background: #fff;
    border-radius: 10px;
    .menu {
      display: block;
      transform: translate(-30px, 0px);
    }
  }
`;

export const WrapperMenuItem = styled.div`
  &:hover {
    color: rgb(189, 24, 24) !important;
    // background: #fff;
    border-radius: 10px;
  }
  cursor: pointer;
`;
