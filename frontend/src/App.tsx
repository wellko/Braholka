import React from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Register from './features/users/Register';
import Login from './features/users/Login';
import Layout from './components/UI/Layout/Layout';

function App() {
  return (
    <>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path={'/'} element={<div />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
