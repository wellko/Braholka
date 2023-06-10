import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { RegisterMutation } from '../../types';
import { Alert, Avatar, Box, CircularProgress, Container, Grid, Link, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectRegisterError, selectRegisterLoading } from './UsersSlice';
import { register } from './UsersThunks';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';

const Register = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();
  const loading = useAppSelector(selectRegisterLoading);

  const [state, setState] = useState<RegisterMutation>({
    username: '',
    password: '',
    displayName: '',
    phoneNumber: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      await dispatch(register(state)).unwrap();
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  const phoneChangeHandler = (newPhone: string) => {
    setState((prevState) => ({ ...prevState, phoneNumber: newPhone }));
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        {error && error.errors && error.errors.username ? (
          <Alert severity="error" sx={{ mt: 3, width: '100%' }}>
            {error.errors.username.message}
          </Alert>
        ) : (
          error && (
            <Alert severity="error" sx={{ mt: 3, width: '100%' }}>
              {error.errors.phoneNumber.message}
            </Alert>
          )
        )}
        <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid container item xs={12}>
              <div className="inputbox">
                <input required name="username" value={state.username} onChange={inputChangeHandler} />
                <span>Имя пользователя</span>
                <i></i>
              </div>
            </Grid>
            <Grid container item xs={12}>
              <div className="inputbox">
                <input required name="password" value={state.password} onChange={inputChangeHandler} type="password" />
                <span>Пароль</span>
                <i></i>
              </div>
            </Grid>
            <Grid item xs={7}>
              <PhoneInput
                onChange={phoneChangeHandler}
                defaultCountry={'KG'}
                international
                inputstyle={{ padding: '10px', fontSize: '20px' }}
                countryCallingCodeEditable={false}
                name="phoneNumber"
                value={state.phoneNumber}
                error={state.phoneNumber && (isValidPhoneNumber(state.phoneNumber) ? undefined : 'wrong number')}
              />
            </Grid>
            <Grid container item xs={12}>
              <div className="inputbox">
                <input required name="displayName" value={state.displayName} onChange={inputChangeHandler} />
                <span>Имя</span>
                <i></i>
              </div>
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <button className="btn-form btn-login" type="submit">
              {loading ? <CircularProgress size={25} /> : 'Регистрация'}
            </button>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Уже есть аккаунт? Войти
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
