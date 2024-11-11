import { useLocation, useNavigate } from "react-router";
import {
  WrapperDetailOrder,
  WrapperDetails,
  WrapperInfoDetails,
  WrapperListMethodOrder,
  WrapperListProductOrder,
  WrapperProductsOrder,
} from "./style";
import { useSelector } from "react-redux";
import * as OrderService from "../../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";
import { useMemo } from "react";
import { HomeFilled, PhoneFilled } from "@ant-design/icons";

const MyOrderPage = () => {
  //  const order = useSelector((state)=> state.order)
  const user = useSelector((state) => state.user);
  const { state } = useLocation();
  const navigate = useNavigate();

  const fetchMyDetailsOrder = async () => {
    const res = await OrderService.getDetailOrder(state?.id, state?.token);
    return res.data;
  };

  const queryOrder = useQuery({
    queryKey: ["orders-details"],
    queryFn: fetchMyDetailsOrder,
  });
  const { isLoading, data } = queryOrder;

  const priceMemo = useMemo(() => {
    const result = data?.orderItems?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [data]);
  return (
    <Loading isLoading={isLoading}>
      <div style={{ width: "100%", background: "rgb(239, 239, 239)" }}>
        <WrapperDetailOrder>
          <div style={{ fontWeight: "bold", padding: "12px 0" }}>
            <span
              style={{ cursor: "pointer", padding: "12px 0" }}
              onClick={() =>
                navigate("/my-order", {
                  state: {
                    id: user?.id,
                    token: user?.access_token,
                  },
                })
              }
            >
              {" "}
              Đơn hàng
            </span>{" "}
            - Chi tiết đơn hàng
          </div>

          <WrapperListProductOrder>
            <div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "8px",
                }}
              >
                <span>
                  <strong>Tên người nhận:</strong>{" "}
                  {data?.shippingAddress?.fullName}
                </span>
                <span>
                  <strong>Địa chỉ:</strong>{" "}
                  {`${data?.shippingAddress?.address}-${data?.shippingAddress?.city}`}
                </span>
                <span>
                  <strong>Số điện thoại: </strong>
                  {data?.shippingAddress?.phone}
                </span>
                <span>
                  <strong>Hình thức giao hàng: </strong> {data?.paymentMethod}
                </span>
                <span>
                  <strong>Trạng thái:</strong>{" "}
                  {data?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                </span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "50px",
                padding: "10px 10px",
                background: "#fff",
                margin: "0 0 10px 0",
              }}
            >
              <span style={{ width: "250px" }}>
                <span>
                  Tất cả (<span>{data?.orderItems?.length}</span> sản phẩm )
                </span>
              </span>
              <div
                style={{
                  flex: "1",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Giảm giá</span>
              </div>
            </div>

            <WrapperProductsOrder>
              {data?.orderItems.map((item) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      gap: "20px",
                      margin: "10px 0",
                    }}
                  >
                    <span
                      style={{
                        width: "270px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <img
                        style={{
                          width: "80px",
                          height: "80px",
                          paddingLeft: "5px",
                        }}
                        alt=""
                        src={item?.image}
                      ></img>
                      <span
                        style={{
                          padding: "0px 5px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {" "}
                        {item?.name}
                      </span>
                    </span>
                    <div
                      style={{
                        flex: "1",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span>{item?.price?.toLocaleString()} VND</span>
                      <span>{item?.amount}</span>
                      <span style={{ color: "red" }}>
                        {(
                          (item?.price * item?.amount * item?.discount) /
                          100
                        ).toLocaleString()}{" "}
                        VND
                      </span>
                    </div>
                  </div>
                );
              })}
            </WrapperProductsOrder>
            <div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <div>
                  Tạm tính :{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {priceMemo?.toLocaleString()} VND
                  </span>{" "}
                </div>
                <div>
                  Phí vận chuyển :
                  <span style={{ fontWeight: "bold" }}>
                    {" "}
                    {data?.shippingPrice?.toLocaleString()} VND
                  </span>{" "}
                </div>
                <div>
                  Tổng tiền :
                  <span style={{ fontWeight: "bold", color: "red" }}>
                    {" "}
                    {data?.totalPrice?.toLocaleString()} VND
                  </span>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                gap: "10px",
                padding: "15px",
              }}
            >
              {/* <ButtonComponent textButton={"Hủy đơn hàng"}/>                */}
              {/* <ButtonComponent textButton={"Xem chi tiết"}/> */}
            </div>
          </WrapperListProductOrder>
        </WrapperDetailOrder>
      </div>
    </Loading>
  );
};

export default MyOrderPage;
