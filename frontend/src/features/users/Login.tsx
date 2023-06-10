import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { LoginMutation } from '../../types';
import { Alert, Avatar, Box, CircularProgress, Container, Grid, Link, Typography } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { googleLogin, login } from './UsersThunks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectLoginError, selectLoginLoading } from './UsersSlice';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [state, setState] = useState<LoginMutation>({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectLoginError);
  const loading = useAppSelector(selectLoginLoading);
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      await dispatch(login(state)).unwrap();
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        style={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Войти
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mt: 3, width: '100%' }}>
            {error.error}
          </Alert>
        )}
        <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid container item xs={12}>
              <div className="inputbox">
                <input
                  required
                  name="username"
                  autoComplete="current-username"
                  value={state.username}
                  onChange={inputChangeHandler}
                  type="text"
                />
                <span>Имя пользователя</span>
                <i></i>
              </div>
            </Grid>
            <Grid container item xs={12}>
              <div className="inputbox">
                <input
                  required
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={state.password}
                  onChange={inputChangeHandler}
                />
                <span>Пароль</span>
                <i></i>
              </div>
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <button className="btn-form btn-login" type="submit">
              {loading ? <CircularProgress size={25} /> : 'Войти'}
            </button>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                Зарегестрироваться
              </Link>
            </Grid>
          </Grid>
          <Grid container item sx={{ pt: 5 }} gap={2}>
            <Grid item xs={6} m="auto">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  if (credentialResponse.credential) {
                    void googleLoginHandler(credentialResponse.credential);
                  }
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </Grid>
            <Grid item xs={6} m="auto"></Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
