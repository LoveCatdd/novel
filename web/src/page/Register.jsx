import { Box, Card, Divider, FormHelperText, Input, Link } from '@mui/material'
import React, { useState } from 'react'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Logo from '../static/image/logo.png';
import styled from '@emotion/styled';
import { unAuthAxios } from '../api/axios';


const CustomButtonGreen = styled(Button)({
  backgroundColor: '#73AF58',
  border: '1px solid #13aa52',
  width: '500px',
  borderRadius: '4px',
  boxShadow: 'rgba(0, 0, 0, .1) 0 2px 4px 0',
  boxSizing: 'border-box',
  color: '#fff',
  cursor: 'pointer',
  fontFamily: '"Akzidenz Grotesk BQ Medium", -apple-system, BlinkMacSystemFont, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  outline: 'none',
  padding: '10px 25px',
  textAlign: 'center',
  transform: 'translateY(0)',
  transition: 'transform 150ms, box-shadow 150ms',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  touchAction: 'manipulation',
  position: 'relative',
  overflow: 'hidden',
  '&:after': {
    position: 'absolute',
    transform: 'translate(50%, 50%) rotate(-45deg)',
  },
  '&:hover': {
    boxShadow: 'rgba(0, 0, 0, .15) 0 3px 9px 0',
    transform: 'translateY(-2px)',
  },
  '@media (min-width: 768px)': {
    padding: '10px 30px',
  },
});

export const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = React.useState(false);
  const [passwordMsg, setPasswordMsg] = useState('');
  const [emailMsg, setEmailMsg] = useState('');
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmedPassword = () => setShowConfirmedPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const register = async () => {

    const pattern = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (pattern.test(email)) {
      setEmailMsg("");
    } else {
      setEmailMsg("邮箱格式错误");
      setEmail("");
      return;
    }

    try {
      const resp = await unAuthAxios('post','http://localhost:8088/api/v1/auth/register', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        confirmedPassword: confirmedPassword
      });
      const data = resp.data;
      setPasswordMsg('');
      setEmailMsg('');
      if (data.error_message === 'success') {
        navigate('/login');

      } else {
        data.error_code === "邮箱已存在" ? 
          setEmailMsg(data.error_code) : 
          setPasswordMsg(data.error_code);
      }
    } catch (error) {
      
    }
  }

  return (
    <Box sx={{bgcolor: '#171717', height: '90vh', color: 'white', paddingTop: '200px'}}>
      <Box sx={{display: 'flex', justifyContent: 'center', width: '100%', height: '355px'}} >
        <Box marginTop={12}>
          <img src={Logo}  alt='logo' height={200}/>
        </Box>
        <Divider color="grey" orientation="vertical" flexItem />
        <Box sx={{marginLeft: '10px'}}>
          <Typography gutterBottom variant="h5" component="div" sx={{display: 'flex', justifyContent:'center'}}>
            注册
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <FormControl sx={{ m: 1, width: '25ch' }}  variant="standard">
                <InputLabel htmlFor="component-simple" sx={{ color: 'white',
                  '&.Mui-focused': {
                    color: 'white',
                  }}}>名字</InputLabel>
                <Input
                required
                  sx={{
                    '&.MuiInput-underline:before': {
                      borderBottomColor: 'white !important',
                    },
                    '&.MuiFilledInput-root:&.Mui-focused': {
                      borderBottomColor: 'white', 
                    },
                    color: 'white'
                  }}
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  id="component-simple"
                  label="Amount"
                  />
              </FormControl>

              <FormControl sx={{ m: 1, width: '25ch'}}  variant="standard">
                <InputLabel htmlFor="component-simple" sx={{ color: 'white',
                  '&.Mui-focused': {
                    color: 'white',
                  }}}>姓氏</InputLabel>
                <Input
                  required
                  sx={{
                    '&.MuiInput-underline:before': {
                      borderBottomColor: 'white !important',
                    },
                    '&.MuiFilledInput-root:&.Mui-focused': {
                      borderBottomColor: 'white', 
                    },
                    color: 'white'
                  }}
                  id="component-simple"
                  label="Amount"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  />
              </FormControl>  
            </Box>
            
            <Box sx={{  }}>
              <FormControl error={emailMsg !== '' ? true : false} sx={{ m: 1, width: '51.8ch' }}  variant="standard">
                <InputLabel htmlFor="component-simple" sx={{ color: 'white',
                  '&.Mui-focused': {
                    color: 'white',
                  }}}>邮箱</InputLabel>
                <Input
                required
                  sx={{
                    '&.MuiInput-underline:before': {
                      borderBottomColor: 'white !important',
                    },
                    '&.MuiFilledInput-root:&.Mui-focused': {
                      borderBottomColor: 'white', 
                    },
                    color: 'white'
                  }}
                  value={email}
                  onChange={e => setEmail(e.target.value)}

                  id="component-simple"
                  label="Amount"
                  />
                  <FormHelperText id="component-error-text">{emailMsg}</FormHelperText>
              </FormControl>
            </Box>

            

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <FormControl sx={{ m: 1, width: '51.8ch' }} variant="standard">
                <InputLabel htmlFor="component-simple" sx={{ color: 'white',
                  '&.Mui-focused': {
                    color: 'white',
                  }}}>密码</InputLabel>
                <Input
                required
                  sx={{
                    '&.MuiInput-underline:before': {
                      borderBottomColor: 'white !important',
                    },
                    '&.Mui-focused': {
                      borderBottomColor: 'white', 
                    },
                    color: 'white'
                  }}
                  value={password}
                  onChange={e => setPassword(e.target.value)}

                  id="component-simple"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff sx={{color: 'grey'}} /> : <Visibility sx={{color: 'grey'}} />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <FormControl error={passwordMsg !== '' ? true : false} sx={{ m: 1, width: '51.8ch' }} variant="standard">
                <InputLabel htmlFor="component-simple" sx={{ color: 'white',
                  '&.Mui-focused': {
                    color: 'white',
                  }}}>确认密码</InputLabel>
                <Input
                  required
                  sx={{
                    '&.MuiInput-underline:before': {
                      borderBottomColor: 'white !important',
                    },
                    '&.Mui-focused': {
                      borderBottomColor: 'white', 
                    },
                    color: 'white'
                  }}
                  value={confirmedPassword}
                  onChange={e => setConfirmedPassword(e.target.value)}
                  id="component-simple"
                  type={showConfirmedPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmedPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                      {showConfirmedPassword ? <VisibilityOff sx={{color: 'grey'}} /> : <Visibility sx={{color: 'grey'}} />} 
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText id="component-error-text">{passwordMsg}</FormHelperText>

              </FormControl>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'flex-end', width: '100%', }}>
              <CustomButtonGreen  onClick={register}>
                注册
            </CustomButtonGreen>
            </Box>
        </Box>
      </Box>
    </Box>  
    )
}
