import { Box, Link, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { authAxios } from '../api/axios';
import { useStore } from '../store/store';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router';

const img_path = "/novels";

const TruncatedTypography = styled(Typography)`
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
overflow: hidden;
text-overflow: ellipsis;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
width: 1000px;
`;

const BoxList = () => {
    const [list, setList] = useState([]);
    const {userStore} = useStore();
    userStore.updateUserInfoFromSessionStorage();
    const navigator = useNavigate();

    useEffect(() => {
        init();
    }, [])

    const init = async () => {
        if (userStore.uid === '') {
            navigator('/login');
            return;
          }
        try {
            const resp = await authAxios("get", `http://localhost:8088/api/v1/watch/watch-history?id=${userStore.uid}`,{});
            const data = resp.data;
            if (data.error_message === "success") {
                setList(data.historys);
            }
        } catch (error) {
            console.error("Error fetching watch history:", error);
        }
        console.log(list);
    }

    return (
        list.map((e, index) => (
            <Box key={index}>
            <Typography sx={{color: 'white', fontSize: '36px', marginTop: '20px'}}>
            {new Date(e.date).toLocaleDateString('cn', { timeZone: 'Asia/Shanghai' })}

            </Typography>
            {e.list.map((a,index) => (
                <Box key={index} sx={{color: '#FFFFFF', marginBottom: '10px', border: '1px solid #333131'}}>
                    <Box sx={{display: 'flex'}}>
                        <Link color="white" underline='none' href={`/page/${a.workId}`}>
                            <Box
                            component="img"
                            sx={{ width: '170px', height: '210px',  margin: '5px'}}
                            src={img_path + a.workImg}
                            alt={a.workName}
                            />
                        </Link>
                        <Box sx={{ padding: '15px' }}>
                            <Box sx={{ width: '900px' ,fontSize: "30px", fontWeight: 'bold'}}>
                                <Link color="white" underline='none' href={`/page/${a.workId}`}>
                                    {a.workName}
                                </Link>
                            </Box>
                            <Box sx={{font: '16px', marginTop: '5px'}}>
                            <Link href={`/author_space?author_name=${a.fullName}`} underline='none'  sx={{marginRight: '5px', underline: "none", color: 'grey', '&:hover': {
                            color: 'white',
                        }}}>
                                {a.fullName} 
                            </Link>
                            <Box component="span" sx={{color:'grey'}}>|</Box> 
                            <Link sx={{marginLeft: '5px', underline: "none", color: 'grey'}}>
                                {a.workRecommend}
                            </Link>
                            </Box>
                            <Box sx={{marginTop: '25px', overflow: 'hidden'}}>
                                <TruncatedTypography>
                                    {a.workIntro}
                                </TruncatedTypography>
                            </Box>

                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>

        ))
    )
}


export const HistoryPage = () => {
  return (
    <Box>
        <Typography sx={{color: 'white', fontSize: '36px', fontWeight: 'bold'}}>阅读记录</Typography>
        <BoxList />
    </Box>
  )
}
