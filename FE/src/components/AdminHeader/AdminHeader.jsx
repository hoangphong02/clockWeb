import React, { useEffect, useState } from 'react'
import { WrapperContentPopover, WrapperHeaderAccount, WrapperImgAvatar, WrapperTextHeaderSmall } from './style'
import { useDispatch, useSelector } from 'react-redux'
import { CaretDownOutlined, UserOutlined } from '@ant-design/icons'
import { Popover } from 'antd'
import { useNavigate } from 'react-router'
import { resetUser } from '../../redux/slides/userSlide'
import * as UserService from '../../services/UserService'
import AdminDashboard from '../AdminDashboard/AdminDashboard'
const AdminHeader = ({ textHeader }) => {
  const user = useSelector((state) => state?.user)
  const [username, setUsername] = useState("")
  const [userAvatar, setUserAvatar] = useState("")
  const [loading, setLoading] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleNavigateLogin = () => {
    navigate("/sign-in")
  }

  const handleLogout = async () => {
    setLoading(true)
    await UserService.logoutUser()
    dispatch(resetUser())
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    setUsername(user?.name)
    setUserAvatar(user?.avatar)
    setLoading(false)
  }, [user?.name, user?.avatar])

  const content = (
    <div>
      <WrapperContentPopover onClick={() => navigate("/profile-user")}>Thông tin người dùng</WrapperContentPopover>
      {user?.isAdmin && (
        <WrapperContentPopover onClick={() => navigate("/system/admin")}>Quản lý hệ thống</WrapperContentPopover>
      )}
      <WrapperContentPopover onClick={() => navigate("/my-order", {
        state: {
          id: user?.id,
          token: user?.access_token
        }
      })}>Đơn hàng của tôi</WrapperContentPopover>
      <WrapperContentPopover onClick={handleLogout}>Đăng xuất</WrapperContentPopover>
    </div>
  );

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
  const path = window.location.pathname
  const segments = path.split('/');
  const adminPath = segments.pop();

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ color: "#fff" }}>
        <label >Trang chủ</label> / <label>{textHeader}</label>
      </div>
      <div>
        <WrapperHeaderAccount>
          {user?.avatar ? (
            <WrapperImgAvatar src={userAvatar} alt='avatar' />
          ) : (

            <UserOutlined style={{ fontSize: '30px' }} />
          )}
          {user?.access_token ? (
            <>
              <Popover content={content} trigger="click">
                <div style={{ cursor: "pointer", color: isScrolled ? "black" : "#fff" }}>{username?.length ? username : "User"}</div>
              </Popover>
            </>
          ) : (
            <div onClick={handleNavigateLogin} style={{ cursor: "pointer" }}>
              <WrapperTextHeaderSmall >Đăng nhập / Đăng ký</WrapperTextHeaderSmall>
              <div>
                <WrapperTextHeaderSmall >Tài khoản</WrapperTextHeaderSmall>
                <CaretDownOutlined />
              </div>
            </div>
          )}

        </WrapperHeaderAccount>
      </div>
    </div>
  )
}

export default AdminHeader