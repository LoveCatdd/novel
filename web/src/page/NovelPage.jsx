import styled from '@emotion/styled';
import { Avatar, AvatarGroup, Box, Button, Divider, Grid, Link, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { authAxios, unAuthAxios } from '../api/axios';
import { useStore } from '../store/store';

const TruncatedTypography = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

`;
const img_path = "/novels";


 const Container = styled.div`
  width: 423px;
  overflow: hidden;
`;


export const NovelPage = () => {
    const {wid} = useParams();
    const [novel, setNovel] = useState({});
    const [loading, setLoading] = useState(true);
    const {userStore} = useStore();
    const navigater = useNavigate();
    userStore.updateUserInfoFromSessionStorage();

    const init = async () => {
        try {
            const resp = await unAuthAxios("get", `http://localhost:8088/api/v1/novel/info?id=${wid}`, {});
            const data = resp.data;
            if (data.error_message === "success") {
                setNovel(data.novel);
            }
        } catch (error) {
            
        } finally {
            setLoading(false);
        }
    }
    console.log(novel.path);
    const ChapterList = () => {
        return (
            <Box sx={{marginTop: '25px', display: 'flex',flexWrap: 'wrap'}}>
                {Array.from({ length: novel.workCount }, (_, index) => (
                    <Box key={index} sx={{width: 'calc(16.666% - 20px)', marginBottom: '10px'}}>
                        <Link underline='none' 
                            sx={{color: 'white', '&:hover': {
                                color: 'darkred',
                              },}}
                            href={`/page/${wid}/${index + 1}?name=${novel.workName}&page=${(index + 1)}&path=${novel.path}&count=${novel.workCount}`}>
                            { "第" + (index + 1) + "话 "}
                        </Link>
                    </Box>
                ))} 
            </Box>
        )
    }

      
      const handleNextRead = (wid, uid) => {
        if (uid === '') {
            navigater('/login');
            return ;
          }
        try {
          authAxios("post", 'http://localhost:8088/api/v1/watch/watch-addnext', {
            wid: wid,
            uid: uid,
            createDate: new Date()
          });
        } catch (error) {
          
        }
      }

    useEffect(() => {
        init();
    }, [])
  return (
    !loading && <Grid container spacing={2} paddingLeft={20} paddingTop={5}>
    <Grid item xs={8} >
        <Box sx={{display: 'flex'}}>
            <Box
                component="img"
                src={img_path + novel.workImg}
                alt={novel.workName}
                sx={{bgcolor: '#fff', marginRight: '15px', height: '236px', width: '170px'}}
            >
            </Box>
            <Box>
                <Box gutterBottom  fontSize={24} color={"white"}>
                    {novel.workName}
                </Box>
                <Box sx={{display: 'flex'}}>
                <Box>
                <Typography variant="body2"  width={"423px"} sx={{display: 'flex'}} gutterBottom color={"white"}>
                  {novel.workLib}
                </Typography>

                <Typography variant="body2"  width="100%" sx={{display: 'flex', marginTop: '9px', marginBottom: '15px'}} color={"white"}>
                    <Box sx={{width: '100%', display: 'flex'}}>
                        最后更新: 
                        <Box sx={{marginRight: '7px', color: 'grey'}}>
                        {new Date(novel.workLastDate).toLocaleDateString('cn', { timeZone: 'Asia/Shanghai' })}

                        </Box>
                    </Box>
                    <Box sx={{marginLeft: '15px', width: '100%', display: 'flex'}}>
                        总推荐： 
                        <Box sx={{color: 'grey'}}>
                            {novel.workRecommend}
                        </Box>
                    </Box>
                </Typography>
                <Container zeroMinWidth  >
                    <TruncatedTypography  color="white" >
                        {novel.workIntro}
                    </TruncatedTypography>
                </Container>
                <Box sx={{marginTop: '12px'}}>
                    <Link underline='none' sx={{color: 'white', margin: '25px' ,'&:hover': {
                        color: 'darkred',
                    },}}
                    href={`/page/${wid}/${1}?name=${novel.workName}&page=${(1)}&path=${novel.path}&count=${novel.workCount}`}
                    >
                        开始阅读
                    </Link>
                    <Button 
                        onClick={e => handleNextRead(novel.workId,userStore.uid)} 
                        sx={{color: 'white', padding: '0px', fontSize: '16px' ,'&:hover': {
                            color: 'darkred',
                        }}}
                    >
                    稍后阅读
                    </Button>
                </Box>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                    {/* <Button sx={{height: '50px'}}>收藏</Button> */}
                    <Button sx={{color: 'white', padding: '0px', fontSize: '16px' ,'&:hover': {
                            color: 'darkred',
                    }}}>推荐</Button>
                </Box>
                </Box>
            </Box>
        </Box>
        <Divider sx={{backgroundColor: '#6D6B6B', marginTop: '5px', width: '80%'}} />
        <ChapterList />
        

    </Grid>
    <Grid item xs={4} sx={{color: "white" }}>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Link href={`/author_space?author_name=${novel.fullName}`} underline="none">
            <Avatar sx={{ width: '100px', height: '100px' ,bgcolor: '#C2175B', color: 'white', fontSize: '24px' }}>
                {novel.firstName}
            </Avatar>
        </Link>
            <Box sx={{marginTop: '10px', fontSize: '24px'}}>
            <Link href={`/author_space?author_name=${novel.fullName}`} sx={{color: 'white' ,'&:hover': {
                            color: 'darkred',
                        }}} underline="none">
                {novel.fullName}
            </Link>
            </Box>
        </Box>
        <Box sx={{marginTop: '25px'}} zeroMinWidth>
            作者简介：
            <TruncatedTypography  color="white" sx={{ marginTop: '10px'}}>
                {novel.authorIntro}
            </TruncatedTypography>
        </Box>
        {/* <Box  sx={{marginTop: '25px'}}  >
        <AvatarGroup total={24}>
            <Avatar  alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
        </AvatarGroup>
        </Box> */}
    </Grid>
</Grid>
  )
}
