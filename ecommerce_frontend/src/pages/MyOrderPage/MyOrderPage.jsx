
import { useLocation, useNavigate } from "react-router";
import { WrapperInfo, WrapperInputNumber, WrapperLeft, WrapperProductsOrder, WrapperRight } from "./style";
import { useDispatch, useSelector } from "react-redux";
import * as OrderService from "../../services/OrderService"
import StepComponent from "../../components/StepComponent/StepComponent";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useMutationHook } from "../../hooks/useMutationHook";
import { useEffect } from "react";
import { message } from "antd";

const MyOrderPage =()=> {
   
    //  const order = useSelector((state)=> state.order)
     const user = useSelector((state)=> state.user)
     const dispatch = useDispatch()
    const location =useLocation()
    console.log("location",location)
    const {state}= useLocation()
    console.log("state",state)
     console.log("user",user)
    const navigate = useNavigate()

    const fetchMyOrder = async()=>{
      const res = await OrderService.getOrderByUserId(state?.id, state?.token)
      return res.data
    }

    const queryOrder =useQuery({queryKey:['orders'], queryFn: fetchMyOrder})
    const { isLoading, data } = queryOrder

    console.log("dataOrder",data)
    const handleSeeDetailsOrder =(id)=>{
      navigate(`/order-details/${id}`,{state:{id}})
    }

    const mutation = useMutationHook(
      (data)=>{
        const {id, token, orderItems, userId} = data
        const res = OrderService.cancelOrder(id, token, orderItems,userId)
        return res
      }
    )

    const handleCancelOrder = async (order)=>{
      console.log("orderCancle", order?.orderItems)
      if(!order?.isConfirm && !order?.isPaid){
        mutation.mutate({id: order?._id,token: state?.token, orderItems: order?.orderItems, userId: user?.id},{
          onSuccess:()=>{
            queryOrder.refetch()
          }
        })
      }
      else{
        if(order?.isConfirm){
          message.error("Không thể hủy đơn hàng do đã được xác nhận")
        }
        else{
          message.error("Không thể hủy đơn hàng do đã thanh toán")
        }
      }
    }

    const {isLoading: isLoadingCancel, isSuccess: isSuccessCancel, isError: isErrorCancel, data: dataCancel} = mutation
    console.log("dataCa",dataCancel)

    useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === 'OK') {
      message.success("Hủy đơn hàng thành công")
    } else if(isSuccessCancel && dataCancel?.status === 'ERR') {
      message.error(dataCancel?.message)
    }else if (isErrorCancel) {
      message.error("Hủy đơn hàng không thành công")
    }
  }, [isErrorCancel, isSuccessCancel])

    return ( 
      //  <Loading isLoading={isLoading} >
      <div style={{width:"100%", background:"rgb(239, 239, 239)"}}>
      <div style={{width:"1270px",margin:"0 auto"}}>
        {/* <div>Đơn hàng của tôi</div> */}

        {data?.length > 0 ? (
  data?.map((order) => {
    return (
      <div style={{ width: "1000px", margin: "0 auto", background: "#fff", padding: "15px", borderRadius: "10px", marginBottom: "10px" }}>
        <div style={{ borderBottom: "1px solid #ccc", padding: "15px 0" }}>
          <span>Trạng thái</span>
          <div>
            <span style={{ color: "red" }}>Xác nhận đơn hàng: </span>{order?.isConfirm ? "Đã xác nhận" : "Chưa xác nhận"}
          </div>
          <div>
            <span style={{ color: "red" }}>Giao hàng: </span>{order?.isDelivered ? "Đã vận chuyển" : "Chưa vận chuyển"}
          </div>
          <div>
            <span style={{ color: "red" }}>Thanh toán: </span>{order?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
          </div>
        </div>

        <WrapperProductsOrder>
          {order?.orderItems.map((item) => {
            return (
              <div style={{ display: "flex", width: "100%", gap: "20px", margin: "10px 0" }}>
                <span style={{ width: "330px", display: "flex", alignItems: "center" }}>
                  <img style={{ width: "80px", height: "80px", paddingLeft: "5px" }} src={item?.image} alt={item?.name} />
                  <span style={{ padding: "0px 5px", overflow: "hidden", textOverflow: "ellipsis" }}> {item?.name}</span>
                </span>
                <div style={{ flex: "1", display: "flex", justifyContent: "end", alignItems: "center" }}>
                  <span style={{ color: "red" }}>Giá tiền: {(item?.price)?.toLocaleString()} VND</span>
                </div>
              </div>
            );
          })}
        </WrapperProductsOrder>

        <div>
          Tổng tiền :<span style={{ fontWeight: "bold", color: "red" }}> {(order?.totalPrice)?.toLocaleString()} VND</span>
        </div>
        <div style={{ display: "flex", justifyContent: "end", gap: "10px", borderTop: "1px solid #ccc", padding: "15px" }}>
          <ButtonComponent textButton={"Hủy đơn hàng"} onClick={() => handleCancelOrder(order)} style={{display: order?.isReceived ===true ? "none" :"block"}}/>
          <ButtonComponent textButton={"Xem chi tiết"} onClick={() => handleSeeDetailsOrder(order?._id)} />
        </div>
      </div>
    );
  })
) : (
  <div style={{textAlign:"center", display:"flex" , margin:"0 auto",justifyContent:"center", alignItems:"center",width:"100%", background:"#fff", marginTop:"40px"}}>Không có đơn hàng</div>
)}
    
      </div>
      </div>
      
      //  </Loading>
     );
}

export default MyOrderPage;