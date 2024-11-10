import React, { useEffect, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import {
  WrapperAll,
  WrapperBody,
  WrapperPanigation,
  WrapperProducts,
  WrapperRight,
  WrapperSideBar,
  WrapperTypeProduct,
} from "./style";
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import { useDebounce } from "../../hooks/useDebounce";
import { useLocation, useParams } from "react-router";
import { typeProductContant } from "../../contant";
import CartSliderComponent from "../../components/CartSliderComponent/CartSliderComponent";
import { Radio } from "antd";

const TypeProductPage = () => {
  const searchProduct1 = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct1, 1000); //delay thời gian tìm kiếm 1s sau khi nhập kí tự
  const { state } = useLocation();
  const { type } = useParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [typeProduct, setTypeProduct] = useState([]);
  const [filter, setFilter] = useState(false);

  const [value, setValue] = useState(1);

  const onChangeFilter = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const [panigate, setPanigate] = useState({
    page: 0,
    limit: 6,
    total: 1,
  });

  useEffect(() => {
    if (value > 1) {
      setFilter(true);
    } else {
      setFilter(false);
    }
  }, [value]);

  const LIST_PRICE = [
    {
      label: 2,
      value: {
        min: 0,
        max: 1999000,
      },
    },
    {
      label: 4,
      value: {
        min: 2000000,
        max: 4000000,
      },
    },
    {
      label: 6,
      value: {
        min: 4000000,
        max: 6000000,
      },
    },
    {
      label: 8,
      value: {
        min: 6000000,
        max: 8000000,
      },
    },
    {
      label: 10,
      value: {
        min: 8000000,
        max: 10000000,
      },
    },
    {
      label: 12,
      value: {
        min: 10000001,
        max: 100000000,
      },
    },
  ];

  // useEffect(() => {
  //   if (stateNameProductByTextVoice !== "") {
  //     dispatch(searchProduct(stateNameProductByTextVoice));
  //   }
  // }, [stateNameProductByTextVoice]);

  const fetchAllProductType = async (type, page, limit) => {
    setLoading(true);
    const res = await ProductService.getProductType(state, page, limit);
    if (res?.status === "OK") {
      setLoading(false);
      setProducts(res?.data);
      setPanigate({ ...panigate, total: res?.totalPage });
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllProductType(type, panigate.page, panigate.limit);
  }, [type, panigate.page, panigate.limit]);

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    setTypeProduct(res.data);
  };

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  const onChange = (current, pageSize) => {
    setPanigate({ ...panigate, page: current - 1 });
  };
  const customName = (str) => {
    const name = str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      ?.replace(/ /g, "_");
    return name;
  };
  console.log(products);

  return (
    <Loading isLoading={loading}>
      <WrapperAll>
        <WrapperBody className="all">
          <WrapperSideBar>
            <div>
              <div
                style={{
                  padding: "0 16px",
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "16px",
                }}
              >
                Lọc theo danh mục
              </div>
              <WrapperTypeProduct
                style={{ flexDirection: "column", padding: "0 20px" }}
              >
                {typeProductContant?.map(
                  (type) =>
                    typeProduct.includes(type.type) && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "left",
                          alignItems: "center",
                          background: "#000",
                          width: "100%",
                          padding: "0 20px",
                          color: state === type.type ? "#000" : "#000",
                        }}
                      >
                        <img
                          style={{ width: "20px", height: "20px" }}
                          src={type.image}
                          alt=""
                        />
                        <TypeProduct name={type.type} key={type.type} />
                      </div>
                    )
                )}
                {typeProduct.map((typeP) => {
                  if (!typeProductContant.some((item) => item.type === typeP)) {
                    return (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "0 10px",
                          color: "#fff",
                          borderRadius: "4px",
                          fontWeight: "600",
                          background:
                            customName(typeP) === type
                              ? "#000"
                              : "rgb(127 64 80)",
                          width: "100%",
                        }}
                      >
                        <TypeProduct
                          name={typeP}
                          key={typeP}
                          style={{
                            color: "#fff",
                            background: "#000",
                          }}
                          param={type}
                        />
                      </div>
                    );
                  }
                })}
                {/* {typeProduct.map((item)=>{
                return (
                    <TypeProduct name={item} key={item} param={type} />
                )
            })} */}
              </WrapperTypeProduct>

              <div>
                <div
                  style={{
                    padding: "0 16px",
                    marginTop: "32px",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Lọc theo giá
                </div>
                <div>
                  <Radio.Group
                    onChange={onChangeFilter}
                    value={value}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      padding: "16px",
                    }}
                  >
                    <Radio value={1}>Tất cả</Radio>
                    <Radio value={2}>Dưới 2 triệu</Radio>
                    <Radio value={4}>Từ 2 triệu - 4 triệu</Radio>
                    <Radio value={6}>Từ 4 triệu - 6 triệu</Radio>
                    <Radio value={8}>Từ 6 triệu - 8 triệu</Radio>
                    <Radio value={10}>Từ 8 triệu - 10 triệu</Radio>
                    <Radio value={12}>Trên 10 triệu</Radio>
                  </Radio.Group>
                </div>
              </div>
            </div>
          </WrapperSideBar>
          <WrapperRight className="body">
            <div
              id="container"
              style={{ width: "100%", margin: "0 auto", height: "100%" }}
            >
              <WrapperProducts>
                {state?.stateData
                  ? state?.stateData?.map((product) => {
                      return (
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
                    })
                  : products
                      ?.filter((pro) => {
                        if (filter === false) {
                          if (searchDebounce === "") {
                            return pro;
                          } else if (
                            pro?.name
                              ?.toLowerCase()
                              ?.includes(searchDebounce?.toLowerCase())
                          ) {
                            return pro;
                          }
                        } else {
                          if (
                            searchDebounce === "" &&
                            value > 1 &&
                            pro.price >=
                              LIST_PRICE?.find((item) => item.label === value)
                                ?.value.min &&
                            pro.price <=
                              LIST_PRICE?.find((item) => item.label === value)
                                ?.value.max
                          ) {
                            return pro;
                          } else if (
                            pro?.name
                              ?.toLowerCase()
                              ?.includes(searchDebounce?.toLowerCase()) &&
                            pro.price >=
                              LIST_PRICE?.find((item) => item.label === value)
                                ?.value.min &&
                            pro.price <=
                              LIST_PRICE?.find((item) => item.label === value)
                                ?.value.max
                          ) {
                            return pro;
                          }
                        }
                      })
                      ?.map((product) => {
                        return (
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
                <WrapperPanigation
                  defaultCurrent={panigate.page + 1}
                  total={(products?.length / 6) * 10}
                  style={{ margin: "20px 0" }}
                  onChange={onChange}
                />
              </div>
            </div>
          </WrapperRight>
        </WrapperBody>
      </WrapperAll>
    </Loading>
  );
};

export default TypeProductPage;
