import styled from '@emotion/styled';
import { Box, Link, Typography } from '@mui/material';
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

export const SearchPage = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    const init = async () => {
        try {
            const resp = await unAuthAxios("get", `http://localhost:8088/api/v1/search/info?search=${search}`, {});
            const data = resp.data;
            if (data.error_message === "success") {
                setList(data.searchResponses);
            }
        } catch (error) {
            
        } finally {
            setLoading(false);
        }
    }
    
    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const search = queryParams.get('search');  
    
    useEffect(() => {
        init();
    }, [search])
    
    
    return (
        !loading && <Box sx={{  width: '1300px', height: '100%', boxSizing: 'border-box',}}>
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
                        <Link href={`/author_space?author_name=${e.fullName}`} sx={{marginRight: '5px', underline: "none", color: 'grey'  ,'&:hover': {
                            color: 'white',
                        }}}>
                          {e.fullName} 
                        </Link>
                        <Box component="span" sx={{color:'grey'}}>|</Box> 
                        <Link href={`/novel_lib?lib_name=${e.workLib}`} sx={{marginLeft: '5px', underline: "none", color: 'grey'  ,'&:hover': {
                            color: 'white',
                        }}}>
                          {e.workLib}
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
                            {new Date(e.workLastDate).toISOString().split('T')[0]}
                          </Box>
                        </Box>
  
                      </Box>
  
                  </Box>
                </Box>
          ))}
        </Box>
    )
}
