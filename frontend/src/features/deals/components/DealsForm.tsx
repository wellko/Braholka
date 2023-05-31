import React, { useEffect, useState } from 'react';
import { DealType } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/UsersSlice';
import { FormControlLabel, MenuItem, Switch, TextField } from '@mui/material';
import { conditionArray } from '../../../constants';
import FileInput from '../../../components/UI/FileInput/FileInput';
import { createDeal, editDeal, getOneDeal } from '../DealsThunks';
import { getCategories } from '../../categories/CategoriesThunks';
import { selectCategories } from '../../categories/CategoriesSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { selectDeal } from '../DealsSlice';

const DealsForm = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const currentDeal = useAppSelector(selectDeal);
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const categories = useAppSelector(selectCategories);
  const initialState: DealType = {
    title: '',
    description: '',
    purchasePrice: 0,
    image: null,
    condition: '',
    category: '',
    tradeOn: '',
    owner: user ? user._id : '',
  };

  const [state, setState] = useState<DealType>(initialState);
  const [trade, setTrade] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getCategories());
    if (id) {
      dispatch(getOneDeal(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentDeal && id) {
      setState({
        title: currentDeal.title,
        description: currentDeal.description,
        purchasePrice: currentDeal.purchasePrice,
        image: null,
        condition: currentDeal.condition,
        category: currentDeal.category._id,
        tradeOn: currentDeal.tradeOn,
        owner: currentDeal.owner._id,
      });
      setTrade(currentDeal.purchasePrice > 0);
    }
  }, [currentDeal, id]);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (id && currentDeal) {
      await dispatch(editDeal({ ...state, _id: currentDeal._id }));
    } else {
      await dispatch(createDeal(state));
    }
    navigate('/');
  };

  const switcherChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setState((prev) => ({ ...prev, tradeOn: '' }));
    } else {
      setState((prev) => ({ ...prev, purchasePrice: 0 }));
    }
    setTrade(event.target.checked);
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: files && files[0] ? files[0] : null,
    }));
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <h2>{id ? 'Редактировать сделку' : 'Создать Сделку'}</h2>
      <FormControlLabel
        control={<Switch onChange={switcherChangeHandler} checked={trade} />}
        label={trade ? 'Выкуп' : 'Обмен'}
      />
      <div className="form_input_group">
        <input
          name="title"
          type="input"
          className="form_input"
          placeholder="Тайтл"
          pattern="^[A-Za-zА-Яа-яЁё]{1}+[A-Za-zА-Яа-яЁё/s]+$"
          value={state.title}
          required
          onChange={inputChangeHandler}
        />
        <label htmlFor="title" className="form_input_label">
          Тайтл :
        </label>
      </div>
      <div className="form_input_group">
        <textarea
          rows={4}
          value={state.description}
          name="description"
          className="form_input"
          placeholder="Описание"
          onChange={inputChangeHandler}
          required
        />
        <label htmlFor="title" className="form_input_label">
          Описание :
        </label>
      </div>
      <TextField
        sx={{ mt: '25px', minWidth: '35%' }}
        select
        label="Состояние"
        name="condition"
        value={state.condition}
        onChange={inputChangeHandler}
        required
      >
        {conditionArray.map((el) => (
          <MenuItem key={el} value={el}>
            {el}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        sx={{ mt: '25px', minWidth: '35%' }}
        select
        label="Категория"
        name="category"
        value={state.category}
        onChange={inputChangeHandler}
        required
      >
        {categories &&
          categories.map((el) => (
            <MenuItem key={el.name} value={el._id}>
              {el.name}
            </MenuItem>
          ))}
      </TextField>
      {trade ? (
        <div className="form_input_group">
          <input
            name="purchasePrice"
            type="number"
            className="form_input"
            value={state.purchasePrice}
            placeholder="Цена на выкуп"
            onChange={inputChangeHandler}
            min={1}
            required
          />
          <label htmlFor="title" className="form_input_label">
            Цена :
          </label>
        </div>
      ) : (
        <div className="form_input_group">
          <input
            name="tradeOn"
            type="input"
            className="form_input"
            placeholder="Обмен на"
            pattern="^[A-Za-zА-Яа-яЁё]{1}+[A-Za-zА-Яа-яЁё/s]+$"
            value={state.tradeOn}
            required
            onChange={inputChangeHandler}
          />
          <label htmlFor="title" className="form_input_label">
            Обмен :
          </label>
        </div>
      )}
      <FileInput onChange={fileInputChangeHandler} name="image" label="Загрузите картинку" />
      <button className="btn-form btn-create" type="submit">
        {id ? 'Обновить' : 'Создать'}
      </button>
    </form>
  );
};

export default DealsForm;
