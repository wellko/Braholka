import React from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Register from './features/users/Register';
import Login from './features/users/Login';
import Layout from './components/UI/Layout/Layout';
import DealsForm from './features/deals/components/DealsForm';
import ProtectedRoute from './components/UI/ProtectedRoute/ProtectedRoute';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/users/UsersSlice';
import DealsPage from './features/deals/DealsPage';

function App() {
  const user = useAppSelector(selectUser);

  return (
    <>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path={'/'} element={<DealsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/addDeal"
            element={
              <ProtectedRoute isAllowed={user && Boolean(user)}>
                <DealsForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
