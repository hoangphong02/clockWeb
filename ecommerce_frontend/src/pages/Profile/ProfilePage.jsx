
import React, { useEffect, useState } from 'react'
import { WrapperAvatar, WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService'
import { useMutationHook } from '../../hooks/useMutationHook';
import Loading from '../../components/Loading/Loading';
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/userSlide'
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getBase64 } from '../../utils';

function ProfilePage() {
  const user = useSelector((state)=> state.user)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
 
  const mutation = useMutationHook(
    (data) =>{
      const {id, access_token,...rests} = data
      UserService.updateUser(id,rests,access_token)
    }
      
  )
  const dispatch =useDispatch();
  const {data, isSuccess, isLoading, isError} = mutation
  useEffect(()=>{
    setName(user?.name)
    setEmail(user?.email)
    setPhone(user?.phone)
    setAddress(user?.address)
    setAvatar(user?.avatar)
  },[user])
 
 useEffect(()=>{
  if(isSuccess){
    message.success()
    handleGetDetailsUser(user?.id, user?.access_token)
   }
   else if(isError){
    message.error()
   }
 },[isSuccess,isError])

 const handleGetDetailsUser = async (id, token)=>{
  // const res = await UserService.getDetailUser(id,token)
  // dispatch(updateUser({...res?.data,access_token: token}))
  const storage = localStorage.getItem('refresh_token')
const refreshToken = JSON.parse(storage)
const res = await UserService.getDetailUser(id, token)
dispatch(updateUser({ ...res?.data, access_token: token,refreshToken }))
}

  const handleOnchangeName =(value)=>{
    setName(value)
  }
  const handleOnchangeEmail =(value)=>{
    setEmail(value)
  }
  const handleOnchangePhone =(value)=>{
    setPhone(value)
  }
  const handleOnchangeAddress =(value)=>{
    setAddress(value)
  }
  const handleOnchangeAvatar = async ({fileList})=>{
    const file =fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj );
    }
    setAvatar(file.preview)
  }
  const handleUpdate =()=>{
    mutation.mutate({ id: user?.id, email, name, phone, address, avatar, access_token: user?.access_token })
  
  }
  return (
    <div style={{width:'1270px', margin:' 0 auto'}}>
        <WrapperHeader>Thông tin người dùng</WrapperHeader>
        <Loading isLoading={isLoading}>
        <WrapperContentProfile>
          <WrapperInput>
          <WrapperLabel htmlFor='name'>
            Name
          </WrapperLabel>
        <InputForm style={{width:'300px'}} id="name" value={name} onChange={handleOnchangeName} />
        <ButtonComponent        
          //  disabled={!email.length || !password.length}
          onClick={handleUpdate}
             size={20} 
             style={{ borderRadius: "4px", border: "1px solid #rgb(26, 148, 255) ", height:"35px", width:"fit-content", fontSize:"15px"}}
             textButton={"Cập nhật"}
            styleTextButton={{color: "#rgb(26, 148, 255)"}}
        ></ButtonComponent>
          </WrapperInput>
          <WrapperInput>
          <WrapperLabel htmlFor='email'>
            Email
          </WrapperLabel>
        <InputForm style={{width:'300px'}} id="email" value={email} onChange={handleOnchangeEmail} />
        <ButtonComponent        
          //  disabled={!email.length || !password.length}
          onClick={handleUpdate}
             size={20} 
             style={{ borderRadius: "4px", border: "1px solid #rgb(26, 148, 255) ", height:"35px", width:"fit-content", fontSize:"15px"}}
             textButton={"Cập nhật"}
            styleTextButton={{color: "#rgb(26, 148, 255)"}}
        ></ButtonComponent>
          </WrapperInput>
          <WrapperInput>
          <WrapperLabel htmlFor='phone'>
            Phone
          </WrapperLabel>
        <InputForm style={{width:'300px'}} id="phone" value={phone} onChange={handleOnchangePhone} />
        <ButtonComponent        
          //  disabled={!email.length || !password.length}
          onClick={handleUpdate}
             size={20} 
             style={{ borderRadius: "4px", border: "1px solid #rgb(26, 148, 255) ", height:"35px", width:"fit-content", fontSize:"15px"}}
             textButton={"Cập nhật"}
            styleTextButton={{color: "#rgb(26, 148, 255)"}}
        ></ButtonComponent>
          </WrapperInput>
          <WrapperInput>
          <WrapperLabel htmlFor='address'>
            Address
          </WrapperLabel>
        <InputForm style={{width:'300px'}} id="address" value={address} onChange={handleOnchangeAddress} />
        <ButtonComponent        
          //  disabled={!email.length || !password.length}
          onClick={handleUpdate}
             size={20} 
             style={{ borderRadius: "4px", border: "1px solid #rgb(26, 148, 255) ", height:"35px", width:"fit-content", fontSize:"15px"}}
             textButton={"Cập nhật"}
            styleTextButton={{color: "#rgb(26, 148, 255)"}}
        ></ButtonComponent>
          </WrapperInput>
          <WrapperInput>
          <WrapperLabel htmlFor='avatar'>
            Avatar 
          </WrapperLabel>
          <WrapperAvatar onChange={handleOnchangeAvatar} maxCount={1}>
          <Button icon={<UploadOutlined />}>Upload</Button>
          </WrapperAvatar>
          {avatar && (
            <img src={avatar} style={{height:"60px", width:"60px", borderRadius:"50%", objectFit:"cover"}} alt='avatar' />
          )}
        {/* <InputForm style={{width:'300px'}} id="avatar" value={avatar} onChange={handleOnchangeAvatar} /> */}
        <ButtonComponent        
          //  disabled={!email.length || !password.length}
          onClick={handleUpdate}
             size={20} 
             style={{ borderRadius: "4px", border: "1px solid #rgb(26, 148, 255) ", height:"35px", width:"fit-content", fontSize:"15px"}}
             textButton={"Cập nhật"}
            styleTextButton={{color: "#rgb(26, 148, 255)"}}
        ></ButtonComponent>
          </WrapperInput>
        </WrapperContentProfile>
        </Loading>
    </div>
  )
}

export default ProfilePage