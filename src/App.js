import React from 'react';
import { Routes, Route, Link } from "react-router-dom";

import './App.css';
import { Layout, Typography, Space } from 'antd';
import { Navbar } from './components';
import { Homepage, Cryptocurrencies, CryptoDetails, Exchanges, News } from './pages';

function App() {
  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/exchanges' element={<Exchanges />} />
            <Route path='/cryptocurrencies' element={<Cryptocurrencies />} />
            <Route path='/crypto/:coinId' element={<CryptoDetails />} />
            <Route path='/news' element={<News />} />
          </Routes>
        </Layout>
        
        <div className="footer">
          <Typography.Title level={5} style={{color: 'white', textAlign: 'center'}}>
            Cryptoverse <br />
            All Right Reserved.
          </Typography.Title>
          <Space>
            <Link to='/'>Home</Link>
            <Link to='/exchanges'>Exchanges</Link>
            <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
            <Link to='/crypto/:coinId'>CryptoDetails</Link>
            <Link to='/news'>News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
