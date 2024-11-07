import React, { useEffect, useRef, useState } from "react";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import { Button, Form, Radio, Space } from "antd";
import * as message from "../../components/Message/Message";
import InputComponent from "../InputComponent/InputComponent";
import { useMutationHook } from "../../hooks/useMutationHook";
import Loading from "../../components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";
import * as OrderService from "../../services/OrderService";
import PieChartComponent from "./PieChartComponent";
import AdminHeader from "../AdminHeader/AdminHeader";
import ReactToPrintComponent from "../ReactToPrintComponent/ReactToPrintComponent";
import { ButtonPrint } from "./style";
import { useReactToPrint } from "react-to-print";

const AdminOrder = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isModalOpenPrint, setIsModalOpenPrint] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [paid, setPaid] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [received, setReceived] = useState(false);
  const [dataOrderToPrint, setDataOrderToPrint] = useState([]);
  const user = useSelector((state) => state?.user);
  const [isPrinting, setIsPrinting] = useState(false);

  const searchInput = useRef(null);
  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    onBeforeGetContent: async () => {
      setIsPrinting(true);
      let arrOrderToPrint = [];
      if (orders?.data?.length) {
        orders?.data
          ?.filter(
            (item) => item?.isConfirm === true && item?.isDelivered === false
          )
          .map((order) => {
            arrOrderToPrint.push(order);
          });
        setDataOrderToPrint(arrOrderToPrint);
      }
    },
  });

  const handlePrintOneOrder = useReactToPrint({
    content: () => printRef.current,
    onBeforeGetContent: async () => {
      setIsPrinting(true);
      if (orders?.data?.length && rowSelected) {
        const dataOrder = [];
        orders?.data?.map((item) => {
          if (item?._id === rowSelected) {
            dataOrder.push(item);
          }
        });
        setDataOrderToPrint(dataOrder);
      }
    },
    onAfterPrint: () => {
      setIsModalOpenPrint(false);
    },
  });

  const [stateOrdersDetails, setStateOrdersDetails] = useState({
    id: "",
    name: "",
    address: "",
    phone: "",
    totalPrice: "",
    orderItems: [],
    isPaid: false,
    isDelivered: false,
    isConfirm: false,
    isReceived: false,
    createdAt: "",
    paymentMethod: "",
  });

  const [form] = Form.useForm();

  const mutationUpdate = useMutationHook((data) => {
    const { id, token, ...rests } = data;
    const res = OrderService.updateOrder(id, token, { ...rests });
    return res;
  });

  const mutationDeleted = useMutationHook((data) => {
    const { id, token, orderItems, userId } = data;
    const res = OrderService.cancelOrder(id, token, orderItems, userId);
    return res;
  });

  const getItems = (rowSelected) => {
    let orderItems = [];
    orders?.data?.forEach((order) => {
      if (order?._id === rowSelected) {
        order?.orderItems.forEach((item) => {
          orderItems.push(item);
        });
      }
    });

    return orderItems;
  };

  const handleCancelOrder = async (rowSelected) => {
    mutationDeleted.mutate(
      {
        id: rowSelected,
        token: user?.access_token,
        orderItems: getItems(rowSelected),
        userId: user?.id,
      },
      {
        onSuccess: () => {
          queryOrder.refetch();
        },
      }
    );
  };

  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token);
    return res;
  };

  const fetchGetDetailsOrder = async (rowSelected) => {
    const res = await OrderService.getDetailOrder(rowSelected);
    if (res?.data) {
      setStateOrdersDetails({
        _id: res?.data?._id,
        name: res?.data?.shippingAddress?.fullName,
        address: `${res?.data?.shippingAddress?.address} -${res?.data?.shippingAddress?.city} `,
        phone: res?.data?.shippingAddress?.phone,
        totalPrice: res?.data?.totalPrice,
        orderItems: res?.data?.orderItems,
        isPaid: res?.data?.isPaid,
        isDelivered: res?.data?.isDelivered,
        isConfirm: res?.data?.isConfirm,
        isReceived: res?.data?.isReceived,
        createdAt: res?.data?.createdAt,
        paymentMethod: res?.data?.paymentMethod,
      });
      setConfirm(res?.data?.isConfirm);
      setPaid(res?.data?.isPaid);
      setDelivery(res?.data?.isDelivered);
      setReceived(res?.data?.isReceived);
    }
    setIsLoadingUpdate(false);
  };

  useEffect(() => {
    if (!isModalOpen) {
      form.setFieldsValue(stateOrdersDetails);
    }
  }, [form, stateOrdersDetails, isModalOpen]);

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true);
      fetchGetDetailsOrder(rowSelected);
    }
  }, [rowSelected, isOpenDrawer]);

  const handleDetailsOrder = () => {
    setIsOpenDrawer(true);
  };

  const handleDeleteManyUser = (ids) => {
    // mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
    //   onSettled: () => {
    //     queryUser.refetch()
    //   }
    // })
  };
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
  //  const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany

  const queryOrder = useQuery({ queryKey: ["orders"], queryFn: getAllOrder });
  const { isLoading: isLoadingOrder, data: orders } = queryOrder;

  useEffect(() => {
    let arrOrderToPrint = [];
    if (orders?.data?.length) {
      orders?.data
        ?.filter(
          (item) => item?.isConfirm === true && item?.isDelivered === false
        )
        .map((order) => {
          arrOrderToPrint.push(order);
        });
      setDataOrderToPrint(arrOrderToPrint);
    }
  }, [orders]);
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          style={{ color: "red", fontSize: "2em", cursor: "pointer" }}
          onClick={() => setIsModalOpenDelete(true)}
        />
        <EditOutlined
          style={{ color: "orange", fontSize: "2em", cursor: "pointer" }}
          onClick={handleDetailsOrder}
        />
        <PrinterOutlined
          style={{
            color: "rgb(42 173 103)",
            fontSize: "2em",
            cursor: "pointer",
          }}
          onClick={() => setIsModalOpenPrint(true)}
        />
      </div>
    );
  };

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

  //columns and data truyền vào tablecomponent
  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "key",
      // render: (text) => <a>{text}</a>,
      // sorter: (a, b) => a.key.length - b.key.length,
      ...getColumnSearchProps("key"),
    },
    {
      title: "Tên khách hàng",
      dataIndex: "userName",
      render: (text) => <a>{text}</a>,
      // sorter: (a, b) => a.userName.length - b.userName.length,
      ...getColumnSearchProps("userName"),
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
      // sorter: (a, b) => a.phone.length - b.phone.length,
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      // sorter: (a, b) => a.address.length - b.address.length,
      ...getColumnSearchProps("address"),
    },
    {
      title: "Đã xác nhận",
      dataIndex: "isConfirm",
      // sorter: (a, b) => a.name - b.name,
      // ...getColumnSearchProps("isConfirm"),
      filters: [
        {
          text: "True",
          value: true,
        },
        {
          text: "False",
          value: false,
        },
      ],
      onFilter: (value, record) => {
        if (value === true) {
          return record.isConfirm.type.render.name === "CheckCircleOutlined";
        }
        return record.isConfirm.type.render.name === "CloseCircleOutlined";
      },
    },
    {
      title: "Đã nhận hàng",
      dataIndex: "isReceived",
      // sorter: (a, b) => a.name - b.name,
      // ...getColumnSearchProps("isReceived"),
      filters: [
        {
          text: "True",
          value: true,
        },
        {
          text: "False",
          value: false,
        },
      ],
      onFilter: (value, record) => {
        if (value === true) {
          return record.isReceived.type.render.name === "CheckCircleOutlined";
        }
        return record.isReceived.type.render.name === "CloseCircleOutlined";
      },
    },
    {
      title: "Đã thanh toán",
      dataIndex: "isPaid",
      // sorter: (a, b) => a.name - b.name,
      // ...getColumnSearchProps("isPaid"),
      filters: [
        {
          text: "True",
          value: true,
        },
        {
          text: "False",
          value: false,
        },
      ],
      onFilter: (value, record) => {
        if (value === true) {
          return record.isPaid.type.render.name === "CheckCircleOutlined";
        }
        return record.isPaid.type.render.name === "CloseCircleOutlined";
      },
    },
    {
      title: "Đã vận chuyển",
      dataIndex: "isDelivered",
      // sorter: (a, b) => a.isDelivered.length - b.isDelivered.length,
      // ...getColumnSearchProps("isDelivered"),
      filters: [
        {
          text: "True",
          value: true,
        },
        {
          text: "False",
          value: false,
        },
      ],
      onFilter: (value, record) => {
        if (value === true) {
          return record.isDelivered.type.render.name === "CheckCircleOutlined";
        }
        return record.isDelivered.type.render.name === "CloseCircleOutlined";
      },
    },
    // {
    //   title: "Payment method",
    //   dataIndex: "paymentMethod",
    //   sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
    //   ...getColumnSearchProps("paymentMethod"),
    // },
    {
      title: "Giá",
      dataIndex: "totalPrice",
      // sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
      ...getColumnSearchProps("totalPrice"),
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  const dataTable =
    orders?.data?.length &&
    orders?.data?.map((order) => {
      return {
        ...order,
        key: order._id,
        isPaid: order?.isPaid ? (
          <CheckCircleOutlined
            style={{ fontSize: "25px", color: "rgb(70 255 74)" }}
          />
        ) : (
          <CloseCircleOutlined
            style={{ fontSize: "25px", color: "rgb(255 ,11, 11)" }}
          />
        ),
        userName: order?.shippingAddress?.fullName,
        phone: order?.shippingAddress?.phone,
        address: order?.shippingAddress?.address,
        isConfirm: order?.isConfirm ? (
          <CheckCircleOutlined
            style={{ fontSize: "25px", color: "rgb(70 255 74)" }}
          />
        ) : (
          <CloseCircleOutlined
            style={{ fontSize: "25px", color: "rgb(255 ,11, 11)" }}
          />
        ),
        isReceived: order?.isReceived ? (
          <CheckCircleOutlined
            style={{ fontSize: "25px", color: "rgb(70 255 74)" }}
          />
        ) : (
          <CloseCircleOutlined
            style={{ fontSize: "25px", color: "rgb(255 ,11, 11)" }}
          />
        ),
        isDelivered: order?.isDelivered ? (
          <CheckCircleOutlined
            style={{ fontSize: "25px", color: "rgb(70 255 74)" }}
          />
        ) : (
          <CloseCircleOutlined
            style={{ fontSize: "25px", color: "rgb(255 ,11, 11)" }}
          />
        ),
        totalPrice: `${(order?.totalPrice).toLocaleString()} VND`,
      };
    });

  useEffect(() => {
    if (isSuccessDelected && dataDeleted?.status === "OK") {
      message.success();
      handleCancelDelete();
    } else if (isErrorDeleted) {
      message.error();
    }
  }, [isSuccessDelected, dataDeleted]);

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
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

  // useEffect(() => {
  //   if (isSuccessDelectedMany && dataDeletedMany?.status === 'OK') {
  //     message.success()
  //     handleCancelDelete()
  //   } else if (isErrorDeletedMany) {
  //     message.error()
  //   }
  // }, [isSuccessDelectedMany])

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleCancelPrint = () => {
    setIsModalOpenPrint(false);
  };

  const handleOnchangeDetails = (e) => {
    if (e.target.name === "isReceived") {
      if (e.target.value === "true") {
        setStateOrdersDetails({
          ...stateOrdersDetails,
          isReceived: e.target.value,
          isConfirm: true,
          isDelivered: true,
          isPaid: true,
        });
      }
    } else {
      setStateOrdersDetails({
        ...stateOrdersDetails,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleOnchangeIsConfirmDetails = (e) => {
    if (stateOrdersDetails?.isReceived === true) {
      setStateOrdersDetails({
        ...stateOrdersDetails,
        isConfirm: true,
      });
    } else {
      setStateOrdersDetails({
        ...stateOrdersDetails,
        isConfirm: e.target.value,
      });
    }
  };
  const handleOnchangeIsPaidDetails = (e) => {
    if (stateOrdersDetails?.isReceived === true) {
      setStateOrdersDetails({
        ...stateOrdersDetails,
        isPaid: true,
      });
    } else {
      setStateOrdersDetails({
        ...stateOrdersDetails,
        isPaid: e.target.value,
      });
    }
  };
  const handleOnchangeIsDeliveryDetails = (e) => {
    if (stateOrdersDetails?.isReceived === true) {
      setStateOrdersDetails({
        ...stateOrdersDetails,
        isDelivered: true,
      });
    } else {
      setStateOrdersDetails({
        ...stateOrdersDetails,
        isDelivered: e.target.value,
      });
    }
  };
  const handleOnchangeIsReceivedDetails = (e) => {
    if (e.target.value === true) {
      setStateOrdersDetails({
        ...stateOrdersDetails,
        isDelivered: true,
        isPaid: true,
        isConfirm: true,
        isReceived: true,
      });
    } else {
      setStateOrdersDetails({
        ...stateOrdersDetails,
        isReceived: e.target.value,
        isConfirm: confirm,
        isPaid: paid,
        isDelivered: delivery,
      });
    }
  };

  const onUpdateOrder = () => {
    mutationUpdate.mutate(
      { id: rowSelected, token: user?.access_token, ...stateOrdersDetails },
      {
        onSettled: () => {
          queryOrder.refetch();
        },
      }
    );
  };

  console.log("dataTable", orders);
  return (
    <div>
      <AdminHeader textHeader={"Quản lý đơn hàng"} />
      {/* <WrapperHeader>Quản lý đơn hàng</WrapperHeader> */}
      <div
        style={{
          display: "flex",
          marginBottom: "20px",
          padding: "20px",
          gap: "30px",
        }}
      >
        <div style={{ width: "200px", height: "200px", textAlign: "center" }}>
          <PieChartComponent
            data={orders?.data}
            label={"paymentMethod"}
            color={["#0088FE", "#00C49F"]}
          />
          <p style={{ fontSize: "15px", fontWeight: "bold", color: "#fff" }}>
            Phương thức thanh toán
          </p>
        </div>
        <div style={{ width: "200px", height: "200px", textAlign: "center" }}>
          <PieChartComponent
            data={orders?.data}
            label={"isConfirm"}
            color={["#FFBB28", "#FF8042"]}
          />
          <p style={{ fontSize: "15px", fontWeight: "bold", color: "#fff" }}>
            Xác nhận đơn hàng
          </p>
        </div>
        <div style={{ width: "200px", height: "200px", textAlign: "center" }}>
          <PieChartComponent
            data={orders?.data}
            label={"isDelivered"}
            color={["#258a3f", "#d61a2c"]}
          />
          <p style={{ fontSize: "15px", fontWeight: "bold", color: "#fff" }}>
            Vận chuyển đơn hàng
          </p>
        </div>
      </div>
      {/* <div style={{ marginTop: '10px' }}>
        <ButtonAddUser onClick={() => setIsModalOpen(true)}><PlusOutlined /></ButtonAddUser>
      </div> */}
      {isPrinting && (
        <div className="d-none">
          <ReactToPrintComponent data={dataOrderToPrint} ref={printRef} />
        </div>
      )}

      <ButtonPrint onClick={handlePrint}>
        <PrinterOutlined />{" "}
        <span style={{ padding: "0 5px", fontSize: "15px" }}>In đồng loạt</span>
      </ButtonPrint>
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          handleDeleteMany={handleDeleteManyUser}
          columns={columns}
          isLoading={isLoadingOrder}
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
      <DrawerComponent
        title="Chi tiết đơn hàng"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="90%"
      >
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 20,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onUpdateOrder}
            autoComplete="on"
          >
            <Form.Item
              label="Mã đơn hàng"
              name="_id"
              rules={[
                {
                  required: true,
                  message: "Please input user id!",
                },
              ]}
            >
              {/* <InputComponent value = {stateOrdersDetails._id} onChange ={handleOnchangeDetails} name="_id"/> */}
              <span>{stateOrdersDetails._id}</span>
            </Form.Item>
            <Form.Item
              label="Tên khách hàng"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input user name!",
                },
              ]}
            >
              {/* <InputComponent value = {stateOrdersDetails.name} onChange ={handleOnchangeDetails} name="name"/> */}
              <span>{stateOrdersDetails.name}</span>
            </Form.Item>

            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input user email!",
                },
              ]}
            >
              {/* <InputComponent value = {stateOrdersDetails.address} onChange ={handleOnchangeDetails} name="address"/> */}
              <span>{stateOrdersDetails.address}</span>
            </Form.Item>

            <Form.Item
              label="Điện thoại"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input user address!",
                },
              ]}
            >
              {/* <InputComponent value = {stateOrdersDetails.phone} onChange ={handleOnchangeDetails} name="phone"/> */}
              <span>{stateOrdersDetails.phone}</span>
            </Form.Item>

            <Form.Item label="Sản phẩm">
              {stateOrdersDetails?.orderItems.map((order) => {
                return (
                  <div>
                    <img
                      src={order?.image}
                      style={{
                        height: "60px",
                        width: "60px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginLeft: "10px",
                      }}
                      alt="avatar"
                    />

                    <span>
                      {""} Số lượng: <strong>{order?.amount}</strong>
                    </span>
                    <span>
                      {" "}
                      Giá sản phẩm:{" "}
                      <strong>{(order?.price).toLocaleString()} VND</strong>
                    </span>
                  </div>
                );
              })}
            </Form.Item>

            <Form.Item
              label="Giá"
              name="totalPrice"
              rules={[
                {
                  required: true,
                  message: "Please input user address!",
                },
              ]}
            >
              {/* <InputComponent value = {(stateOrdersDetails.totalPrice).toLocaleString()} onChange ={handleOnchangeDetails} name="totalPrice"/> */}
              <span>{stateOrdersDetails.totalPrice.toLocaleString()} VND</span>
            </Form.Item>

            <Form.Item
              label="Xác nhận"
              name="isConfirm"
              rules={[
                {
                  required: true,
                  message: "Please input isPaid!",
                },
              ]}
            >
              <Radio.Group
                onChange={handleOnchangeIsConfirmDetails}
                value={stateOrdersDetails?.isConfirm}
              >
                <Radio value={false}>False</Radio>
                <Radio value={true}>True</Radio>
              </Radio.Group>

              {/* <InputComponent
                value={stateOrdersDetails.isConfirm}
                onChange={handleOnchangeDetails}
                name="isConfirm"
              /> */}
            </Form.Item>

            <Form.Item
              label="Thanh toán"
              name="isPaid"
              rules={[
                {
                  required: true,
                  message: "Please input isPaid!",
                },
              ]}
            >
              <Radio.Group
                onChange={handleOnchangeIsPaidDetails}
                value={stateOrdersDetails?.isPaid}
              >
                <Radio value={false}>False</Radio>
                <Radio value={true}>True</Radio>
              </Radio.Group>
              {/* <InputComponent
                value={stateOrdersDetails.isPaid}
                onChange={handleOnchangeDetails}
                name="isPaid"
              /> */}
            </Form.Item>

            <Form.Item
              label="Vận chuyển"
              name="isDelivered"
              rules={[
                {
                  required: true,
                  message: "Please input product rating!",
                },
              ]}
            >
              <Radio.Group
                onChange={handleOnchangeIsDeliveryDetails}
                value={stateOrdersDetails?.isDelivered}
              >
                <Radio value={false}>False</Radio>
                <Radio value={true}>True</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Nhận hàng"
              name="isReceived"
              rules={[
                {
                  required: true,
                  message: "Please input product rating!",
                },
              ]}
            >
              <Radio.Group
                onChange={handleOnchangeIsReceivedDetails}
                value={stateOrdersDetails?.isReceived}
              >
                <Radio value={false}>False</Radio>
                <Radio value={true}>True</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Phương thức thanh toán"
              name="paymentMethod"
              rules={[
                {
                  required: true,
                  message: "Please input is Admin!",
                },
              ]}
            >
              {/* <InputComponent value = {stateOrdersDetails.paymentMethod} onChange ={handleOnchangeDetails} name="paymentMethod"/> */}
              <span>{stateOrdersDetails.paymentMethod}</span>
            </Form.Item>
            <Form.Item
              label="Ngày tạo"
              name="createdAt"
              rules={[
                {
                  required: true,
                  message: "Please input is Admin!",
                },
              ]}
            >
              {/* <InputComponent value = {stateOrdersDetails.createdAt} onChange ={handleOnchangeDetails} name="createdAt"/> */}
              <span>{stateOrdersDetails?.createdAt}</span>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 20,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>

      <ModalComponent
        title="Xóa người dùng"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={() => handleCancelOrder(rowSelected)}
      >
        <Loading isLoading={isLoadingDeleted}>
          <div>Bạn có chắc hủy đơn hàng này không?</div>
        </Loading>
      </ModalComponent>

      <ModalComponent
        title="In đơn hàng"
        open={isModalOpenPrint}
        onCancel={handleCancelPrint}
        onOk={handlePrintOneOrder}
      >
        <div>Bạn có chắc in đơn hàng này không?</div>
      </ModalComponent>
    </div>
  );
};

export default AdminOrder;
