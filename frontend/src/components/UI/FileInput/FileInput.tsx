import React, { useRef, useState } from 'react';
import { ValidationError } from '../../../types';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Grid, TextField } from '@mui/material';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
  type?: string;
  error?: ValidationError | null;
}

const FileInput: React.FC<Props> = ({ onChange, name, label, type, error }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [filename, setFilename] = useState('');

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename('');
    }

    onChange(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <>
      <input style={{ display: 'none' }} type="file" accept={type} name={name} onChange={onFileChange} ref={inputRef} />
      <Grid container direction="row" spacing={2} alignItems="center">
        <Grid container item xs>
          <TextField
            sx={{ margin: '15px 0 0 auto' }}
            disabled
            label={label}
            value={filename}
            onClick={activateInput}
            error={Boolean(getFieldError(name))}
            helperText={getFieldError(name)}
          />
        </Grid>
        <Grid item xs>
          <Button sx={{ marginLeft: 'auto' }} type="button" variant="contained" onClick={activateInput}>
            <SearchIcon />
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FileInput;
