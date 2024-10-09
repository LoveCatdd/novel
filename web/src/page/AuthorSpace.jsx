import styled from '@emotion/styled';
import { Avatar, Box, Divider, Link, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import { unAuthAxios } from '../api/axios';

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


export const AuthorSpace = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const author_name = queryParams.get('author_name');  
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [author, setAuthor] = useState({});

    const init = async () => {
        try {
            const resp = await unAuthAxios("get", `http://localhost:8088/api/v1/search/get-author-info?author=${author_name}`, {});
            const data = resp.data;
            if (data.error_message === "success") {
                setAuthor(data.authorInfoResponses);
                setList(data.authorWorksListResponses);
            }
        } catch (error) {
            
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        init();
    }, [author_name])

    return (
        <Box>
            <Box sx={{ height: '100%' ,width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '105px', }}>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#DFD2ED', fontSize: '56px', width: '855px', height: '255px',bgcolor: 'rgba(15, 105, 201, 0.36)',borderRadius: '10px' }}>
                    {author.email}
                </Box>
            </Box>
            <Box sx={{display: 'flex'}}>
                <Avatar sx={{width: '180px', height: '180px', bgcolor:'#C2175B', color: 'white', fontSize: '50px'}}>{author.firstName}</Avatar>
                <Box sx={{color: 'white', fontSize: '36px', width: '100%', marginLeft: '10px'}}>
                    {author.fullName}
                </Box>
                
            </Box>
            <Box sx={{marginTop: '25px', color: 'white', marginLeft: '130px'}}>
                作者简介：
                <TruncatedTypography  color="white" sx={{ marginTop: '10px'}}>
                    {author.authorIntro}
                </TruncatedTypography>
            </Box>
            <Divider sx={{
                 '&.css-16ar9b3-MuiDivider-root': {
                    '&::before, &::after': {
                        borderTopColor: '#6D6B6B',
                        
                    }
                  },
                color: '#6D6B6B', 
                margin:'10px', 
                fontSize: '24px'}} 
            >
                作品
            </Divider>
            
            {!loading && <Box sx={{  width: '1300px', height: '1000px', boxSizing: 'border-box',}}>
                {list.map((e, index) => (
                    <Box key={index} sx={{color: '#FFFFFF', marginBottom: '10px', border: '1px solid #333131'}}>
                    <Box sx={{display: 'flex'}}>
                        <Link color="white" underline='none' href={`/page/${e.workId}`}>
                        <Box
                        component="img"
                        sx={{ width: '170px', height: '210px',  margin: '5px'}}
                        src={img_path + e.workImg}
                        alt={e.workName}
                        />
                        </Link>
                        <Box sx={{ padding: '15px' }}>
                            <Box sx={{ width: '900px' ,fontSize: "30px", fontWeight: 'bold'}}>
                            <Link color="white" underline='none' href={`/page/${e.workId}`}>
                                {e.workName}
                            </Link>
                            </Box>
                            <Box sx={{font: '16px', marginTop: '5px'}}>
                            <Link href={`/novel_lib?lib_name=${e.workLib}`} sx={{marginLeft: '5px', underline: "none", color: 'grey'  ,'&:hover': {
                            color: 'white',
                        }}}>
                          {e.workLib}
                        </Link>
                            <Box component="span" sx={{color:'grey'}}>|</Box> 
                            <Link sx={{marginLeft: '5px', underline: "none", color: 'grey'}}>
                                {e.workType}
                            </Link>
                            </Box>
                            <Box sx={{marginTop: '10px', overflow: 'hidden'}}>
                            <TruncatedTypography>
                                {e.workIntro}
                            </TruncatedTypography>
                            </Box>
                            <Box sx={{display: 'flex', marginTop: '10px'}}>
                            <Box sx={{border: '1px solid grey', color: 'grey', fontSize: '15px'}}>
                                最后更新
                            </Box>
                            <Box sx={{marginLeft: '15px',color: 'grey',fontSize: '16px'}}>
                            {new Date(e.workLastDate).toLocaleDateString('cn', { timeZone: 'Asia/Shanghai' })}
                                </Box>
                            </Box>
    
                        </Box>
    
                    </Box>
                    </Box>
            ))}
            </Box>}
        </Box>
    )
}
