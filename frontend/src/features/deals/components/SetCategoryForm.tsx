import React, { useEffect, useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getCategories } from '../../categories/CategoriesThunks';
import { selectCategories } from '../../categories/CategoriesSlice';
import { getDeals, getDealsByCategory } from '../DealsThunks';
import { selectDealsLoading } from '../DealsSlice';

const SetCategoryForm = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const loading = useAppSelector(selectDealsLoading);
  const [params, setParams] = useState<string>('');
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const selectChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams(e.target.value);
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (params.length) {
      dispatch(getDealsByCategory(params));
    } else {
      dispatch(getDeals());
    }
  };
  return (
    <form onSubmit={onFormSubmit}>
      <TextField
        select
        label="Выбрать категорию"
        value={params}
        onChange={selectChangeHandler}
        sx={{ width: '80%', marginRight: '20px' }}
      >
        <MenuItem value="">Все</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category._id} value={category._id}>
            {category.name}
          </MenuItem>
        ))}
      </TextField>
      <button disabled={loading} type="submit" className="btn-form">
        Ок
      </button>
    </form>
  );
};

export default SetCategoryForm;
