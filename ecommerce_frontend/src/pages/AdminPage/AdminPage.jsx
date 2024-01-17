import { Menu } from 'antd'
import React, { useState } from 'react'
import { getItem } from '../../utils';
import { AppstoreOutlined, ContactsOutlined, DashboardOutlined, FileImageOutlined, MailOutlined, SettingOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import HeaderComPonent from '../../components/HeaderComponent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import AdminOrder from '../../components/AdminOrder/AdminOrder';
import AdminContact from '../../components/AdminContact/AdminContact';
import AdminDashboard from '../../components/AdminDashboard/AdminDashboard';
import AdminSlider from '../../components/AdminSlider/AdminSlider';


const AdminPage = () => {
  const items = [
     getItem('Dashboard', 'home', <DashboardOutlined />),
    getItem('Người dùng', 'user', <UserOutlined />),
    getItem('Sản phẩm', 'product', <AppstoreOutlined /> ),
    getItem('Đơn hàng', 'orders', <ShoppingCartOutlined /> ),
    getItem('Liên hệ', 'contact', <ContactsOutlined />  ),
    getItem('Slider', 'slider', <FileImageOutlined />  ),


    // getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    //   // getItem('Option 9', '9'),
    //   // getItem('Option 10', '10'),
    //   // getItem('Option 11', '11'),
    //   // getItem('Option 12', '12'),
    // ]),
  ];

  const [keySelected, setKeySelected] = useState('')
  const renderPage = (key)=>{
    switch(key){
      case 'home':
        return (<AdminDashboard/>)
      case 'user':
        return (<AdminUser/>)
      case 'product':
          return (<AdminProduct/>)
      case 'orders':
        return (<AdminOrder/>)
      case 'contact':
        return (<AdminContact/>)
      case 'slider':
        return (<AdminSlider/>)
        default:
          return <></>
    }
  
  }

  const handleOnclick=({key})=>{
    setKeySelected(key)
  }
  console.log("setKeySelected",keySelected)
  return (
    <>
    <HeaderComPonent isHiddenSearch isHiddenCart />
    <div style={{display:"flex"}}>
    <Menu
    mode="inline"
    style={{
      width: 256,
      boxShadow: '1px 1px 2px #ccc',
      minHeight:"100vh",
      position:"fixed"

    }}
    items={items}
    onClick={handleOnclick}
  />
  <div style={{flex:"1", padding:"15px", marginLeft:"256px"}}>
   {renderPage(keySelected)}
  </div>
    </div>
    </>
    
  )
}

export default AdminPage