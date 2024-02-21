
import React, { useEffect, useRef, useState } from 'react'
import {  WrapperAvatar, WrapperHeader } from './style'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import { Button, Checkbox, Form, Input, Modal, Select, Space } from 'antd'
import * as message from '../../components/Message/Message'
import InputComponent from '../InputComponent/InputComponent'
import { useMutationHook } from '../../hooks/useMutationHook';
import Loading from '../../components/Loading/Loading';
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import ModalComponent from '../ModalComponent/ModalComponent'
import * as OrderService from '../../services/OrderService'
import PieChartComponent from './PieChartComponent'


const AdminOrder = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const user = useSelector((state) => state?.user)
  
  
  const searchInput = useRef(null);
 
     const [stateOrdersDetails, setStateOrdersDetails] =useState({
        id:'',
        name:'',
        address:'',
        phone:'',
        totalPrice:'',
        orderItems:[],
        isPaid: false,
        isDelivered: false,
        isConfirm: false,
        isReceived: false,
        createdAt:'',
        paymentMethod:''

    })
   

  const [form] = Form.useForm();


  const mutationUpdate = useMutationHook(
    (data) => {
      console.log("dataUser",data)
      const { id,
        token,
        ...rests } = data
      const res = OrderService.updateOrder(
        id,
          token,{ ...rests },)
      return res
    },
  )



  const mutationDeleted = useMutationHook(
    (data)=>{
        const {id, token, orderItems, userId} = data
        const res = OrderService.cancelOrder(id, token, orderItems,userId)
        return res
      }
  )
    
  console.log("rowSe",rowSelected)

const getItems = (rowSelected) => {
  console.log("orderData",orders?.data)
  let orderItems = []; 
  orders?.data?.forEach((order) => {
    if (order?._id === rowSelected) {
      order?.orderItems.forEach((item)=>{
          orderItems.push(item)
      })
    }
  });

  return orderItems;
}
  
  
    const handleCancelOrder = async (rowSelected)=>{
      console.log("getItem",getItems(rowSelected))
        mutationDeleted.mutate({id: rowSelected, token: user?.access_token, orderItems: getItems(rowSelected), userId: user?.id},{
          onSuccess:()=>{
            queryOrder.refetch()
          }
        })
    }

  // const mutationDeletedMany = useMutationHook(
  //   (data) => {
  //     const { 
  //       token, ...ids
  //     } = data
  //     const res = UserService.deleteManyUser(
  //       ids,
  //       token)
  //     return res
  //   },
  // )

  


  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token)
    return res
  }
  console.log("Order",getAllOrder())

  

 const fetchGetDetailsOrder = async (rowSelected) => {
    const res = await OrderService.getDetailOrder(rowSelected)
    console.log("resta",res.data)
    if (res?.data) {
      setStateOrdersDetails({
        _id: res?.data?._id,
        name: res?.data?.shippingAddress?.fullName,
        address: `${res?.data?.shippingAddress?.address} -${res?.data?.shippingAddress?.city} `,
        phone:res?.data?.shippingAddress?.phone,
        totalPrice:res?.data?.totalPrice,
        orderItems: res?.data?.orderItems,
        isPaid: res?.data?.isPaid,
        isDelivered: res?.data?.isDelivered,
        isConfirm: res?.data?.isConfirm,
        isReceived: res?.data?.isReceived,
        createdAt:res?.data?.createdAt,
        paymentMethod:res?.data?.paymentMethod
    
      })
    }
    setIsLoadingUpdate(false)
  }
  console.log("stateOrderdetailse",stateOrdersDetails)

  useEffect(() => {
    if(!isModalOpen) {
      form.setFieldsValue(stateOrdersDetails)
    }
  }, [form, stateOrdersDetails, isModalOpen])


  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true)
      fetchGetDetailsOrder(rowSelected)
    }
  }, [rowSelected, isOpenDrawer])

  const handleDetailsOrder = () => {
    setIsOpenDrawer(true)
  }

  const handleDeleteManyUser =(ids)=>{
    // mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
    //   onSettled: () => {
    //     queryUser.refetch()
    //   }
    // })
  }
  const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
//  const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany

  
  const queryOrder = useQuery({ queryKey: ['orders'], queryFn: getAllOrder })


  const { isLoading: isLoadingOrder, data: orders } = queryOrder

   console.log("orders",orders?.data)
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
        <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsOrder} />
      </div>
    )
  }


  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters,confirm) => {
    clearFilters();
    // setSearchText('');
    confirm()
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
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
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
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
            onClick={() => clearFilters && handleReset(clearFilters,confirm)}
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
          color: filtered ? '#1890ff' : undefined,
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
        title: 'User Name',
        dataIndex: 'userName',
        render: (text) => <a>{text}</a>,
        sorter: (a,b) => a.userName.length - b.userName.length,
        ...getColumnSearchProps('userName')
      },
      {
        title: 'phone',
        dataIndex: 'phone',
        sorter: (a,b) => a.phone.length - b.phone.length,
        ...getColumnSearchProps('phone')
      
    
      },
      {
        title: 'Address',
      dataIndex: 'address',
      sorter: (a, b) => a.address.length - b.address.length,
      ...getColumnSearchProps('address')
      },
      {
        title: 'Confirm',
        dataIndex: 'isConfirm',
        sorter: (a,b) => a.name - b.name,
        ...getColumnSearchProps('isConfirm')
      },
      {
        title: 'Received',
        dataIndex: 'isReceived',
        sorter: (a,b) => a.name - b.name,
        ...getColumnSearchProps('isReceived')
      },
      {
        title: 'Paid',
        dataIndex: 'isPaid',
        sorter: (a,b) => a.name - b.name,
        ...getColumnSearchProps('isPaid')
      },
      {
        title: 'Delivered',
      dataIndex: 'isDelivered',
      sorter: (a, b) => a.isDelivered.length - b.isDelivered.length,
      ...getColumnSearchProps('isDelivered')
      },
      {
      title: 'Payment method',
      dataIndex: 'paymentMethod',
      sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
      ...getColumnSearchProps('paymentMethod')
    },
    {
      title: 'Total price',
      dataIndex: 'totalPrice',
      sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
      ...getColumnSearchProps('totalPrice')
    },
      {
        title: 'Action',
        dataIndex: 'action',
        render: renderAction,
      },
    ];
   const dataTable = orders?.data?.length && orders?.data?.map((order)=>{
    return {
      ...order,
      key: order._id,
      isPaid: order?.isPaid? 'TRUE' : 'FALSE',
      userName: order?.shippingAddress?.fullName,
      phone: order?.shippingAddress?.phone,
      address: order?.shippingAddress?.address,
      isConfirm:order?.isConfirm? 'TRUE' : 'FALSE',
      isReceived:order?.isReceived? 'TRUE' : 'FALSE',
      isDelivered: order?.isDelivered ? 'TRUE' : 'FALSE',
      totalPrice:`${(order?.totalPrice).toLocaleString()} VND`
    }
   })

  useEffect(() => {
    if (isSuccessDelected && dataDeleted?.status === 'OK') {
      message.success()
      handleCancelDelete()
    } else if (isErrorDeleted) {
      message.error()
    }
  }, [isSuccessDelected])

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    form.resetFields()
  };

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === 'OK') {
      message.success()
      handleCloseDrawer()
    } else if (isErrorUpdated) {
      message.error()
    }
  }, [isSuccessUpdated])

  // useEffect(() => {
  //   if (isSuccessDelectedMany && dataDeletedMany?.status === 'OK') {
  //     message.success()
  //     handleCancelDelete()
  //   } else if (isErrorDeletedMany) {
  //     message.error()
  //   }
  // }, [isSuccessDelectedMany])

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false)
  }

  const handleOnchangeDetails = (e) => {
    if(e.target.name === "isPaid" || e.target.name ==="isDelivered" || e.target.name ==="isConfirm" || e.target.name ==="isReceived"){
      e.target.value =( e.target.value ).toLowerCase()
    }
    if(e.target.name ==="isReceived"){
      if(e.target.value === "true"){
         setStateOrdersDetails({
      ...stateOrdersDetails,
      isReceived: e.target.value,
      isConfirm: true,
      isDelivered:true,
      isPaid: true
    })
      }
    }
    else{
      setStateOrdersDetails({
        ...stateOrdersDetails,
        [e.target.name]: e.target.value
      })
    }
    console.log("stateOr",stateOrdersDetails)
  }



  
  const onUpdateOrder = () => {
    mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateOrdersDetails }, {
      onSettled: () => {
        queryOrder.refetch()
      }
    })
  }


 

  return (
    <div>
      <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
      <div style={{ display:"flex", marginBottom:"20px",padding:"20px", gap:"30px"}}>
      <div style={{width:"200px", height:"200px", textAlign:"center"}}>
      <PieChartComponent data={orders?.data} label ={"paymentMethod"} color={['#0088FE', '#00C49F']}/>
      <p style={{fontSize:"15px", fontWeight:"bold"}}>Phương thức thanh toán</p>
        </div>
      <div style={{width:"200px", height:"200px", textAlign:"center"}}>
      <PieChartComponent data={orders?.data} label ={"isConfirm"} color={['#FFBB28', '#FF8042']}/>
      <p style={{fontSize:"15px", fontWeight:"bold"}}>Xác nhận đơn hàng</p>
      </div>
      <div style={{width:"200px", height:"200px", textAlign:"center"}}>
      <PieChartComponent data={orders?.data} label ={"isDelivered"} color={['#258a3f', '#d61a2c']}/>
      <p style={{fontSize:"15px", fontWeight:"bold"}}>Vận chuyển đơn hàng</p>
      </div>
      </div>
      {/* <div style={{ marginTop: '10px' }}>
        <ButtonAddUser onClick={() => setIsModalOpen(true)}><PlusOutlined /></ButtonAddUser>
      </div> */}
      <div style={{ marginTop: '20px' }}>
        <TableComponent handleDeleteMany={handleDeleteManyUser} columns={columns} isLoading={isLoadingOrder} data={dataTable} onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              setRowSelected(record._id)
            }
          };
        }} />
      </div>
      <DrawerComponent title='Chi tiết đơn hàng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
        <Form form = {form}
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
      label="Id"
      name="_id"
      rules={[
        {
          required: true,
          message: 'Please input user id!',
        },
      ]}
    >
      {/* <InputComponent value = {stateOrdersDetails._id} onChange ={handleOnchangeDetails} name="_id"/> */}
      <span>{stateOrdersDetails._id}</span>
    </Form.Item>
    <Form.Item
      label="Name"
      name="name"
      rules={[
        {
          required: true,
          message: 'Please input user name!',
        },
      ]}
    >
      {/* <InputComponent value = {stateOrdersDetails.name} onChange ={handleOnchangeDetails} name="name"/> */}
        <span>{stateOrdersDetails.name}</span>
    </Form.Item>

    <Form.Item
      label="Address"
      name="address"
      rules={[
        {
          required: true,
          message: 'Please input user email!',
        },
      ]}
    >
      {/* <InputComponent value = {stateOrdersDetails.address} onChange ={handleOnchangeDetails} name="address"/> */}
       <span>{stateOrdersDetails.address}</span>
    </Form.Item>

    <Form.Item
      label="Phone"
      name="phone"
      rules={[
        {
          required: true,
          message: 'Please input user address!',
        },
      ]}
    >
      {/* <InputComponent value = {stateOrdersDetails.phone} onChange ={handleOnchangeDetails} name="phone"/> */}
      <span>{stateOrdersDetails.phone}</span>
    </Form.Item>

      <Form.Item
                label="Sản phẩm"
               
                
              >
                {stateOrdersDetails?.orderItems.map((order)=>{
                  return(              
                    <div>
                  <img src={order?.image} style={{
                      height: '60px',
                      width: '60px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginLeft: '10px'
                    }} alt="avatar" />
                    <span> Số lượng:  {order?.amount} </span>
                    <span>Giá sản phẩm: {(order?.price).toLocaleString()} VND</span>
                    </div>
                  )
                })}
        </Form.Item>

     <Form.Item
      label="TotalPrice"
      name="totalPrice"
      rules={[
        {
          required: true,
          message: 'Please input user address!',
        },
      ]}
    >
      {/* <InputComponent value = {(stateOrdersDetails.totalPrice).toLocaleString()} onChange ={handleOnchangeDetails} name="totalPrice"/> */}
      <span>{(stateOrdersDetails.totalPrice).toLocaleString()} VND</span>
    </Form.Item>

    <Form.Item
      label="Confirm"
      name="isConfirm"
      rules={[
        {
          required: true,
          message: 'Please input isPaid!',
        },
      ]}
    >
      
      <InputComponent value = {stateOrdersDetails.isConfirm} onChange ={handleOnchangeDetails} name="isConfirm"/>
      
    </Form.Item>

    <Form.Item
      label="Paid"
      name="isPaid"
      rules={[
        {
          required: true,
          message: 'Please input isPaid!',
        },
      ]}
    >
      
      <InputComponent value = {stateOrdersDetails.isPaid} onChange ={handleOnchangeDetails} name="isPaid"/>
      
    </Form.Item>

    <Form.Item
      label="IsDelivered"
      name="isDelivered"
      rules={[
        {
          required: true,
          message: 'Please input product rating!',
        },
      ]}
    >
      <InputComponent value = {stateOrdersDetails.isDelivered} onChange ={handleOnchangeDetails} name="isDelivered"/>
    </Form.Item>

    <Form.Item
      label="Received"
      name="isReceived"
      rules={[
        {
          required: true,
          message: 'Please input product rating!',
        },
      ]}
    >
      <InputComponent value = {stateOrdersDetails.isDelivered} onChange ={handleOnchangeDetails} name="isReceived"/>
    </Form.Item>
      
    <Form.Item
      label="PaymentMethod"
      name="paymentMethod"
      rules={[
        {
          required: true,
          message: 'Please input is Admin!',
        },
      ]}
    >
      {/* <InputComponent value = {stateOrdersDetails.paymentMethod} onChange ={handleOnchangeDetails} name="paymentMethod"/> */}
      <span>{stateOrdersDetails.paymentMethod}</span>
    </Form.Item>
    <Form.Item
      label="Created At"
      name="createdAt"
      rules={[
        {
          required: true,
          message: 'Please input is Admin!',
        },
      ]}
    >
      {/* <InputComponent value = {stateOrdersDetails.createdAt} onChange ={handleOnchangeDetails} name="createdAt"/> */}
       <span>{(stateOrdersDetails?.createdAt)}</span>
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
      
      <ModalComponent title="Xóa người dùng" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={() => handleCancelOrder(rowSelected)}>
        <Loading isLoading={isLoadingDeleted}>
          <div>Bạn có chắc hủy đơn hàng này không?</div>
        </Loading>
      </ModalComponent>
    </div>
  )
}

export default AdminOrder