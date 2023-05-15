import React, { useState } from 'react';
import { CategoryType } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import FileInput from '../../../components/UI/FileInput/FileInput';
import { createCategory } from '../CategoriesThunks';
import { selectCategoriesError } from '../CategoriesSlice';

const CategoriesForm = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectCategoriesError);
  const initialState: CategoryType = {
    name: '',
    image: null,
  };

  const [state, setState] = useState<CategoryType>(initialState);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(createCategory(state));
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
      <FileInput onChange={fileInputChangeHandler} name="image" label="Загрузите картинку" error={error} />
      <button className="btn-form btn-create" type="submit">
        Создать
      </button>
    </form>
  );
};

export default CategoriesForm;
