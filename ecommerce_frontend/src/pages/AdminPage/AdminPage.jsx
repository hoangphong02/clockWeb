import { Menu } from 'antd'
import React, { useEffect, useState } from 'react'
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
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    // Lắng nghe sự kiện scroll
    const handleScroll = () => {
      // Kiểm tra vị trí scroll và cập nhật trạng thái
      setIsScrolled(window.scrollY > 50);
    };

    // Đăng ký sự kiện scroll
    window.addEventListener('scroll', handleScroll);

    // Hủy đăng ký sự kiện khi component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // useEffect chỉ chạy một lần sau khi component được render
  const items = [
     getItem('DASHBOARD', 'home', <DashboardOutlined style={{fontSize:"22px"}}/>),
    getItem('NGƯỜI DÙNG', 'user', <UserOutlined style={{fontSize:"22px"}}/>),
    getItem('SẢN PHẨM', 'product', <AppstoreOutlined style={{fontSize:"22px"}}/> ),
    getItem('ĐƠN HÀNG', 'orders', <ShoppingCartOutlined style={{fontSize:"22px"}}/> ),
    getItem('LIÊN HỆ', 'contact', <ContactsOutlined style={{fontSize:"22px"}}/>  ),
    getItem('SLIDER', 'slider', <FileImageOutlined style={{fontSize:"22px"}}/>  ),


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
      paddingTop: isScrolled? "70px":"0",
      width: 256,
      boxShadow: '1px 1px 2px #ccc',
      minHeight:"100vh",
      position:"fixed",
      background:"none"

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