import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatedImage,
  WrapperButtonComponent,
  WrapperProductTrend,
  WrapperProductTrending,
  WrapperTextProductTrending,
  WrapperTitleProductNoel,
  WrapperTitleProductTrend,
  WrapperTitleProductType,
} from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import headerTet from "../../assets/images/factory_bg_1.png";
import backgroundTet from "../../assets/images/culture_bg_1.png";
import backgroundTitleTet from "../../assets/images/culture_heading.png";
import backgroundgiangsinh from "../../assets/images/bgNoel8.png";
import backgroundgiangsinhRight from "../../assets/images/bgNoel6.png";
import backgroundValentine from "../../assets/images/bgValentine3.png";
import backgroundValentineRight from "../../assets/images/bgValentine5.png";
import backgroundHalloween from "../../assets/images/background-1298031_1280.webp";
import ImageContact from "../../assets/images/contact.png";
import * as ProductService from "../../services/ProductService";
import * as SliderService from "../../services/SliderService";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import { useDebounce } from "../../hooks/useDebounce";
import { useLocation, useNavigate } from "react-router";
import { message } from "antd";
import SliderCartComponent from "../../components/SliderCartComponent/SliderCartComponent";
import moment from "moment";
import "moment/locale/vi"; // Đặt ngôn ngữ hiển thị, ví dụ tiếng Việt
import { useMutationHook } from "../../hooks/useMutationHook";
import * as ContactService from "../../services/ContactService";
import ScrollAnimation from "react-animate-on-scroll";

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 100); //delay thời gian tìm kiếm 1s sau khi nhập kí tự
  const refSearch = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [productTypeNam, setProductTypeNam] = useState([]);
  const [productTypeNu, setProductTypeNu] = useState([]);
  const [productTypeDoi, setProductTypeDoi] = useState([]);
  const [productTypeCo, setProductTypeCo] = useState([]);
  const [productTypeDientu, setProductTypeDientu] = useState([]);
  const [dataSlider, setDataSlider] = useState([]);
  const [productsOutstanding, setProductsOutstanding] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const user = useSelector((state) => state.user);
  const location = useLocation();

  const getAllSlider = async () => {
    const res = await SliderService.getAllSlider();
    return res;
  };
  const querySlider = useQuery({
    queryKey: ["sliders"],
    queryFn: getAllSlider,
  });
  const { data: sliders } = querySlider;

  const getDataSlider = () => {
    const arrdata = [];
    if (sliders?.data) {
      sliders?.data.map((slider) => {
        arrdata.push(slider?.image);
      });
    }
    setDataSlider(arrdata);
  };
  useEffect(() => {
    getDataSlider();
  }, [sliders]);

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
  const fetchAllProductTypes = async () => {
    setLoading(true);
    const namPromise = ProductService.getProductType("Đồng hồ nam", 0, 100);
    const nuPromise = ProductService.getProductType("Đồng hồ nữ", 0, 100);
    const doiPromise = ProductService.getProductType("Đồng hồ đôi", 0, 100);
    const coPromise = ProductService.getProductType("Đồng hồ cơ", 0, 100);
    const dientuPromise = ProductService.getProductType(
      "Đồng hồ điện tử",
      0,
      100
    );

    try {
      const [namRes, nuRes, doiRes, coRes, dientuRes] = await Promise.all([
        namPromise,
        nuPromise,
        doiPromise,
        coPromise,
        dientuPromise,
      ]);

      setProductTypeNam(namRes?.data);
      setProductTypeNu(nuRes?.data);
      setProductTypeDoi(doiRes?.data);
      setProductTypeCo(coRes?.data);
      setProductTypeDientu(dientuRes?.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product types:", error);
      setLoading(false);
    }
  };

  console.log("productCart", productCart);

  useEffect(() => {
    fetchAllProductTypes();
  }, []);

  useEffect(() => {
    const sortedProducts = productCart?.sort((a, b) => b.selled - a.selled);
    const topFourProducts = sortedProducts?.slice(0, 5);
    setProductsOutstanding(topFourProducts);
  }, [productCart]);

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };
  const onChangeMessage = (e) => {
    setMessageInput(e.target.value);
  };
  const mutationAddContact = useMutationHook((data) => {
    const { token, ...rests } = data;
    const res = ContactService.createContact({ ...rests }, token);
    return res;
  });

  const {
    data,
    isLoading: isLoadingAdd,
    isSuccess: isSuccsess,
    isError: isError,
  } = mutationAddContact;

  const handleAddContact = () => {
    // eslint-disable-next-line no-unused-expressions
    if (!user?.id) {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      mutationAddContact.mutate({
        token: user?.access_token,
        name: name,
        phone: phone,
        email: email,
        message: messageInput,
        user: user?.id,
      });
    }
  };

  useEffect(() => {
    if (isSuccsess && data?.status === "OK") {
      message.success("Gửi thông tin liên hệ thành công");
      setName("");
      setEmail("");
      setPhone("");
      setMessageInput("");
    } else if (isSuccsess && data?.status === "ERR") {
      message.error(data?.message);
    }
  }, [isSuccsess, isError]);

  return (
    <Loading isLoading={loading}>
      <div className="body" style={{ width: "100%", background: "#fff" }}>
        <div
          id="container"
          style={{ width: "100%", margin: "0 auto", height: "100%" }}
        >
          <SliderComponent arrImg={dataSlider} />

          <div style={{ width: "100%" }}>
            {/* <img src={headerTet} style={{ width: "100%" }} /> */}

            <div>
              <WrapperTitleProductTrend>
                <h2>SẢN PHẨM NỔI BẬT</h2>
              </WrapperTitleProductTrend>
              <ScrollAnimation animateIn="fadeIn" duration={2}>
                <WrapperProductTrend>
                  {productsOutstanding?.map((pro) => {
                    return (
                      <WrapperProductTrending style={{ position: "relative" }}>
                        <img
                          src={pro?.image}
                          alt=""
                          style={{
                            width: "200px",
                            height: "200px",
                            borderRadius: "50px",
                          }}
                        />
                        <WrapperTextProductTrending
                          className="nameProductTrending"
                          onClick={() =>
                            navigate(`/product-detail/${pro?._id}`)
                          }
                        >
                          <span
                            style={{
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "15px",
                              fontWeight: "700",
                              color: "#821a20",
                            }}
                          >
                            {pro?.name}{" "}
                          </span>
                        </WrapperTextProductTrending>
                      </WrapperProductTrending>
                    );
                  })}
                </WrapperProductTrend>
              </ScrollAnimation>
              <div style={{ textAlign: "center" }}>
                <WrapperButtonComponent
                  className="learn-more"
                  onClick={() => navigate("/productsTrending")}
                >
                  <span className="circle" aria-hidden="true">
                    <span className="icon arrow"></span>
                  </span>
                  <span className="button-text">Xem tất cả</span>
                </WrapperButtonComponent>
              </div>
            </div>

            <div
              style={{
                width: "100%",
                padding: "0 0 40px 0",
              }}
            >
              <WrapperTitleProductType>
                <h2>ĐỒNG HỒ NAM</h2>
              </WrapperTitleProductType>
              <div style={{ width: "1207px", margin: "0 auto" }}>
                <SliderCartComponent products={productTypeNam} />
              </div>
            </div>
            <div
              style={{
                padding: "20px 0 40px 0",
              }}
            >
              <WrapperTitleProductNoel>
                <h2>ĐỒNG HỒ NỮ</h2>
              </WrapperTitleProductNoel>
              <div style={{ width: "1207px", margin: "0 auto" }}>
                <SliderCartComponent products={productTypeNu} />
              </div>
            </div>

            <div
              style={{
                padding: "20px 0 40px 0",
              }}
            >
              <WrapperTitleProductNoel>
                <h2>ĐỒNG HỒ ĐÔI</h2>
              </WrapperTitleProductNoel>
              <div style={{ width: "1207px", margin: "0 auto" }}>
                <SliderCartComponent products={productTypeDoi} />
              </div>
            </div>

            <div
              style={{
                padding: "0 0 40px 0",
              }}
            >
              <WrapperTitleProductNoel>
                <h2>ĐỒNG HỒ CƠ</h2>
              </WrapperTitleProductNoel>
              <div style={{ width: "1207px", margin: "0 auto" }}>
                <SliderCartComponent products={productTypeCo} />
              </div>
            </div>

            <div
              style={{
                padding: "0 0 40px 0",
              }}
            >
              <WrapperTitleProductNoel>
                <h2>ĐỒNG HỒ ĐIỆN TỬ</h2>
              </WrapperTitleProductNoel>
              <div style={{ width: "1207px", margin: "0 auto" }}>
                <SliderCartComponent products={productTypeDientu} />
              </div>
            </div>

            {/* liên hệ */}
            <ScrollAnimation animateIn="fadeIn" duration={2}>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  padding: "50px 0",
                  flexWrap: "wrap",
                }}
              >
                {/* <AnimatedImage>
                  <img src={ImageContact} />
                </AnimatedImage> */}
                <div
                  style={{
                    padding: "50px",
                    border: "0.6rem solid #621628",
                    color: "#fff",
                    margin: "0 auto",
                    borderRadius: "50px",
                  }}
                >
                  <h3 style={{ color: "#621628" }}>NHẬN TƯ VẤN ĐỒNG HỒ </h3>
                  <div style={{ width: "100%", padding: "20px 0 0 0" }}>
                    <div style={{ width: "100%" }}>
                      <label
                        htmlFor=""
                        style={{
                          fontWeight: "500",
                          fontSize: "16px",
                          width: "100%",
                        }}
                      >
                        Name
                      </label>
                      <input
                        placeholder="Nhập họ tên"
                        style={{
                          background: "none",
                          border: "none",
                          width: "100%",
                          outline: "none",
                          borderBottom: "0.2rem solid #000",
                          color: "#d0a862",
                        }}
                        value={name}
                        onChange={onChangeName}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "50px",
                      width: "100%",
                      padding: "20px 0",
                    }}
                  >
                    <div>
                      <label
                        htmlFor=""
                        style={{ fontWeight: "500", fontSize: "16px" }}
                      >
                        Email
                      </label>
                      <input
                        placeholder="Nhập địa chỉ email"
                        style={{
                          background: "none",
                          border: "none",
                          width: "100%",
                          outline: "none",
                          borderBottom: "0.2rem solid #000",
                          color: "#d0a862",
                        }}
                        value={email}
                        onChange={onChangeEmail}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor=""
                        style={{ fontWeight: "500", fontSize: "16px" }}
                      >
                        Phone
                      </label>
                      <input
                        placeholder="Nhập số điện thoại"
                        style={{
                          background: "none",
                          border: "none",
                          width: "100%",
                          outline: "none",
                          borderBottom: "0.2rem solid #000",
                          color: "#d0a862",
                        }}
                        value={phone}
                        onChange={onChangePhone}
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <label
                        htmlFor=""
                        style={{ fontWeight: "500", fontSize: "16px" }}
                      >
                        Nhập nội dung yêu cầu
                      </label>
                      <textarea
                        placeholder="Nhập nội dung yêu cầu"
                        style={{
                          background: "none",
                          border: "none",
                          width: "100%",
                          outline: "none",
                          borderBottom: "0.2rem solid #000",
                          color: "#d0a862",
                          minHeight: "90px",
                        }}
                        value={messageInput}
                        onChange={onChangeMessage}
                      />
                    </div>
                  </div>
                  <div
                    style={{ textAlign: "center", paddingTop: "30px" }}
                    onClick={() => handleAddContact()}
                  >
                    <WrapperButtonComponent className="learn-more">
                      <span className="circle" aria-hidden="true">
                        <span className="icon arrow"></span>
                      </span>
                      <span className="button-text">Gửi yêu cầu</span>
                    </WrapperButtonComponent>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default HomePage;
