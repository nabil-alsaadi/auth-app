import React from 'react';
import { Field, ErrorMessage } from 'formik';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { InputAdornment, TextField } from '@mui/material';

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, name, type, placeholder, className }) => {
  const renderIcon = (type: string) => {
    switch (type) {
        case 'email':
            return <EmailIcon />;
        case 'password':
            return <LockIcon />;
        case 'text':
            return <PersonIcon />;
        default:
            return null;
    }
    };
  return (
    <div className='field-container'>
      <label htmlFor={name}>{label}</label>
      {/* <Field type={type} name={name} placeholder={placeholder} className={`input ${className || ''}`} /> */}
      <Field name={name}>
        {({ field }: any) => (
          <TextField
            {...field}
            label={label}
            type={type}
            placeholder={placeholder}
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {renderIcon(type)}
                </InputAdornment>
              ),
            }}
            className={`input ${className || ''}`}
          />
        )}
      </Field>
      <div className='error'>
        <ErrorMessage name={name} component="div" />
      </div>
    </div>
  );
};

export default React.memo(FormField);
