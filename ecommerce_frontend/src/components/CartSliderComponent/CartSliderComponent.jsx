// import { Card } from 'antd'
// import Meta from 'antd/es/card/Meta'
import React from "react";
import {
  StyleNameProduct,
  WrapperReportText,
  WrapperPriceText,
  WrapperDiscountText,
  WrapperStyleCard,
  WrapperStyleTextSell,
  WrapperImage,
} from "./style";
import { StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router";
import imagebg from "../../assets/images/culture_price.png";
const CartSliderComponent = (props) => {
  const {
    countInStock,
    description,
    image,
    name,
    price,
    rating,
    type,
    discount,
    selled,
    id,
  } = props;
  const navigate = useNavigate();
  const handleDetailsProduct = (id) => {
    navigate(`/product-detail/${id}`);
  };

  return (
    <WrapperStyleCard
      hoverable
      bodyStyle={{ padding: "10px" }}
      cover={
        <div
          style={{
            position: "relative",
            display: "grid",
            placeItems: "center",
          }}
        >
          <WrapperImage
            alt="example"
            src={image}
            style={{ opacity: countInStock === 0 ? "0.2" : "1" }}
          />
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: countInStock === 0 ? "flex" : "none",
            }}
          >
            Hết hàng
          </span>
        </div>
      }
      onClick={() => countInStock !== 0 && handleDetailsProduct(id)}
      disabled={countInStock === 0}
    >
      <StyleNameProduct style={{ overflow: "hidden", height: "32.5px" }}>
        {name}
      </StyleNameProduct>
      <WrapperReportText>
        <span>
          <span>{rating}</span>
          <StarFilled style={{ fontSize: "12px", color: "yellow" }} />
        </span>
        <WrapperStyleTextSell> | Đã bán {selled || 0}+</WrapperStyleTextSell>
      </WrapperReportText>
      <WrapperPriceText style={{ backgroundImage: `url(${imagebg})` }}>
        <span style={{ marginRight: "8px" }}>
          {price.toLocaleString()} vnd{" "}
        </span>
        <WrapperDiscountText> - {discount}%</WrapperDiscountText>
      </WrapperPriceText>
    </WrapperStyleCard>
  );
};

export default CartSliderComponent;
