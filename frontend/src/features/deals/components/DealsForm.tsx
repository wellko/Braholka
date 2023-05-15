import React, { useState } from 'react';
import { DealType } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/UsersSlice';
import { MenuItem, TextField } from '@mui/material';
import { conditionArray } from '../../../constants';
import FileInput from '../../../components/UI/FileInput/FileInput';
import { createDeal } from '../DealsThunks';

const DealsForm = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const initialState: DealType = {
    title: '',
    description: '',
    purchasePrice: 0,
    image: null,
    condition: '',
    category: '',
    owner: user!._id,
  };

  const [state, setState] = useState<DealType>(initialState);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(createDeal(state));
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
      <h2>Создать Сделку</h2>
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
        {conditionArray.map((el) => (
          <MenuItem key={el} value={el}>
            {el}
          </MenuItem>
        ))}
      </TextField>

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
      <FileInput onChange={fileInputChangeHandler} name="image" label="Загрузите картинку" />
      <button className="btn-form btn-create" type="submit">
        Создать
      </button>
    </form>
  );
};

export default DealsForm;
