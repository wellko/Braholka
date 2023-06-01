import React, { useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Register from './features/users/Register';
import Login from './features/users/Login';
import Layout from './components/UI/Layout/Layout';
import DealsForm from './features/deals/components/DealsForm';
import ProtectedRoute from './components/UI/ProtectedRoute/ProtectedRoute';
import { useAppSelector } from './app/hooks';
import { selectUser, selectUserSuccess } from './features/users/UsersSlice';
import DealsPage from './features/deals/DealsPage';
import CategoriesForm from './features/categories/components/CategoriesForm';
import DealPage from './features/deals/DealPage';
import MyDealsPage from './features/deals/MyDealsPage';
import DealsUnpublished from './features/deals/DealsUnpublished';
import { selectDealSuccess } from './features/deals/DealsSlice';
import { enqueueSnackbar } from 'notistack';
import { selectCategoriesSuccess } from './features/categories/CategoriesSlice';

function App() {
  const user = useAppSelector(selectUser);
  const dealSuccess = useAppSelector(selectDealSuccess);
  const userSuccess = useAppSelector(selectUserSuccess);
  const categorySuccess = useAppSelector(selectCategoriesSuccess);

  useEffect(() => {
    if (dealSuccess) {
      enqueueSnackbar(dealSuccess.message, { variant: 'success', preventDuplicate: true });
    }
  }, [dealSuccess]);
  useEffect(() => {
    if (userSuccess) {
      enqueueSnackbar(userSuccess.message, { variant: 'success', preventDuplicate: true });
    }
  }, [userSuccess]);
  useEffect(() => {
    if (categorySuccess) {
      enqueueSnackbar(categorySuccess.message, { variant: 'success', preventDuplicate: true });
    }
  }, [categorySuccess]);

  return (
    <>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path="*" element={<h1>Page not Found</h1>} />
          <Route path={'/'} element={<DealsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/deals/:id" element={<DealPage />} />
          <Route
            path="/deals/:id/edit"
            element={
              <ProtectedRoute isAllowed={user && Boolean(user)}>
                <DealsForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addDeal"
            element={
              <ProtectedRoute isAllowed={user && Boolean(user)}>
                <DealsForm />
              </ProtectedRoute>
            }
          />{' '}
          <Route
            path="/myDeals"
            element={
              <ProtectedRoute isAllowed={user && Boolean(user)}>
                <MyDealsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addCategory"
            element={
              <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                <CategoriesForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/deals/unPublished"
            element={
              <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                <DealsUnpublished />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
