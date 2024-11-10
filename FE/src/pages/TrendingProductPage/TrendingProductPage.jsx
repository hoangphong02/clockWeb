import React, { useEffect, useRef, useState } from "react";
import "moment/locale/vi"; // Đặt ngôn ngữ hiển thị, ví dụ tiếng Việt
import * as ProductService from "../../services/ProductService";
import * as SliderService from "../../services/SliderService";
import { WrapperProducts } from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import { Pagination } from "antd";
import CartSliderComponent from "../../components/CartSliderComponent/CartSliderComponent";
import { useDebounce } from "../../hooks/useDebounce";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

const TrendingProductPage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 1000); //delay thời gian tìm kiếm 1s sau khi nhập kí tự
  const [productsOutstanding, setProductsOutstanding] = useState([]);
  const [slider, setSlider] = useState([]);
  const [panigate, setPanigate] = useState({
    page: 0,
    limit: 6,
    total: 1,
  });
  const getAllSlider = async () => {
    const res = await SliderService.getAllSlider();
    return res;
  };
  const querySlider = useQuery({
    queryKey: ["sliders"],
    queryFn: getAllSlider,
  });

  // const getSlider = (typeProduct)=>{
  //     const arrImage = []
  //     if(sliders?.data){
  //         sliders?.data?.map((slider)=>{
  //             if(slider.type === typeProduct){
  //                 arrImage.push(slider.image)
  //             }
  //         })
  //     }
  //     setSlider(arrImage)
  // }

  // const getImageSlider = ()=>{
  //      const foundImage = typeProductContant.find((type) => type.type === typeProduct);
  //      if(foundImage){
  //         setImageSlider(foundImage?.imageSlider)
  //      }
  // }

  const onChange = (current, pageSize) => {
    setPanigate({ ...panigate, page: current - 1 });
  };

  const fetchAllProductSliderCart = async () => {
    const res = await ProductService.getAllProduct("", 100);
    return res.data;
  };
  const queryProductSliderCart = useQuery({
    queryKey: ["productCart"],
    queryFn: fetchAllProductSliderCart,
  });
  const { isLoading: isLoadingProducts, data: productCart } =
    queryProductSliderCart;
  useEffect(() => {
    const sortedProducts = productCart?.sort((a, b) => b.selled - a.selled);
    const topFourProducts = sortedProducts?.slice(0, 17);
    setProductsOutstanding(topFourProducts);
  }, [productCart]);

  console.log(productsOutstanding);

  return (
    <div>
      <div
        style={{
          width: "100%",
          margin: "0 auto",
          paddingTop: "32px",
        }}
      >
        <SliderComponent arrImg={slider} />

        <WrapperProducts>
          {productsOutstanding
            ?.filter((pro) => {
              if (searchDebounce === "") {
                return pro;
              } else if (
                pro?.name
                  ?.toLowerCase()
                  ?.includes(searchDebounce?.toLowerCase())
              ) {
                return pro;
              }
            })
            ?.slice(0 + panigate.page * 6, 6 * (panigate.page + 1))
            ?.map((product) => {
              return (
                // <CardComponent key={product._id} countInStock={product.countInStock} description={product.description} image ={product.image} name ={product.name} price={product.price} rating={product.rating} type= {product.type} discount ={product.discount} selled= {product.selled} id={product._id}/>
                <CartSliderComponent
                  key={product._id}
                  countInStock={product.countInStock}
                  description={product.description}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  rating={product.rating}
                  type={product.type}
                  discount={product.discount}
                  selled={product.selled}
                  id={product._id}
                />
              );
            })}
        </WrapperProducts>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            defaultCurrent={panigate.page + 1}
            total={(productsOutstanding?.length / 6) * 10}
            style={{ margin: "20px 0" }}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TrendingProductPage;
