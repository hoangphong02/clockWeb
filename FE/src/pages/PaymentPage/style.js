import { InputNumber } from "antd";
import styled from "styled-components";
export const WrapperInputNumber = styled(InputNumber)`
  width: 50px;
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
  display: flex;
  gap: 12px;
  @media (max-width: 768px) {
    margin: 0 auto;
    margin-top: -5px;
    margin-bottom: 20px;
  }
`;
export const WrapperInfo = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 20px;
  line-height: 30px;
`;

export const WrapperContent = styled.div`
  height: 100%;
  width: 1270px;
  margin: 0px auto;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
export const WrapperListDelivery = styled.div`
  width: 500px;
  padding: 15px;
  border-radius: 20px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const WrapperSection = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
