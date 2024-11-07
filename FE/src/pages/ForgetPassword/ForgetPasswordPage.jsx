import React, { useEffect } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperForm, WrapperModal, WrapperTextLight } from './style'
import { useState } from 'react'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { Image, Input, Modal } from 'antd'
import imageLogo from "../../assets/images/login.png"
import logotet from "../../assets/images/logotet.png"
import {useLocation, useNavigate } from 'react-router'
import * as OtpService from '../../services/OtpService'
import { useMutationHook } from '../../hooks/useMutationHook'
import Loading from '../../components/Loading/Loading'
import * as message from '../../components/Message/Message'
import jwt_decode from "jwt-decode";
import {useDispatch} from "react-redux"
import { updateUser } from '../../redux/slides/userSlide'

const ForgetPasswordPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otpSent,setOtpSent ] = useState("")
  const dispatch =useDispatch();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [valueInput1, setValueInput1]= useState("")
   const [valueInput2, setValueInput2]= useState("")
   const [valueInput3, setValueInput3]= useState("")
   const [valueInput4, setValueInput4]= useState("")
   const [valueInput5, setValueInput5]= useState("")
   const [valueInput6, setValueInput6]= useState("")


  const handleNavigateSignIn=()=>{
    navigate('/sign-in')
  }
  const mutation = useMutationHook(
    (data) => OtpService.createOtp(data)
  )
  const {data, isLoading, isSuccess} = mutation

  const mutationDeleteOtp = useMutationHook(
     (data) => OtpService.deleteOtp(data)
    )
  const onDeleteOtp = () => {
      mutationDeleteOtp.mutate({otp: otpSent })
    }

  const handleOnchangeEmail = (value)=>{
    setEmail(value)
  }
 
  const handleSendOtp=()=>{
    const otp = Math.floor(100000 + Math.random() * 900000);
    setOtpSent(otp)
      mutation.mutate({
        email,
        otp,
      })
      setIsModalOpen(true)
    
  }
  const checkOTP = ()=>{
    const data = [valueInput1,valueInput2,valueInput3,valueInput4,valueInput5,valueInput6]
    let value = data.join("")
     if(Number(value) === otpSent){
      message.success()
      onDeleteOtp()
    setIsModalOpen(false);
    navigate(`/create-newPassword`,{state : email})
    }
    else{
      message.error("OTP không đúng")
    }
  }

   const handleOk = () => {
   checkOTP()
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChangeInput1 =(e)=>{
    setValueInput1(e.target.value)
  }
   const onChangeInput2 =(e)=>{
    setValueInput2(e.target.value)
  }
   const onChangeInput3 =(e)=>{
    setValueInput3(e.target.value)
  }
   const onChangeInput4 =(e)=>{
    setValueInput4(e.target.value)
  }
   const onChangeInput5 =(e)=>{
    setValueInput5(e.target.value)
  }
   const onChangeInput6 =(e)=>{
    setValueInput6(e.target.value)
  }



  return (
    <div style={{display:"flex", alignItems: "center",justifyContent:"center", background:"#efefef", height:"100vh"}}>
    <div style={{width:"800px", height:"445px",background:"#fff", borderRadius:"20px", display:"flex"}}>
      <WrapperContainerLeft>
        <h4 style={{margin: "0px 0px 10px",fontSize: "24px",fontWeight: "500"}}>Xin chào</h4>
        <p>
          Quên mật khẩu
        </p>
        <InputForm  placeholder="Nhập email" style={{marginBottom: "10px"}} value={email} onChange={handleOnchangeEmail} />

       
        {data?.status==="ERR" && <span style={{color:"red", fontSize:"13px", padding:"10px 0"}}>{data?.message}</span>}
        <Loading isLoading={isLoading}>    
        <ButtonComponent        
           disabled={!email.length}
          onClick={handleSendOtp}
             size={20} 
             style={{background: "rgb(255, 66, 78)", borderRadius: "4px", border: "none", height:"48px", width:"100%", fontSize:"15px",margin: "30px 0px 10px"}}
             textButton={"Gửi OTP"}
              styleTextButton={{color: "#fff"}}
        ></ButtonComponent>
        </Loading>
        <p>Đã có tài khoản? <WrapperTextLight onClick={handleNavigateSignIn}>Đăng nhập</WrapperTextLight></p>
      </WrapperContainerLeft>
      <WrapperContainerRight >
        <Image src={logotet} preview={false} alt='image logo' style={{width:"250px", height:"250px"}}/>
        <div style={{margin: "30px 0px 0px", textAlign: "center"}}>
          <h4 style={{margin: "0px 0px 5px",color:"rgb(255,255,255)",fontSize:" 17px",fontWeight: "500"}}>Mua sắm tại Decoration Shop</h4>
          <span style={{fontSize: "13px",color: "rgb(255,255,255)",fontWeight: "500",}}>Siêu ưu đãi mỗi ngày</span>
        </div>
      </WrapperContainerRight>

        <WrapperModal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
        <WrapperForm className="form">
           <div className="title">OTP</div> 
           <div className="title">Verification Code</div> 
           <p className="message">We have sent a verification code to your mobile number</p>
            <div className="inputs"> 
            <input id="input1" type="text" maxlength="1" onChange={onChangeInput1}/>
            <input id="input2" type="text" maxlength="1" onChange={onChangeInput2}/>
            <input id="input3" type="text" maxlength="1" onChange={onChangeInput3}/>
            <input id="input4" type="text" maxlength="1" onChange={onChangeInput4}/>
            <input id="input5" type="text" maxlength="1" onChange={onChangeInput5}/>
            <input id="input6" type="text" maxlength="1" onChange={onChangeInput6}/>
             </div> 
            </WrapperForm>
      </WrapperModal>
    </div>
    </div>
  )
}

export default ForgetPasswordPage