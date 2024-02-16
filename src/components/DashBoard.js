import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Typography, Card, CardContent, Paper, Box } from '@mui/material';
import { styled } from '@mui/system';
import { PieChart, Pie, Cell,LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import logos from '../SideMenu_Images/SideMenu_Toggle.png';
import te from '././Arba.jpg';
import CustomerList from './CustomerList';
import ProductDataGrid from './ProductDataGrid';

const data = [
  {name: 'Jan', uv: 4000, pv: 2400, amt: 2400},
  {name: 'Feb', uv: 3000, pv: 1398, amt: 2210},
  {name: 'Mar', uv: 2000, pv: 9800, amt: 2290},
  // Add more data as needed
];

// Define your colors for the pie chart
const COLORS = ['#0088FE', '#00C49F'];


const StyledCard = styled(Card)(() => ({
  flexBasis: 'calc(20% - 10px)',
  minWidth: 275,
  boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)',
}));


const DashBoard = () => {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8080/CRM/GetAllCustomer', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        setBookings(res.data.length);
    };

    fetchData();
}, []);


  const [productsSize, setProductsSize] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8080/CRM/GetAllProducts', {
          headers: { 'Authorization': `Bearer ${token}` }
      });
      setProductsSize(res.data.length);
    };

    fetchData();
  }, []);

  const [feebacksCounts, setfeebacksCounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8080/CRM/GetAllCustomerFeebacks', {
          headers: { 'Authorization': `Bearer ${token}` }
      });
      setfeebacksCounts(res.data.length);
    };

    fetchData();
  }, []);

  const cardData = [
    { title: 'Customers', value: bookings, subtitle: '+55% than last week', icon: logos },
    {  title: "Today's Users", value: 2300, subtitle: '+3% than last month', icon: te },
    {  title: 'FeedBacks', value: feebacksCounts, subtitle: '+1% than yesterday', icon: logos },
    {  title: 'Products', value: productsSize, subtitle: 'Just updated', icon: te },
  ];

  return (
    <div style={{ overflowY: 'auto' }}>
       <h2> Dashboard</h2>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, p: 2 }}>
        {cardData.map((card, index) => (
          <StyledCard key={index}>
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <img src={card.icon} alt="icon" style={{ width: 24, height: 24 }} />
                <Typography variant="h5" component="div">
                  {card.title}: {card.value}
                </Typography>
                <Typography variant="body2" component="p">
                  {card.subtitle}
                </Typography>
              </Box>
            </CardContent>
          </StyledCard>
        ))}
      </Box>

      <h2>Website Views</h2>
<Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, p: 2, overflowX: 'auto' }}>
  <Box>
    <Paper elevation={3} className="website-views-graph">
      <LineChart width={450} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
    </Paper>
  </Box>
  <Box>
  <Paper elevation={3} className="website-views-graph">
    <PieChart width={400} height={250}>
      <Pie
        data={data}
        cx={150}
        cy={150}
        labelLine={false}
        outerRadius={70}
        fill="#8884d8"
        dataKey="pv"
      >
        {
          data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
        }
      </Pie>
    </PieChart>
  </Paper>
</Box>
</Box>

      
    {/* List component */}
    <CustomerList />
    <ProductDataGrid/>

    </div>
  );
};

export default DashBoard;
