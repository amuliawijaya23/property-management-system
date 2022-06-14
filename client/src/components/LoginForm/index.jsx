import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import './styles.scss';

export default function LoginForm(props) {
  const [values, setValues] = React.useState({
    username: '',
    password: '',
    showPassword: false
  });

  const handleChange = (prop) => (event) => {
    setValues({...values, [prop]: event.target.value});
  };

  const handleShowPassword = () => {
    setValues({...values, showPassword: !values.showPassword});
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className='form'>
      <div className="login-form">
        <div className="login-form__header">
          <Typography 
            variant='h4' 
            gutterBottom 
            component="h4"
            sx={{mb: "1rem"}}
          >
            Sign In
          </Typography>
        </div>
        <div className="login-form__input">
          <FormControl
            className='login-form__field'
            variant="standard"
            sx={{mb: "1rem"}}
          >
            <InputLabel htmlFor='standard-adornment-text'>
              Username
            </InputLabel>
            <Input 
              id='standard-adornment-text'
              type='text'
              value={values.username}
              onChange={handleChange('username')}
            />
          </FormControl>
          <FormControl
            className='login-form__field'
            variant="standard"
            sx={{mb: "1rem"}}
          >
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <div className="login-form__submit">
          <Button size='large' variant='outline'>Login</Button>
          <Button
            size='large'
            variant='outline'
            onClick={props.toggleLogin}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};