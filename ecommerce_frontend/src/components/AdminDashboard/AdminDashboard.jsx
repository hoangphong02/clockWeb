import { AppstoreOutlined, ContactsOutlined, DollarOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useSelector } from 'react-redux';
// import 
// { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
//  from 'react-icons/bs'
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } 
 from 'recharts';
import * as UserService from '../../services/UserService'
import * as ProductService from '../../services/ProductService'
import * as OrderService from '../../services/OrderService'
import * as ContactService from '../../services/ContactService'
const AdminDashboard = () => {
    const user = useSelector((state)=> state?.user)
      const getAllUsers = async () => {
    const res = await UserService.getAllUser(user?.access_token)
    return res
  }
  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct("",1000)
    return res
  }
  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token)
    return res
    
  }
  
    const getAllContact = async () => {
    const res = await ContactService.getAllContact()
    return res
  }

const queryUser = useQuery({ queryKey: ['users'], queryFn: getAllUsers })
const queryProduct = useQuery({ queryKey: ['products'], queryFn: getAllProducts })
const queryOrder = useQuery({ queryKey: ['orders'], queryFn: getAllOrder })
const queryContact = useQuery({ queryKey: ['contacts'], queryFn: getAllContact })


  const {data: contacts } = queryContact
  const {data: orders } = queryOrder
  const { data: products } = queryProduct
const {data: users } = queryUser

const totalPriceReceived = orders?.data.reduce((total, order) => {
  if (order.isReceived) {
    return total + order.totalPrice;
  } else {
    return total;
  }
}, 0);

const currentDate = new Date()
const currentMonth = currentDate.getMonth()+1;
const currentYear = currentDate.getFullYear()
console.log("date", currentMonth, currentYear)

const totalPriceReceivedOfMonth = orders?.data.reduce((total, order) => {
  const updatedAtDate = new Date(order.updatedAt);
  const orderMonth = updatedAtDate.getMonth() + 1;
  const orderYear = updatedAtDate.getFullYear();
  if (order.isReceived && orderMonth === currentMonth && orderYear === currentYear) {
    return total + order.totalPrice;
  } else {
    return total;
  }
}, 0);



console.log("products",products)
    const monthlyOrders={}
  Array.isArray(orders?.data) &&  orders?.data?.forEach(order=>{
        const orderDate = new Date(order?.createdAt)
       
        const month= orderDate.getMonth()+1
        console.log("month",month)
        const monthKey = `thang${month}`;
        if (monthlyOrders[monthKey]) {
    monthlyOrders[monthKey].uv += 1;
  } else {
    monthlyOrders[monthKey] = { name: monthKey, uv: 1 };
  }
    })
    const data = Object.values(monthlyOrders);
    
    //  const data = [
    //     {
    //       name: 'Page A',
    //       uv: 4000,
    //       pv: 2400,
    //       amt: 2400,
    //     },
    //     {
    //       name: 'Page B',
    //       uv: 3000,
    //       pv: 1398,
    //       amt: 2210,
    //     },
    //     {
    //       name: 'Page C',
    //       uv: 2000,
    //       pv: 9800,
    //       amt: 2290,
    //     },
    //     {
    //       name: 'Page D',
    //       uv: 2780,
    //       pv: 3908,
    //       amt: 2000,
    //     },
    //     {
    //       name: 'Page E',
    //       uv: 1890,
    //       pv: 4800,
    //       amt: 2181,
    //     },
    //     {
    //       name: 'Page F',
    //       uv: 2390,
    //       pv: 3800,
    //       amt: 2500,
    //     },
    //     {
    //       name: 'Page G',
    //       uv: 3490,
    //       pv: 4300,
    //       amt: 2100,
    //     },
    //   ];
  return (
    <div style={{margin: "0",
  padding: "0",
  backgroundColor: "none",
  color: "#9e9ea4",
  fontFamily: "'Montserrat', sans-serif"}}>
    <main className='main-container'>
       

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>DOANH THU</h3>
                    <DollarOutlined  className='card_icon'/> 
                </div>
                <h2>{totalPriceReceived?.toLocaleString()} </h2>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>DOANH THU THÁNG</h3>
                    <DollarOutlined className='card_icon'/>
                </div>
                <h2>{totalPriceReceivedOfMonth?.toLocaleString()}</h2>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>ĐƠN HÀNG</h3>
                    <ShoppingCartOutlined className='card_icon'/>
                </div>
                <h2>{orders?.data?.length ? orders?.data?.length : 0}</h2>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>LIÊN HỆ</h3>
                    <ContactsOutlined  className='card_icon'/>
                </div>
                <h2>{contacts?.data?.length ? contacts?.data?.length : 0}</h2>
            </div>
        </div>

        <div className='charts'>
            {/* <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer> */}
            <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>

        </div>
    </main>
    </div>
  )
}

export default AdminDashboard