import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import SortIcon from '@mui/icons-material/Sort';
import '../css/SiderBar.css';
import { Routers } from './Routers';
import Link from '@mui/material/Link';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(10)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


export default function SiderBar({ children ,opened }) {
  const [open, setOpen] = React.useState(true);
  const [selectedItem, setSelectedItem] = React.useState('');
  const handleItemClick = (index, text) => {
    setSelectedItem(index + text);

  };

  React.useEffect(() => {
    setOpen(opened)
  }, [opened]);

  const DrawerList = () => {
    return (
      <>
        <Toolbar />
          <List >
              {['首页', '排行'].map((text, index) => (
                    <ListItem  disablePadding key={index}> 
                    <Link sx={{width: '90%'}} href={`${text === '首页' ? '/' : '/ranking'}`} underline="none" color='inherit'>

                    <ListItemButton
                      onClick={() => {handleItemClick(index, text); }}
                      selected={index + text === selectedItem}
                      
                      sx={{
                        '&:hover, &.Mui-selected': {
                          backgroundColor: 'rgba(190, 184, 184, 0.33)', 
                          borderRadius: '10px',
                        },
                        marginLeft: '7px',
                        marginRight: '7px',
                        marginBottom: '4px',
                        width: '100%'
                      }}
                      >
                        <ListItemIcon>
                            {index % 2 === 0 ? <HomeIcon /> : <SortIcon />}
                        </ListItemIcon>
                      {open && <ListItemText primary={text}  />}
                      
                    </ListItemButton>
                    </Link>
                </ListItem>
                ))}
          </List>
          {open && (
            <Divider sx={{backgroundColor: '#6D6B6B'}} />
          )}

          {open && ['你'].map((text,index) => (
                  <ListItem key={index} disablePadding >
                    <Link sx={{width: '90%'}} href='/myspace' underline="none" color='inherit'>

                      <ListItemButton
                        onClick={() =>{handleItemClick(index, text); }}
                        selected={index + text === selectedItem}
                        sx={{
                          '&:hover, &.Mui-selected': {
                            backgroundColor: 'rgba(190, 184, 184, 0.33)', 
                            borderRadius: '10px',
                          },
                          marginLeft: '7px',
                          marginRight: '7px',
                          marginTop: '7px'
                        }}
                      >
                      <ListItemText primary={text} />
                      <svg xmlns="http://www.w3.org/2000/svg" style={{'color': 'white', 'pointer-events': 'none', 'width': '20px', 'height': '20px',}}><path fill="currentColor" d="M4.97 12.65 9.62 8 4.97 3.35l.71-.71L11.03 8l-5.35 5.35-.71-.7z"></path></svg>
                    </ListItemButton>
                    </Link>
                  </ListItem>
          ))
          }
          <List >
              {['历史阅读', '稍后阅读'].map((text, index) => (
                  <ListItem key={index} disablePadding >
                    <Link sx={{width: '90%'}} href={`${text === '历史阅读' ? '/history' : '/next'}`} underline="none" color='inherit'>    
                      <ListItemButton
                        onClick={() =>  {handleItemClick(index, text); }}
                        selected={index + text  === selectedItem}
                        sx={{
                          '&:hover, &.Mui-selected': {
                            backgroundColor: 'rgba(190, 184, 184, 0.33)', 
                            borderRadius: '10px',
                          },
                          marginLeft: '7px',
                          marginRight: '7px',
                          marginBottom: '4px'
                        }}
                      >
                          <ListItemIcon>
                          {index % 2 === 0 ?<HistoryIcon />: <AccessTimeIcon />}
                          </ListItemIcon>
                          {open && <ListItemText primary={text}  />}
                      </ListItemButton>
                      </Link>
                  </ListItem>
              ))}
          </List>
      </>
    )
  }

  return (
      <>
        <Drawer 
            variant="permanent" 
            open={open}
            sx={{
              '& .MuiDrawer-paper': {
              backgroundColor: '#171717 !important',
              },
              '& .MuiTypography-root, & .MuiListItemIcon-root': {
                color: 'white',
             },
            }}
        >
          <DrawerList />
        </Drawer>
        <Box component="main" 
            sx={{
              backgroundColor: '#171717 !important',
              flexGrow: 11, 
            }}
        >
            <div className='main-warp'>
              {children}
            </div>
        </Box>
    </>
  );
}