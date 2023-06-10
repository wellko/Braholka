import React, { useState } from 'react';
import { CategoryMutation } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createCategory } from '../CategoriesThunks';
import { useNavigate } from 'react-router-dom';
import { selectCategoriesLoading } from '../CategoriesSlice';

const CategoriesForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectCategoriesLoading);
  const initialState: CategoryMutation = {
    name: '',
  };

  const [state, setState] = useState<CategoryMutation>(initialState);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(createCategory(state));
    navigate('/');
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <h2>Создать Категорию</h2>
      <div className="form_input_group">
        <input
          name="name"
          type="input"
          className="form_input"
          placeholder="Название"
          pattern="^[A-Za-zА-Яа-яЁё]{1}+[A-Za-zА-Яа-яЁё/s]+$"
          value={state.name}
          required
          onChange={inputChangeHandler}
        />
        <label htmlFor="name" className="form_input_label">
          Название :
        </label>
      </div>
      <button disabled={loading} className="btn-form btn-create" type="submit">
        Создать
      </button>
    </form>
  );
};

export default CategoriesForm;
