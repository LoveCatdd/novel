import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import SiderBar from './SiderBar';
import '../css/NavBar.css'
import CssBaseline from '@mui/material/CssBaseline';
import { useStore } from '../store/store';
import Link from '@mui/material/Link';
import { Avatar, Button, Card, CardHeader, Divider } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { UserStore } from '../store/UserStore';
import { authAxios } from '../api/axios';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.45),
  },
  display: 'flex',
  alignItems: 'center', 
  justifyContent: 'flex-end', 
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(10),
    width: `calc(15em + ${theme.spacing(100)})`,
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer !important',
  zIndex: 2,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    zIndex: 1,
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: `calc(80ch + ${theme.spacing(35)})`,
    },
  },
}));


export default function NavBar({ children }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [opened, setOpended] = React.useState(true);
  const {userStore} = useStore();
  userStore.updateUserInfoFromSessionStorage();
  const [logined, setLogined] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [message, setMessage] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    setLogined(userStore.is_logined);
  }, []);
  
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const toggleOpened = () => {
    setOpended(!opened);
  };
  const logout = () => {
    userStore.logout();
  }

  const handleSearch = () => {
    if (search === '') return;
    navigate(`/search?search=${search}`);
    setSearch('');
  }

  const init = async () => {
    if (userStore.uid === '') return;
    const resp = await authAxios('post',"http://localhost:8088/api/v1/create/info",{});
    setMessage(resp.data.error_message);
  }

  React.useEffect(() => {
    init();
  }, [])

  const registerAuthor = async () => {
    try {
      console.log("register");
      const resp = await authAxios('post',"http://localhost:8088/api/v1/create/register",{});
      setMessage(resp.data.error_message);
    } catch (error) {
    }
  }

  const menuId = 'primary-search-account-menu';
  const MenuItemStyle = {
    backgroundColor: '#333131', 
    color: 'white',
    marginTop: '5px',
    '&:hover': {
      backgroundColor: 'rgba(190, 184, 184, 0.33)', 
      color: 'white',
    },
  }
  const IconStyle = {
    marginRight: '20px'
  };


  const renderMenu = (
  <Menu
    anchorEl={anchorEl}

    // id={menuId}
    sx={{
      '.css-6hp17o-MuiList-root-MuiMenu-list': {
        padding: '0px !important',
      },
      '.css-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper': {
        borderRadius: '10px'
      }
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}

    open={isMenuOpen}
    onClose={handleMenuClose}
  >
    <Card sx={{ width:300,backgroundColor: '#333131', borderRadius: '9px'}}>
      <CardHeader
        sx={{
          backgroundColor: '#333131', 
          '& .MuiCardHeader-subheader': {
            color: 'white', 
          }, 
          '& .MuiCardHeader-title': {
            color: 'white', 
            fontSize: '16px',
          }, 
        }}
        avatar={
          <Avatar sx={{ bgcolor:'#C2175B', color: 'white', fontSize: '17px'}} 
            aria-label="recipe"
          >
            {userStore.first_name}
          </Avatar>
        }
        title={userStore.last_name + userStore.first_name}
        subheader={userStore.email}
      />
    <Divider sx={{backgroundColor: '#6D6B6B'}} />
    <CardContent 
      sx={{
        padding: '0px',
        '& .css-19f2pxn-MuiCardContent-root & .css-yu9i3y-MuiCardContent-root:last-child': {
          padding: '0px !important',
        }
      }}
    >
      {[
        {text: "我的",icon: <AssignmentIndIcon sx={IconStyle} /> ,path: "/myspace", click: ()=>{handleMenuClose()}},
        {text: "退出",icon: <LogoutIcon sx={IconStyle} />, path: "/", click: ()=>{handleMenuClose();logout();}},
      ].map((e, index) => (
        <MenuItem key={index} sx={MenuItemStyle} onClick={e.click}>
          <Link href={e.path} sx={{width: '100%', display: 'flex', alignContent: 'center',}} underline="none" color='inherit'>
            {e.icon}
            {e.text}
          </Link>
        </MenuItem>
      ))}
      <Divider sx={{backgroundColor: '#6D6B6B'}} />
      {message !== "success" && (
          <>
            <MenuItem sx={MenuItemStyle} onClick={() => { handleMenuClose(); registerAuthor(); }}>
              <Button sx={{ width: '100%', display: 'flex', alignContent: 'center', }} color='inherit'>
                <DriveFileRenameOutlineIcon sx={IconStyle} />
                注册创作者
              </Button>
            </MenuItem>
          </>
        )}

        {message === "success" && (
          <>
            <MenuItem sx={MenuItemStyle} onClick={() => { handleMenuClose(); registerAuthor(); }}>
              <Link href="/create" sx={{ width: '100%', display: 'flex', alignContent: 'center', }} underline="none" color='inherit'>
                <DriveFileRenameOutlineIcon sx={IconStyle} />
                我的创作
              </Link>
            </MenuItem>
          </>
        )}

    </CardContent>
  </Card>
</Menu>

  );

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const path = window.location.pathname.includes("page");

  return (
      <><Box sx={{ display: 'flex' }}>
      <CssBaseline /><AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar className='Bar-color'>
             <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={toggleOpened}
            >
              <MenuIcon />
            </IconButton>

          <Link href='/' underline='none' color='white'>
          <Typography
            className='title-start'
            variant="h6"
            noWrap
            component="span"
            sx={{ display: { xs: 'none', sm: 'block' } }}
            >
            轻小说
          </Typography>
          </Link>

          <div className='search-center'>
            <Search>
              <SearchIconWrapper>
                <Button sx={{color: 'white', }} onClick={handleSearch}>
                <SearchIcon />
                </Button>
              </SearchIconWrapper>
              <StyledInputBase
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="搜索作品..."
                inputProps={{ 'aria-label': 'search', maxLength: 80 }} />
            </Search>
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={1} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            {logined ?
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar sx={{ bgcolor: '#C2175B', color: 'white', fontSize: '17px' }}>
                  {userStore.first_name}
                </Avatar>
              </IconButton>
              :
              <Box>
                <Link href="/login" underline="none" color='inherit'>
                  {<MenuItem
                    size="large"
                    edge="end"
                    sx={{ paddingTop: '12px', paddingBottom: '12px' }}
                  >
                    登录
                  </MenuItem>}
                </Link>
              </Box>}

          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
          
        </Toolbar>
      </AppBar>
      {renderMenu}
      {!path ? 
        <SiderBar opened={opened}>
          {children}
        </SiderBar>
        :
        <Box component="main" 
          sx={{bgcolor: '#171717', height: '100%', width: '100%', flexGrow: 11,}}
        >
          <Box className='main-warp'>
            {children}
          </Box>
        </Box> 
      }
      </Box> 
      </>
  );
}