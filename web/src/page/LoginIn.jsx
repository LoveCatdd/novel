import { Box, Card, Divider, Link} from '@mui/material'
import React, { useEffect, useState } from 'react'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import { useStore } from '../store/store';
import { useNavigate } from 'react-router';
import { styled } from '@mui/material/styles';

import Logo from '../static/image/logo.png';

const CustomButtonGreen = styled(Button)({
  backgroundColor: '#73AF58',
  border: '1px solid #13aa52',
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

const CustomButtonRed = styled(Button)({
  backgroundColor: '#E94545',
  border: '1px solid #f12821',
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
  '&:hover': {
    boxShadow: 'rgba(0, 0, 0, .15) 0 3px 9px 0',
    transform: 'translateY(-2px)',

  },
  '@media (min-width: 768px)': {
    padding: '10px 30px',
  },
});




export const LoginIn = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [emsg, setEmsg] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {userStore} = useStore();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const login = async () => {
    
    const pattern = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (pattern.test(email)) {
      setEmsg("");
    } else {
      setEmsg("邮箱格式错误");
      setEmail("");
      return;
    }

    const message = await userStore.login(email, password)
    if (message === '') {
      navigate('/');
    } else setEmsg(message)
  }

  useEffect(() => {
     const message =  userStore.updateUserInfoFromSessionStorage();
      if (message === 'success') {
        navigate('/');
      }
    },[])

  return (
    <Box sx={{bgcolor: '#171717', height: '90vh', color: 'white', paddingTop: '200px'}}>
      <Box sx={{display: 'flex', justifyContent: 'center', width: '100%', height: '300px'}} >
        <Box marginTop={6}>
          <img src={Logo}  alt='logo'  height={200}/>
        </Box>
        <Divider color="grey" orientation="vertical" flexItem />
        <Box sx={{marginLeft: '10px'}}>
          <Typography gutterBottom variant="h5" component="div" sx={{display: 'flex', justifyContent:'center'}}>
            登录
          </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <FormControl error={emsg === "邮箱格式错误" || emsg === '邮箱或密码错误' || emsg === '获取用户信息失败' ? true : false} sx={{ m: 1, width: '25ch' }}  variant="standard">
                <InputLabel htmlFor="component-simple" sx={{ color: 'white',
                  '&.Mui-focused': {
                    color: 'white',
                  }}}>邮箱</InputLabel>
                <Input
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
                  onChange={(e) => {setEmail(e.target.value);setEmsg("");}}
                  id="component-simple"
                  label="Amount"
                  required
                  />
                <FormHelperText id="component-error-text">{emsg}</FormHelperText>
                </FormControl>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <FormControl error={emsg === '邮箱或密码错误' ? true : false}  sx={{ m: 1, width: '25ch' }} variant="standard">
                <InputLabel htmlFor="component-simple" sx={{ color: 'white',
                  '&.Mui-focused': {
                    color: 'white',
                  }}}>密码</InputLabel>
                <Input
                  value={password}
                  onChange={e => {setPassword(e.target.value);setEmsg("");}}
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
                  required
                  />
                {emsg !== "邮箱格式错误" && emsg !== '获取用户信息失败' && <FormHelperText id="component-error-text">{emsg}</FormHelperText>}
              </FormControl>
            </Box>
              <Box sx={{marginTop: '30px', marginLeft: '5px'}}>
                <CustomButtonRed
                  size="medium"
                  onClick={login}
                  sx={{marginRight: '50px'}}
                  >
                    登录
                </CustomButtonRed>

                <Link href="register" underline="none" color='inherit'>
                  <CustomButtonGreen 
                    size="medium"
                  >
                    注册
                  </CustomButtonGreen>
                </Link>
              </Box>
          </Box>
        </Box>


    </Box>
  )
}
