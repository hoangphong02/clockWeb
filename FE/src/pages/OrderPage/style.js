import { InputNumber } from "antd";
import styled from "styled-components";
import InputComponent from "../../components/InputComponent/InputComponent";
export const WrapperInputNumber = styled(InputNumber)`
  width: 50px;
`;

export const WrapperContent = styled.div`
  height: 100%;
  width: 1270px;
  margin: 0px auto;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
export const WrapperLeft = styled.div`
  width: 100%;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
  }
`;

export const WrapperRight = styled.div`
  width: 100%;
  margin-top: 12px;
  display: flex;
  gap: 12px;

  @media (max-width: 768px) {
    margin: 0 auto;
    margin-top: 20px;
  }
`;
export const WrapperInfo1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #fff;
  padding: 20px;
  line-height: 30px;
  width: 70%;
`;
export const WrapperInfo2 = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 20px;
  gap: 16px;
  line-height: 30px;
  width: 30%;
  height: auto;
`;
export const WrapperSection = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const WrapperProductCart = styled.div`
  display: flex;
  width: 100%;
  gap: 50px;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    gap: 0;
  }
`;

export const WrapperTitleProduct = styled.div`
  display: flex;
  gap: 50px;
  padding: 10px;
  background: rgb(255, 255, 255);
  margin: 0px 0px 10px;

  @media (max-width: 768px) {
    display: block;
    gap: 0;
  }
`;

export const WrapperInputComponent = styled(InputComponent)`
  @media (max-width: 768px) {
    width: 70%;
    overflow: hidden;
  }
`;
