import { Avatar, Box, Divider, Link, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useStore } from '../store/store'
import HistoryIcon from '@mui/icons-material/History';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { authAxios } from '../api/axios';
import { useNavigate } from 'react-router';


const BoxStyle = {
  maxWidth: '1200px',
  borderRadius: '10px',
  marginTop: '40px',
  padding: '10px 0px 0px 10px',
};
const img_path = "/novels";

const BoxList = ({list}) => {
  return (
    <Box sx={{display:'flex', flexWrap: 'wrap'}}>
      {list.map((e, index) => (
      <Card key={index} sx={{width: 'calc(16.666% + 30px)', height: 255, margin: '10px' }}>
        <CardActionArea>
        <Link color='grey' underline='none' href={`/page/${e.workId}`}> 
            <CardMedia
              component="img"
              height="200"
              sx={{objectPosition: 'top' }}
              src={img_path + e.workImg}
              alt={e.workName}
              />
            </Link>
          </CardActionArea>
          <CardContent sx={{
            backgroundColor: '#171717 !important',
            color: 'white',
            padding: 0,
            paddingTop: 1,
            display: 'flex'
          }}
          >
            <Typography component="div" sx={{width: '60%'  ,marginTop: 0, marginBottom: '5px', fontSize: '16px'}}>
              <Link color='grey' underline='none' href={`/page/${e.workId}`} sx={{'&:hover': {
                            color: 'white',
                        }}}>
                {e.workName}
              </Link>
            </Typography>
              <Link href="login" color="grey" underline="none" sx={{
                color: 'grey',
                display: 'flex',
                justifyContent: 'flex-end',
                width: '70%'
              }}>
                {e.workRecommend}
              </Link>
          </CardContent>
      </Card>
    ))}
    </Box>
  )
}

const HistoryList = () => {
  const [list, setList] = useState([]);
  const {userStore} = useStore();
  const [loading, setLoading] = useState(true);
  const navigator = useNavigate();
  userStore.updateUserInfoFromSessionStorage();

  const init = async () => {
    if (userStore.uid === '') {
      navigator('/login');
      return;
    }

    try {
      const resp = await authAxios("post", 'http://localhost:8088/api/v1/watch/watch-history', {
        id: parseInt(userStore.uid),
      });
      const data = resp.data;
      if (data.error_message === "success") {
        setList(data.watchHistory);
        setLoading(false);
      }
    } catch (error) {
      
    }
  }
  useEffect(() => {
    init();
  }, [])

  return (
    <Box sx={BoxStyle}>
      <Typography sx={{display: 'flex', accentColor: "center", color: '#FFFFFF', fontSize: '24px' }}>
        <Link  href='/history' underline="none" color='inherit'>    
          <HistoryIcon sx={{marginRight: '5px', marginTop: '5px'}}/>
        </Link>
        历史阅读
      </Typography>
      {!loading && <BoxList list={list}/>}
      <Divider sx={{backgroundColor: '#A7A7A7'}} />
    </Box>
  )
}

const NextList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const {userStore} = useStore();
  userStore.updateUserInfoFromSessionStorage();

  const init = async () => {
    try {
      const resp = await authAxios("post", 'http://localhost:8088/api/v1/watch/watch-next', {
        id: parseInt(userStore.uid),
      });
      const data = resp.data;
      if (data.error_message === "success") {
        setList(data.watchNext);
        setLoading(false);
      }
    } catch (error) {
      
    }
  }
  useEffect(() => {
    init();
  }, [])

  return (
    <Box sx={BoxStyle}>
      <Typography sx={{display: 'flex', accentColor: "center", color: '#FFFFFF', fontSize: '24px' }}>
        <Link  href='/next' underline="none" color='inherit'>    
          <AccessTimeIcon sx={{marginRight: '5px', marginTop: '5px'}}/>
        </Link>
        稍后阅读
      </Typography>
      {!loading && <BoxList list={list}/>}
      <Divider sx={{backgroundColor: '#A7A7A7'}} />
    </Box>
  )
}


export const Space = () => {
    const {userStore} = useStore();
    userStore.updateUserInfoFromSessionStorage();

    return (
    <Box>
        <Box sx={{display: 'flex'}}>
          <Avatar sx={{width: '120px', height: '120px', bgcolor:'#C2175B', color: 'white', fontSize: '50px'}}>{userStore.first_name}</Avatar>
          <Box sx={{color: 'white', fontSize: '36px', marginLeft: '10px'}}>{userStore.last_name + userStore.first_name}</Box>
        </Box>
      <HistoryList />
      <NextList />
    </Box>

  )
}