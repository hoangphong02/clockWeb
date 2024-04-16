import React, { useEffect, useRef, useState } from "react";
import { ButtonAddUser, WrapperAvatar, WrapperHeader } from "./style";
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Upload,
} from "antd";
import * as message from "../../components/Message/Message";
import InputComponent from "../InputComponent/InputComponent";
import { getBase64, renderOptions } from "../../utils";
import * as ProductService from "../../services/ProductService";
import * as PostService from "../../services/PostService";
import { useMutationHook } from "../../hooks/useMutationHook";
import Loading from "../../components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";
import PieChartComponent from "./PieChartComponent";
import AdminHeader from "../AdminHeader/AdminHeader";

const AdminPost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [imageUpload, setImageUpload] = useState([]);
  const [imageUploadDetail, setImageUploadDetail] = useState([]);
  const user = useSelector((state) => state?.user);
  const searchInput = useRef(null);
  const [statePost, setStatePost] = useState({
    title: "",
    content: "",
    likeCount: [],
    image: [],
    imageUL: "",
  });
  const [statePostDetails, setStatePostDetails] = useState({
    id: "",
    title: "",
    content: "",
    likeCount: [],
    image: [],
    imageUL: "",
    createAt: "",
  });
  const [statePostDetailsUpdate, setStatePostDetailsUpdate] = useState({
    title: "",
    content: "",
    likeCount: [],
    image: [],
  });

  useEffect(() => {
    setStatePostDetailsUpdate({
      title: statePostDetails?.title,
      content: statePostDetails?.content,
      likeCount: statePostDetails?.likeCount,
      image: imageUploadDetail,
    });
  }, [statePostDetails, imageUploadDetail]);

  const [form] = Form.useForm();

  const mutation = useMutationHook((data) => {
    const { token, ...rests } = data;
    const res = PostService.createPost(token, { ...rests });
    return res;
  });
  const mutationUpdate = useMutationHook((data) => {
    const { id, token, ...rests } = data;
    const res = PostService.updatePost(id, token, { ...rests });
    return res;
  });

  const mutationDeleted = useMutationHook((data) => {
    const { id, token } = data;
    const res = PostService.deletePost(id, token);
    return res;
  });

  //  const mutationDeletedMany = useMutationHook(
  //   (data) => {
  //     const {
  //       token,...ids
  //     } = data
  //     const res = ProductService.deleteManyProduct(
  //       ids,
  //       token)
  //     return res
  //   },
  // )

  const getAllPost = async () => {
    const res = await PostService.getAllPost();
    return res;
  };

  const fetchGetDetailPost = async (rowSelected) => {
    const res = await PostService.getDetailPost(rowSelected);
    if (res?.data) {
      setStatePostDetails({
        _id: res?.data?._id,
        title: res?.data?.title,
        content: res?.data?.content,
        image: res?.data?.image,
      });
      setImageUploadDetail(res?.data?.image);
    }
    setIsLoadingUpdate(false);
  };

  useEffect(() => {
    if (!isModalOpen) {
      form.setFieldsValue(statePostDetails);
    } else {
      form.setFieldsValue(statePost);
    }
  }, [form, statePostDetails, isModalOpen]);

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true);
      fetchGetDetailPost(rowSelected);
    }
  }, [rowSelected, isOpenDrawer]);

  const handleDetailsProduct = () => {
    setIsOpenDrawer(true);
  };

  // const handleDeleteManyProduct =(ids)=>{
  //   mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
  //     onSettled: () => {
  //       queryProduct.refetch()
  //     }
  //   })
  // }

  const { data, isLoading, isSuccess, isError } = mutation;
  const {
    data: dataUpdated,
    isLoading: isLoadingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;
  const {
    data: dataDeleted,
    isLoading: isLoadingDeleted,
    isSuccess: isSuccessDelected,
    isError: isErrorDeleted,
  } = mutationDeleted;

  const queryPost = useQuery({ queryKey: ["posts"], queryFn: getAllPost });

  const { isLoading: isLoadingProducts, data: posts } = queryPost;
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          style={{ color: "red", fontSize: "30px", cursor: "pointer" }}
          onClick={() => setIsModalOpenDelete(true)}
        />
        <EditOutlined
          style={{ color: "orange", fontSize: "30px", cursor: "pointer" }}
          onClick={handleDetailsProduct}
        />
      </div>
    );
  };

  //Search filter antd https://ant.design/components/table#components-table-demo-custom-filter-panel
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    // setSearchText('');
    confirm();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
    },

    {
      title: "Nội dung",
      dataIndex: "content",
      sorter: (a, b) => a.content.length - b.content.length,
      ...getColumnSearchProps("content"),
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  const dataTable =
    posts?.data?.length &&
    posts?.data?.map((post) => {
      return {
        ...post,
        key: post._id,
        title: post?.title,
        content: post?.content,
      };
    });

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success();
      handleCancel();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessDelected && dataDeleted?.status === "OK") {
      message.success();
      handleCancelDelete();
    } else if (isErrorDeleted) {
      message.error();
    }
  }, [isSuccessDelected]);

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStatePostDetails({
      _id: "",
      image: "",
      type: "",
    });
    form.resetFields();
  };

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success();
      handleCloseDrawer();
    } else if (isErrorUpdated) {
      message.error();
    }
  }, [isSuccessUpdated]);

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleDeleteImage = () => {
    mutationDeleted.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryPost.refetch();
        },
      }
    );
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setStatePost({
      title: "",
      content: "",
    });
    setImageUpload([]);
    form.resetFields();
  };

  const onFinish = () => {
    mutation.mutate(
      {
        token: user?.access_token,
        title: statePost?.title,
        content: statePost?.content,
        likeCount: statePost?.likeCount,
        image: imageUpload,
      },
      {
        onSettled: () => {
          queryPost.refetch();
        },
      }
    );
  };

  const handleOnchange = (e) => {
    setStatePost({
      ...statePost,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeDetails = (e) => {
    setStatePostDetails({
      ...statePostDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeAvatar = async ({ fileList }) => {
    const images = [];
    for (const file of fileList) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      images.push({ urlImage: file.preview });
    }
    setImageUpload(images);
  };

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const images = [];
    for (const file of fileList) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      images.push({ urlImage: file.preview });
    }
    setImageUploadDetail(images);
  };
  const onUpdatePost = () => {
    mutationUpdate.mutate(
      { id: rowSelected, token: user?.access_token, ...statePostDetailsUpdate },
      {
        onSettled: () => {
          queryPost.refetch();
        },
      }
    );
  };

  // const handleChangeSelect = (value) => {
  //     setStatePost({
  //       ...statePost,
  //       type: value
  //     })
  // }

  const handleDeleteImageUploadDetail = (url) => {
    let ArrImage = [];
    ArrImage = imageUploadDetail.filter((image) => image?.urlImage !== url);
    setImageUploadDetail(ArrImage);
  };

  return (
    <div>
      <AdminHeader textHeader={"Quản lý bài đăng"} />

      {/* <div style={{width:"200px", height:"200px"}}>

      <PieChartComponent data = {sliders?.data}/>
      </div> */}
      <div style={{ marginTop: "10px" }}>
        {/* <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }} onClick={() => setIsModalOpen(true)}><PlusOutlined style={{ fontSize: '60px' }} /></Button> */}
        <ButtonAddUser onClick={() => setIsModalOpen(true)}>
          <PlusOutlined />
        </ButtonAddUser>
      </div>
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          columns={columns}
          isLoading={isLoadingProducts}
          data={dataTable}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id);
              },
            };
          }}
        />
      </div>
      <ModalComponent
        forceRender
        title="Tạo bài đăng"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Loading isLoading={isLoading}>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={onFinish}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Tiêu đề"
              name="title"
              rules={[{ required: true, message: "Please input your title!" }]}
            >
              <InputComponent
                value={statePost.title}
                onChange={handleOnchange}
                name="title"
              />
            </Form.Item>
            <Form.Item
              label="Nội dung"
              name="content"
              rules={[
                { required: true, message: "Please input your content!" },
              ]}
            >
              <InputComponent
                value={statePost.content}
                onChange={handleOnchange}
                name="content"
              />
            </Form.Item>

            <div
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                gap: "20px",
              }}
            ></div>

            <div style={{ padding: "0 50px" }}>
              <p>Thêm hình ảnh</p>
              <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture"
                maxCount={6}
                multiple
                onChange={handleOnchangeAvatar}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>

              {/* <WrapperAvatar onChange={handleOnchangeAvatar} maxCount={1}>
                <Button>Select File</Button>
                {statePost?.imageUL && (
                  <img
                    src={statePost?.imageUL}
                    style={{
                      height: "60px",
                      width: "60px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginLeft: "10px",
                    }}
                    alt="avatar"
                  />
                )}
              </WrapperAvatar> */}
              {/* <Button
                style={{
                  margin: "20px 0",
                  background: "#1677ff",
                  color: "#fff",
                }}
                disabled={statePost?.imageUL ? false : true}
                onClick={handleIncreaseImage}
              >
                Upload
              </Button> */}
            </div>

            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
      <DrawerComponent
        title="Chi tiết bài đăng"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="90%"
      >
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
          <Form
            name="basic"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            onFinish={onUpdatePost}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Mã bài đăng"
              name="_id"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              {/* <InputComponent value={statePostDetails?._id} onChange={handleOnchangeDetails} name="_id" /> */}
              <span>{statePostDetails?._id}</span>
            </Form.Item>

            <Form.Item
              label="Tiêu đề"
              name="title"
              rules={[{ required: true, message: "Please input your title!" }]}
            >
              <InputComponent
                value={statePostDetails?.title}
                onChange={handleOnchangeDetails}
                name="title"
              />
            </Form.Item>
            <Form.Item
              label="Nội dung"
              name="content"
              rules={[
                { required: true, message: "Please input your content!" },
              ]}
            >
              <InputComponent
                value={statePostDetails?.content}
                onChange={handleOnchangeDetails}
                name="content"
              />
            </Form.Item>
            <div
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              {imageUploadDetail.length > 0 &&
                imageUploadDetail?.map((image) => {
                  return (
                    <div
                      style={{
                        height: "80px",
                        width: "80px",
                        position: "relative",
                      }}
                    >
                      <img
                        src={image?.urlImage}
                        style={{ width: "70px", height: "70px" }}
                      />
                      <CloseOutlined
                        onClick={() =>
                          handleDeleteImageUploadDetail(image?.urlImage)
                        }
                        style={{
                          top: "-6px",
                          position: "absolute",
                          right: "-7px",
                          background: "#a5a4a3",
                          borderRadius: " 30px",
                          color: "#fff",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  );
                })}
            </div>

            <div
              style={{
                padding: "0",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <p>Thêm hình ảnh: </p>
              <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture"
                maxCount={6}
                multiple
                onChange={handleOnchangeAvatarDetails}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </div>

            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>
      <ModalComponent
        title="Xóa sản phẩm"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteImage}
      >
        <Loading isLoading={isLoadingDeleted}>
          <div>Bạn có chắc xóa bài đăng này không?</div>
        </Loading>
      </ModalComponent>
    </div>
  );
};

export default AdminPost;
