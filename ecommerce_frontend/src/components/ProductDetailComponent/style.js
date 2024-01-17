import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperStyledImageSmall = styled(Image)`
  height: 64px !important;
  width: 64px;
`;

export const WrapperStyledColImage = styled(Col)`
  display: flex;
  flex-basis: unset;
`;

export const WrapperStyleNameProduct = styled.h1`
  color: rgb(39, 39, 42);
  font-size: 20px;
  font-weight: 500;
  line-height: 150%;
  word-break: break-word;
`;

export const WrapperStyleTextSell = styled.span`
  font-size: 14px;
  line-height: 24px;
  color: rgb(120, 120, 120);
`;

export const WrapperPriceProduct = styled.div`
  background: rgb(250, 250, 250);
`;

export const WrapperPriceTextProduct = styled.h1`
  font-size: 24px;
  font-weight: 600;
  line-height: 150%;
`;

export const WrapperAddress = styled.div`
  span.address {
    text-decoration: underline;
    font-size: 15px;
    line-height: 24px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
  }
  ,
  span.changeAddress {
    color: rgb(11, 116, 229);
    line-height: 24px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
  }
`;

export const WrapperQualityProduct = styled.div`
  display: flex;
  gap: 4px;
`;

export const WrapperTextQuality = styled.div`
  padding: 15px 0px;
  font-weight: 500;
`;
export const WrapperInputNumber = styled(InputNumber)`
  width: 50px;
`;

export const WrapperBtnBuyCart = styled.div`
  margin: 15px 0px;
  display: flex;
  gap: 4px;
`;
