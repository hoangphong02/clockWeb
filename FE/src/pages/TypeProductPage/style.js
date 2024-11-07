import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import bgTypeTetHoaMai2 from "../../assets/images/bgTypeTetHoaMai4.png";
import bgTypeTetHoaMai3 from "../../assets/images/bgTypeTetHoaMai3.png";

import { Pagination } from "antd";

export const WrapperTypeProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: flex-start;
  width: 200px;
`;

export const WrapperButtonMore = styled(ButtonComponent)`
  &:hover {
    color: #fff;
    background: rgb(10, 104, 255);
    span {
      color: #fff;
    }
  }
  width: 100%;
  text-align: center;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

export const WrapperProducts = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 14px;
  flex-wrap: wrap;
`;

export const WrapperMic = styled.div`
  width: 50px;
  height: 50px;
  font-size: 20px;
  background-color: #0000004a;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  position: fixed;
  bottom: 70px;
  left: 10px;
  cursor: pointer;
  z-index: 4;
`;

export const WrapperAll = styled.div`
  background-color: #fff;
  // background-color: rgb(130, 26, 32);
  height: 100%;
  padding: 30px 0;
  &:before {
    content: "";
    display: block;
    position: absolute;
    z-index: 0 !important;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  @keyframes snow {
    0% {
      background-position: 0px 0px, 0px 0px, 0px 0px;
    }
    50% {
      background-position: 500px 500px, 100px 200px, -100px 150px;
    }
    100% {
      background-position: 500px 1000px, 200px 400px, -100px 300px;
    }
  }
  @-moz-keyframes snow {
    0% {
      background-position: 0px 0px, 0px 0px, 0px 0px;
    }
    50% {
      background-position: 500px 500px, 100px 200px, -100px 150px;
    }
    100% {
      background-position: 400px 1000px, 200px 400px, 100px 300px;
    }
  }
  @-webkit-keyframes snow {
    0% {
      background-position: 0px 0px, 0px 0px, 0px 0px;
    }
    50% {
      background-position: 500px 500px, 100px 200px, -100px 150px;
    }
    100% {
      background-position: 500px 1000px, 200px 400px, -100px 300px;
    }
  }
  @-ms-keyframes snow {
    0% {
      background-position: 0px 0px, 0px 0px, 0px 0px;
    }
    50% {
      background-position: 500px 500px, 100px 200px, -100px 150px;
    }
    100% {
      background-position: 500px 1000px, 200px 400px, -100px 300px;
    }
  }
`;

export const WrapperPanigation = styled(Pagination)`
  & .ant-pagination-item-active a {
    color: #000;
  }
  & .ant-pagination-prev .ant-pagination-item-link {
    color: #000;
  }
  & .ant-pagination-item-container span .ant-pagination-item-ellipsis {
    color: #000;
  }
  & .ant-pagination-next .ant-pagination-item-link {
    color: #000;
  }
`;

export const WrapperBody = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
export const WrapperSideBar = styled.div`
  width: 20%;
  margin: 20px auto 0px;
  display: flex;
  flex-direction: column;
  z-index: 5;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const WrapperRight = styled.div`
  width: 80%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
