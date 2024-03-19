import {
  AppstoreOutlined,
  ContactsOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useSelector } from "react-redux";
// import
// { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
//  from 'react-icons/bs'
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import * as UserService from "../../services/UserService";
import * as ProductService from "../../services/ProductService";
import * as OrderService from "../../services/OrderService";
import * as ContactService from "../../services/ContactService";
import AdminHeader from "../AdminHeader/AdminHeader";
import CustomShapeBarchart from "./CustomShapeBarchart";
import SimpleBarChart from "./SimpleBarChart";
const AdminDashboard = () => {
  const user = useSelector((state) => state?.user);
  const getAllUsers = async () => {
    const res = await UserService.getAllUser(user?.access_token);
    return res;
  };
  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct("", 1000);
    return res;
  };
  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token);
    return res;
  };

  const getAllContact = async () => {
    const res = await ContactService.getAllContact();
    return res;
  };

  const queryUser = useQuery({ queryKey: ["users"], queryFn: getAllUsers });
  const queryProduct = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  const queryOrder = useQuery({ queryKey: ["orders"], queryFn: getAllOrder });
  const queryContact = useQuery({
    queryKey: ["contacts"],
    queryFn: getAllContact,
  });

  const { data: contacts } = queryContact;
  const { data: orders } = queryOrder;
  const { data: products } = queryProduct;
  const { data: users } = queryUser;

  console.log("products", products);

  const totalPriceReceived = orders?.data?.reduce((total, order) => {
    if (order.isReceived) {
      return total + order.totalPrice;
    } else {
      return total;
    }
  }, 0);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  console.log("date", currentMonth, currentYear);

  const totalPriceReceivedOfMonth = orders?.data?.reduce((total, order) => {
    const updatedAtDate = new Date(order.updatedAt);
    const orderMonth = updatedAtDate.getMonth() + 1;
    const orderYear = updatedAtDate.getFullYear();
    if (
      order.isReceived &&
      orderMonth === currentMonth &&
      orderYear === currentYear
    ) {
      return total + order.totalPrice;
    } else {
      return total;
    }
  }, 0);

  console.log("products", products);
  const monthlyOrders = {};
  Array.isArray(orders?.data) &&
    orders?.data?.forEach((order) => {
      const orderDate = new Date(order?.createdAt);

      const month = orderDate.getMonth() + 1;
      console.log("month", month);
      const monthKey = `thang${month}`;
      if (monthlyOrders[monthKey]) {
        monthlyOrders[monthKey].uv += 1;
      } else {
        monthlyOrders[monthKey] = { name: monthKey, uv: 1 };
      }
    });
  const data = Object.values(monthlyOrders);
  console.log("data", data);

  const test = [
    { type: "tết", count: 10, selled: 4 },
    { type: "halloween", count: 4, selled: 5 },
    { type: "tết", count: 20, selled: 2 },
    { type: "trung thu", count: 24 },
    { type: "tết", count: 5 },
    { type: "halloween", count: 4, selled: 4 },
    { type: "tết", count: 15 },
    { type: "trung thu", count: 4, selled: 2 },
  ];
  // [
  //   { type: "tết", total: 50, totalSell: 6 },
  //   { type: "halloween", total: 8, totalSell: 9 },
  //   { type: "trung thu", total: 2, totalSell: 2 },
  // ];
  const transformedDataCountInStock = products?.data?.reduce((acc, curr) => {
    const existingItem = acc.findIndex((item) => item.name === curr.type);
    if (existingItem !== -1) {
      acc[existingItem].uv += curr.countInStock;
    } else {
      acc.push({ name: curr.type, uv: curr.countInStock });
    }
    return acc;
  }, []);
  console.log("transformedData", transformedDataCountInStock);
  const transformedDataCountInStockAndSelled = products?.data?.reduce(
    (acc, curr) => {
      const existingItem = acc.findIndex((item) => item.name === curr.type);
      if (existingItem !== -1) {
        acc[existingItem].uv += curr.countInStock;
        acc[existingItem].pv += curr?.selled || 0;
      } else {
        acc.push({
          name: curr.type,
          uv: curr.countInStock,
          pv: curr.selled || 0,
        });
      }
      return acc;
    },
    []
  );
  console.log(
    "transformedDataCountInStockAndSelled",
    transformedDataCountInStockAndSelled
  );
  return (
    <div>
      <AdminHeader textHeader={"Dashboard"} />
      <div
        style={{
          margin: "0",
          padding: "0",
          backgroundColor: "none",
          color: "#9e9ea4",
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        <main className="main-container">
          <div className="main-cards">
            <div className="card">
              <div className="card-inner">
                <h3>DOANH THU</h3>
                <DollarOutlined className="card_icon" />
              </div>
              <h2>{totalPriceReceived?.toLocaleString()} </h2>
            </div>
            <div className="card">
              <div className="card-inner">
                <h3>DOANH THU THÁNG</h3>
                <DollarOutlined className="card_icon" />
              </div>
              <h2>{totalPriceReceivedOfMonth?.toLocaleString()}</h2>
            </div>
            <div className="card">
              <div className="card-inner">
                <h3>ĐƠN HÀNG</h3>
                <ShoppingCartOutlined className="card_icon" />
              </div>
              <h2>{orders?.data?.length ? orders?.data?.length : 0}</h2>
            </div>
            <div className="card">
              <div className="card-inner">
                <h3>LIÊN HỆ</h3>
                <ContactsOutlined className="card_icon" />
              </div>
              <h2>{contacts?.data?.length ? contacts?.data?.length : 0}</h2>
            </div>
          </div>

          <div
            style={{
              padding: "30px 0",
              fontSize: "17px",
              background: "rgb(23 24 43)",
              marginTop: "20px",
              borderRadius: "15px",
            }}
          >
            <p style={{ padding: "0 20px", marginBottom: "0" }}>
              Biểu đồ số lượng đơn hàng theo tháng
            </p>
            <div className="charts" style={{ marginTop: "30px" }}>
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
                  <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </AreaChart>
              </ResponsiveContainer>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                    top: 5,
                    right: 50,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div
            style={{
              padding: "30px 0",
              fontSize: "17px",
              background: "rgb(23 24 43)",
              marginTop: "20px",
              borderRadius: "15px",
            }}
          >
            <p style={{ padding: "0 20px", marginBottom: "0" }}>
              Biểu đồ số lượng sản phẩm tồn kho
            </p>
            <div className="charts" style={{ marginTop: "50px" }}>
              <CustomShapeBarchart data={transformedDataCountInStock} />
              <SimpleBarChart data={transformedDataCountInStockAndSelled} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
