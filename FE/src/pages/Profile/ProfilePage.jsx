import React, { useEffect, useState } from "react";
import {
  WrapperAllProfile,
  WrapperAvatar,
  WrapperContentProfile,
  WrapperInfo,
  WrapperInput,
  WrapperInputForm,
  WrapperLabel,
  WrapperSidenav,
} from "./style";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { useMutationHook } from "../../hooks/useMutationHook";
import Loading from "../../components/Loading/Loading";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slides/userSlide";
import { Button, Input, Modal, Upload } from "antd";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../utils";
import icon_username from "../../assets/images/icon-username.png";
import icon_address from "../../assets/images/icon-address.png";
import icon_phone from "../../assets/images/icon-phone.png";
import icon_email from "../../assets/images/icon-email.png";

function ProfilePage() {
  const user = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [urlImage, setUrlImage] = useState();

  const mutation = useMutationHook((data) => {
    const { id, access_token, ...rests } = data;
    UserService.updateUser(id, rests, access_token);
  });
  const dispatch = useDispatch();
  const { data, isSuccess, isLoading, isError } = mutation;
  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setPhone(user?.phone);
    setAddress(user?.address);
    setUrlImage(user?.avatar);
  }, [user]);

  const handleGetDetailsUser = async (id, token) => {
    // const res = await UserService.getDetailUser(id,token)
    // dispatch(updateUser({...res?.data,access_token: token}))
    const storage = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storage);
    const res = await UserService.getDetailUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }));
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("Cập nhật thành công");
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    mutation.mutate({
      id: user?.id,
      email,
      name,
      phone,
      address,
      avatar: urlImage,
      access_token: user?.access_token,
    });
  };
  const handleOk = () => {
    handleUpdate();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setName(user?.name);
    setEmail(user?.email);
    setAddress(user?.address);
    setPhone(user?.phone);
    setUrlImage(user?.avatar);
    setIsModalOpen(false);
  };
  const handleOnchangeName = (value) => {
    setName(value);
  };
  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnchangePhone = (value) => {
    setPhone(value);
  };
  const handleOnchangeAddress = (value) => {
    setAddress(value);
  };

  const uploadToCloudinary = async (file, uploadPreset, uploadUrl) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.secure_url) {
        // Trả về URL của ảnh đã upload
        return data.secure_url;
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };
  const handleImageUpload = async (file) => {
    const uploadPreset = "clockWeb";
    const uploadUrl = "https://api.cloudinary.com/v1_1/dhfbsejrh/image/upload";

    const imageUrl = await uploadToCloudinary(file, uploadPreset, uploadUrl);

    if (imageUrl) {
      setUrlImage(imageUrl);
    }
  };

  return (
    <div>
      <div style={{ textAlign: "center", padding: "10px" }}></div>

      <WrapperAllProfile>
        <div className="sidenav">
          <div className="profile" style={{ textAlign: "center" }}>
            <img
              src={urlImage}
              alt=""
              width="80"
              height="80"
              style={{ borderRadius: "50%" }}
            />
          </div>

          <WrapperSidenav className="sidenav-url">
            <div
              className="url"
              style={{ cursor: "pointer" }}
              onClick={showModal}
            >
              <p>
                <EditOutlined style={{ fontSize: "30px", color: "#9b9797" }} />
              </p>
              <hr align="center" />
            </div>
          </WrapperSidenav>

          <Modal
            title="Cập nhật thông tin cá nhân"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            cancelText="Trở về"
            okText="Cập nhật"
          >
            <WrapperContentProfile>
              <WrapperInput>
                <WrapperLabel htmlFor="name">Tên</WrapperLabel>
                <WrapperInputForm
                  id="name"
                  value={name}
                  onChange={handleOnchangeName}
                />
              </WrapperInput>
              <WrapperInput>
                <WrapperLabel htmlFor="email">Email</WrapperLabel>
                <WrapperInputForm
                  id="email"
                  value={email}
                  onChange={handleOnchangeEmail}
                />
              </WrapperInput>
              <WrapperInput>
                <WrapperLabel htmlFor="phone">Số điện thoại</WrapperLabel>
                <WrapperInputForm
                  id="phone"
                  value={phone}
                  onChange={handleOnchangePhone}
                />
              </WrapperInput>
              <WrapperInput>
                <WrapperLabel htmlFor="address">Địa chỉ</WrapperLabel>
                <WrapperInputForm
                  id="address"
                  value={address}
                  onChange={handleOnchangeAddress}
                />
              </WrapperInput>
              <WrapperInput>
                <WrapperLabel htmlFor="avatar">Ảnh đại diện</WrapperLabel>

                <Input
                  style={{ maxWidth: "430px" }}
                  type="file"
                  id="exampleCustomFileBrowser1"
                  name="image"
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                />
                {urlImage && (
                  <div
                    className="image-preview"
                    style={{
                      marginTop: "40px",
                    }}
                  >
                    <img
                      src={urlImage}
                      alt=""
                      style={{ height: "100px", width: "auto" }}
                    />
                    <div
                      className="image-preview-remove"
                      onClick={() => {
                        setUrlImage("");
                      }}
                    >
                      x
                    </div>
                  </div>
                )}
                {/* <InputForm style={{width:'300px'}} id="avatar" value={avatar} onChange={handleOnchangeAvatar} /> */}
              </WrapperInput>
            </WrapperContentProfile>
          </Modal>
        </div>

        <WrapperInfo>
          <div
            style={{
              borderRadius: "30px",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
          >
            <div style={{ padding: "10px 30px", display: "flex" }}>
              <label
                htmlFor=""
                style={{
                  width: "max-content",
                  minWidth: "160px",
                  fontSize: "16px",
                }}
              >
                Tên:
              </label>
              <input
                type="text"
                value={name}
                style={{
                  border: "none",
                  background: "none",
                  fontSize: "16px",
                  color: "#000",
                  width: "80%",
                }}
                readOnly
              />
            </div>
            <div style={{ padding: "10px 0px 10px 30px", display: "flex" }}>
              <label
                htmlFor=""
                style={{
                  width: "max-content",
                  minWidth: "160px",
                  fontSize: "16px",
                }}
              >
                Email:
              </label>
              <input
                type="text"
                value={email}
                style={{
                  border: "none",
                  background: "none",
                  fontSize: "16px",
                  color: "#000",
                  width: "80%",
                }}
                readOnly
              />
            </div>
            <div style={{ padding: "10px 30px", display: "flex" }}>
              <label
                htmlFor=""
                style={{
                  width: "max-content",
                  minWidth: "160px",
                  fontSize: "16px",
                }}
              >
                Số điện thoại:
              </label>
              <input
                type="text"
                value={phone}
                style={{
                  border: "none",
                  background: "none",
                  fontSize: "16px",
                  color: "#000",
                  width: "80%",
                }}
                readOnly
              />
            </div>
            <div style={{ padding: "10px 30px", display: "flex" }}>
              <label
                htmlFor=""
                style={{
                  width: "max-content",
                  minWidth: "160px",
                  fontSize: "16px",
                }}
              >
                Địa chỉ:
              </label>
              <input
                type="text"
                value={address}
                style={{
                  border: "none",
                  background: "none",
                  fontSize: "16px",
                  color: "#000",
                  width: "80%",
                }}
                readOnly
              />
            </div>
          </div>
        </WrapperInfo>
      </WrapperAllProfile>
    </div>
  );
}

export default ProfilePage;
