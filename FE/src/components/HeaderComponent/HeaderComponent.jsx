import { Badge, Col, Dropdown, Menu, Popover, Space, message } from "antd";
import {
  WrapperHeader,
  WrapperHeaderAccount,
  WrapperTextHeader,
  WrapperTextHeaderSmall,
  WrapperCartHeader,
  WrapperContentPopover,
  WrapperImgAvatar,
  WrapperButtonDropdown,
  WrapperMenuItem,
  WrapperColMenu,
  WrapperHeaderMobile,
} from "./style";
import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
  AudioOutlined,
  AudioMutedOutlined,
  SearchOutlined,
  DownOutlined,
  MenuOutlined,
  MailOutlined,
} from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useLocation, useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slides/userSlide";
import Loading from "../Loading/Loading";
import { searchProduct } from "../../redux/slides/productSlide";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import { typeProductContant } from "../../contant";
import TypeProduct from "../TypeProduct/TypeProduct";
import logo from "../../assets/images/logo-watch.png";

const HeaderComPonent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const [typeProduct, setTypeProduct] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const { id } = useParams();
  const [productOfType, setProductOfType] = useState([]);
  const [addCartHeader, setAddCartHeader] = useState(false);
  const { state } = useLocation();
  const location = useLocation();
  const openMic = location.state?.openMic || false;

  const path = window.location.pathname;
  const segments = path.split("/");
  const adminPath = segments.pop();

  const fetchAllProduct = async () => {
    const res = await ProductService.getAllProduct("", 100);
    return res.data;
  };

  const queryProduct = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProduct,
  });

  const { isLoading: isLoadingProducts, data: products } = queryProduct;

  const fetchAllProductType = async (type, page, limit) => {
    setLoading(true);
    const res = await ProductService.getProductType(type, page, limit);
    if (res?.status === "OK") {
      setLoading(false);
      setProductOfType(res?.data);
      // setPanigate({...panigate,total: res?.totalPage})
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProductType(state, 0, 100);
  }, [state]);

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    setTypeProduct(res.data);
  };
  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };

  const handleLogout = async () => {
    setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    setUsername(user?.name);
    setUserAvatar(user?.avatar);
    setLoading(false);
  }, [user?.name, user?.avatar]);
  const content = (
    <div>
      <WrapperContentPopover onClick={() => navigate("/profile-user")}>
        Thông tin người dùng
      </WrapperContentPopover>
      {user?.isAdmin && (
        <WrapperContentPopover onClick={() => navigate("/system/admin")}>
          Quản lý hệ thống
        </WrapperContentPopover>
      )}
      <WrapperContentPopover
        onClick={() =>
          navigate("/my-order", {
            state: {
              id: user?.id,
              token: user?.access_token,
            },
          })
        }
      >
        Đơn hàng của tôi
      </WrapperContentPopover>
      <WrapperContentPopover onClick={handleLogout}>
        Đăng xuất
      </WrapperContentPopover>
    </div>
  );

  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };

  useEffect(() => {
    // Lắng nghe sự kiện scroll
    const handleScroll = () => {
      // Kiểm tra vị trí scroll và cập nhật trạng thái
      setIsScrolled(window.scrollY > 50);
    };

    // Đăng ký sự kiện scroll
    window.addEventListener("scroll", handleScroll);

    // Hủy đăng ký sự kiện khi component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // useEffect chỉ chạy một lần sau khi component được render

  const getArrProductByText = async (str) => {
    const text = str.toLowerCase();
    const arr = [];
    if (products && Array.isArray(products)) {
      await products
        .filter(
          (product) =>
            product.name.toLowerCase() === text ||
            product.name.toLowerCase().includes(text)
        )
        .map((item) => {
          arr.push(item);
        });
      return arr?.length ? arr : [];
    } else {
      console.error(
        "productOfType is undefined or not an array",
        productOfType
      );
      return undefined;
    }
  };

  const getChecked = (num) => {
    const id = order?.orderItems[num - 1]?.product;
    return id;
  };

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const items = [
    {
      label: (
        <WrapperMenuItem
          className="news"
          style={{ color: "black" }}
          onClick={() => navigate("/")}
        >
          Trang chủ
        </WrapperMenuItem>
      ),
      key: "0",
    },
    {
      label: (
        <WrapperMenuItem
          className="news"
          style={{ color: "black" }}
          onClick={() => navigate("/order")}
        >
          Giỏ hàng
        </WrapperMenuItem>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <WrapperButtonDropdown className="dropdown">
          <button
            style={{
              background: "none",
              color: "black",
              border: "none",
              fontFamily: "math",
              fontWeight: "bold",
            }}
          >
            Danh mục
          </button>
          <div>
            {typeProductContant?.map(
              (type, index) =>
                typeProduct.includes(type.type) && (
                  <div key={index}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0 20px",
                        color: "#000",
                      }}
                    >
                      <img
                        style={{ width: "20px", height: "20px" }}
                        src={type.image}
                      />
                      <TypeProduct
                        name={type.type}
                        key={type.type}
                        style={{ color: "#000" }}
                      />
                    </div>
                  </div>
                )
            )}
            {typeProduct.map((type) => {
              if (!typeProductContant.some((item) => item.type === type)) {
                return (
                  <div key={type}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0 20px",
                        color: "#000",
                      }}
                    >
                      <TypeProduct
                        name={type}
                        key={type}
                        style={{ color: "#000" }}
                      />
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </WrapperButtonDropdown>
      ),
      key: "2",
    },
    {
      type: "divider",
    },
    {
      label: (
        <WrapperMenuItem
          className="news"
          style={{ color: "black" }}
          onClick={() => navigate("/blog")}
        >
          Tin tức
        </WrapperMenuItem>
      ),
      key: "3",
    },

    {
      label: (
        <WrapperMenuItem
          className="trendingProducts"
          style={{ color: "black" }}
          onClick={() => navigate("/productsTrending")}
        >
          Gợi ý sản phẩm
        </WrapperMenuItem>
      ),
      key: "4",
    },
    {
      label: (
        <WrapperMenuItem
          className=""
          style={{ color: "black" }}
          onClick={() => navigate("/contact")}
        >
          Liên hệ
        </WrapperMenuItem>
      ),
      key: "5",
    },
  ];
  return (
    <>
      <div
        style={{
          width: "100%",
          background: isScrolled
            ? "rgb(255,255,255,0.6)"
            : adminPath === "admin"
            ? "none"
            : "#fff",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          padding: isScrolled ? "10px 30px" : "20px 30px",
          position: isScrolled ? "fixed" : "",
          zIndex: "10",
          transition: "all 0.5s",
        }}
      >
        <WrapperHeader
          gutter={16}
          style={{
            justifyContent:
              isHiddenSearch && isHiddenCart ? "space-between" : "unset",
            marginRight: "0",
            marginLeft: "0",
          }}
        >
          <Col
            span={5}
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              padding: "0",
            }}
          >
            <WrapperTextHeader
              style={{
                cursor: "pointer",
                color: isScrolled ? "#fff" : "#fff",
              }}
              onClick={() => navigate("/")}
            >
              <img
                style={{
                  height: "65px",
                  position: "absolute",
                  top: "-30px",
                }}
                src={logo}
              />
            </WrapperTextHeader>

            {/* <span style={{cursor:"pointer", fontSize:"20px", color:"#fff", display:"flex"}} onClick={stopListening}><AudioMutedOutlined /> </span> */}
          </Col>
          {!isHiddenSearch && (
            <WrapperColMenu span={13}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    display: "flex",
                    gap: "50px",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff",
                    padding: "10px 0",
                    fontWeight: "bold",
                    fontFamily: "math",
                  }}
                >
                  <WrapperButtonDropdown className="dropdown">
                    <button
                      className="buttonmenu"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{
                        background: "none",
                        color: isScrolled ? "black" : "#000",
                        border: "none",
                        fontFamily: "math",
                        fontWeight: "bold",
                      }}
                    >
                      Danh mục
                    </button>
                    <ul
                      className="dropdown-menu menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      {typeProductContant?.map(
                        (type, index) =>
                          typeProduct.includes(type.type) && (
                            <li key={index}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  padding: "0 20px",
                                  color: "#000",
                                }}
                              >
                                <img
                                  style={{ width: "20px", height: "20px" }}
                                  src={type.image}
                                />
                                <TypeProduct
                                  name={type.type}
                                  key={type.type}
                                  style={{ color: "#000" }}
                                />
                              </div>
                            </li>
                          )
                      )}
                      {typeProduct.map((type) => {
                        if (
                          !typeProductContant.some((item) => item.type === type)
                        ) {
                          return (
                            <li key={type}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  padding: "0 20px",
                                  color: "#000",
                                }}
                              >
                                <TypeProduct
                                  name={type}
                                  key={type}
                                  style={{ color: "#000" }}
                                />
                              </div>
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </WrapperButtonDropdown>
                  <WrapperMenuItem
                    className="news"
                    style={{ color: isScrolled ? "black" : "#000" }}
                    onClick={() => navigate("/blog")}
                  >
                    Tin tức
                  </WrapperMenuItem>
                  <WrapperMenuItem
                    className="trendingProducts"
                    style={{ color: isScrolled ? "black" : "#000" }}
                    onClick={() => navigate("/productsTrending")}
                  >
                    Gợi ý sản phẩm
                  </WrapperMenuItem>
                  <WrapperMenuItem
                    className=""
                    style={{ color: isScrolled ? "black" : "#000" }}
                    onClick={() => navigate("/contact")}
                  >
                    Liên hệ
                  </WrapperMenuItem>
                </div>

                <div className="dropdown">
                  <button
                    className="btn btn-secondary "
                    style={{ background: "none", border: "none" }}
                    type="button"
                    id="dropdownMenu2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <SearchOutlined
                      style={{ color: isScrolled ? "black" : "#000" }}
                    />
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenu2"
                    style={{ transform: "translate(0px, 50px)" }}
                  >
                    <ButtonInputSearch
                      placeholder="input search text"
                      size="large"
                      // textButton ="Tìm kiếm"
                      // bordered={false}
                      backgroundColorInput="#fff"
                      borderRadius="0px"
                      border="none"
                      backgroundColorButton="none"
                      width="300px"
                      colorButton="#000"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      onChange={onSearch}
                    />
                  </ul>
                </div>
              </div>
            </WrapperColMenu>
          )}
          <Col
            span={6}
            style={{
              display: "flex",
              gap: "54px",
              alignItems: "center",
              flex: "0 0 20%",
            }}
          >
            <Loading isLoading={loading}>
              <WrapperHeaderAccount>
                {user?.avatar ? (
                  <WrapperImgAvatar src={userAvatar} alt="avatar" />
                ) : (
                  <UserOutlined style={{ fontSize: "30px", color: "#000" }} />
                )}
                {user?.access_token ? (
                  <>
                    <Popover content={content} trigger="click">
                      <div
                        style={{
                          cursor: "pointer",
                          color: isScrolled
                            ? "black"
                            : adminPath === "admin"
                            ? "#000"
                            : "#000",
                        }}
                      >
                        {username?.length ? username : "User"}
                      </div>
                    </Popover>
                  </>
                ) : (
                  <div
                    onClick={handleNavigateLogin}
                    style={{ cursor: "pointer" }}
                  >
                    <WrapperTextHeaderSmall>
                      Đăng nhập / Đăng ký
                    </WrapperTextHeaderSmall>
                    <div>
                      <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                      <CaretDownOutlined />
                    </div>
                  </div>
                )}
              </WrapperHeaderAccount>
            </Loading>
            {!isHiddenCart && (
              <div>
                <WrapperCartHeader onClick={() => navigate("/order")}>
                  <Badge count={order?.orderItems?.length}>
                    <ShoppingCartOutlined
                      style={{
                        fontSize: "30px",
                        color: isScrolled ? "black" : "#000",
                      }}
                    />
                  </Badge>
                  <WrapperTextHeaderSmall
                    style={{ color: isScrolled ? "black" : "#000" }}
                  >
                    Giỏ hàng
                  </WrapperTextHeaderSmall>
                </WrapperCartHeader>
              </div>
            )}
          </Col>
        </WrapperHeader>

        {/* header mobile */}
        <WrapperHeaderMobile>
          <div style={{ display: "flex", gap: "20px" }}>
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <MenuOutlined
                    style={{
                      fontSize: "20px",
                      color: isScrolled ? "#000" : "#fff",
                    }}
                  />
                </Space>
              </a>
            </Dropdown>
          </div>
          <div style={{ display: "flex" }}>
            <div className="dropdown">
              <button
                className="btn btn-secondary "
                style={{ background: "none", border: "none" }}
                type="button"
                id="dropdownMenu2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <SearchOutlined
                  style={{ color: isScrolled ? "black" : "#fff" }}
                />
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenu2"
                style={{ transform: "translate(0px, 50px)" }}
              >
                <ButtonInputSearch
                  placeholder="input search text"
                  size="large"
                  // textButton ="Tìm kiếm"
                  // bordered={false}
                  backgroundColorInput="#fff"
                  borderRadius="0px"
                  border="none"
                  backgroundColorButton="none"
                  width="300px"
                  colorButton="#000"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  onChange={onSearch}
                />
              </ul>
            </div>
            <WrapperHeaderAccount>
              {user?.avatar ? (
                <WrapperImgAvatar src={userAvatar} alt="avatar" />
              ) : (
                <UserOutlined style={{ fontSize: "30px" }} />
              )}
              {user?.access_token ? (
                <>
                  <Popover content={content} trigger="click">
                    <div
                      style={{
                        cursor: "pointer",
                        color: isScrolled
                          ? "black"
                          : adminPath === "admin"
                          ? "#000"
                          : "#fff",
                      }}
                    >
                      {username?.length ? username : "User"}
                    </div>
                  </Popover>
                </>
              ) : (
                <div
                  onClick={handleNavigateLogin}
                  style={{ cursor: "pointer" }}
                >
                  <WrapperTextHeaderSmall>
                    Đăng nhập / Đăng ký
                  </WrapperTextHeaderSmall>
                  <div>
                    <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                    <CaretDownOutlined />
                  </div>
                </div>
              )}
            </WrapperHeaderAccount>
          </div>
        </WrapperHeaderMobile>
      </div>
    </>
  );
};

export default HeaderComPonent;
