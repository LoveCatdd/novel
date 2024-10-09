import { Box, Button, Card, CardActionArea, CardContent, CardHeader, CardMedia, Divider, Hidden, Link, PaginationItem, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { authAxios, unAuthAxios } from '../api/axios';
import styled from '@emotion/styled';
import Pagination from '@mui/material/Pagination';
import { useStore } from '../store/store';


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

  const BoxList = ({RankOfName, id}) => {
    const {userStore} = useStore();
    userStore.updateUserInfoFromSessionStorage();
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [count, setCount] = useState(1);
    const navigater = useNavigate();

    const getCurrentDate = () => {
      const currentDate = new Date();
    
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const day = currentDate.getDate().toString().padStart(2, '0');
    
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
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
          createDate: getCurrentDate()
        });
      } catch (error) {
        
      }
    }

    useEffect(() => {
      let type = '';
      switch(id) {
        case '1': 
          type = '1';
          break;
        case '2': 
          type = '2';
          break;
        case '3':
          type = '3';
      }
      init_count(type)
    }, [])

    useEffect(() => {
      switch(id) {
        case '1': 
          init_new();
          break;
        case '2': 
          init_collect();
          break;
        case '3':
          init_end();
      }
    }, [page]);
    
    const init_count = async (type) => {
      try {
        const resp = await unAuthAxios("get", `http://localhost:8088/api/v1/page/rank-count?type=${type}`, {});
    
        const data = resp.data;
        if (data.error_message === "success") {
          setCount(data.count);
        } 
      } catch (error) {
        
      }
    }

    const init_new = async () => {
      try {
        const resp = await unAuthAxios("get", `http://localhost:8088/api/v1/page/rank-newbook?page=${page}&limit=${limit}`, {});
    
        const data = resp.data;
        if (data.error_message === "success") {
          setList(data.rankNewBook);
        } else setList([]);
      } catch (error) {
        setList([]);
      } finally {
        setLoading(false)
      }
    }
    const init_collect = async () => {
      try {
        const resp = await unAuthAxios("get", `http://localhost:8088/api/v1/page/rank-collect?page=${page}&limit=${limit}`, {});
    
        const data = resp.data;
        if (data.error_message === "success") {
          setList(data.rankCollectBook);
        } else setList([]);
      } catch (error) {
        setList([]);
      } finally {
        setLoading(false)
      }
    }
    
    const init_end = async () => {
      try {
        const resp = await unAuthAxios("get", `http://localhost:8088/api/v1/page/rank-endbook?page=${page}&limit=${limit}`, {});
    
        const data = resp.data;
        if (data.error_message === "success") {
          setList(data.rankCompleteBook);
        } else setList([]);
      } catch (error) {
        setList([]);
      } finally {
        setLoading(false)
      }
    }


    return (
      !loading && <Box sx={{  width: '1300px', height: '100%', boxSizing: 'border-box',}}>
      <Typography sx={{ color: '#FFFFFF', fontSize: '30px', marginBottom: '20px'}}>
        {RankOfName}
      </Typography>
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
                        {new Date(e.workLastDate).toLocaleDateString('cn', { timeZone: 'Asia/Shanghai' })}

                        </Box>
                      </Box>

                    </Box>

                    <Box sx={{ width: '200px' ,display: 'flex' ,flexDirection: 'row-reverse'}}>
                        <Box>
                          <Box sx={{marginLeft: '45px'}}>
                            {index + 1}
                          </Box>
                            <Box sx={{marginRight: '10px',marginTop: '75px'}}>
                              <Link color="white" underline='none' href={`/page/${e.workId}`} sx={{  '&:hover': {
                                  color: 'darkred',
                                },
                              }}>
                                立即阅读
                              </Link>
                            </Box>
                            <Box sx={{marginRight: '10px', marginTop: '5px'}}>
                              <Button 
                                onClick={e => handleNextRead(e.workId,userStore.uid)} 
                                sx={{color: 'white', padding: '0px', fontSize: '16px',  '&:hover': {
                                  color: 'darkred',
                                },
                              }}
                              >
                                稍后阅读
                              </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
              </Box>
        ))}
        <Pagination
          sx={{
            display: 'flex',
            justifyContent: 'end',
            height: '50px',
            width: '1320px',
          }}
          renderItem={(item) => (
            <PaginationItem
            {...item}
            sx={{
              fontSize:'24px',
              width: '50px',
              height: '50px',
              color: 'white',
                '&.Mui-selected': {
                  color: 'white', 
                },
                '& .MuiSvgIcon-root': {
                  color: 'white', 
                },
              }}
        
            />
          )} 
          onChange={(e,new_page) => setPage(new_page)}

          color="secondary" 
          count={count} 
          showFirstButton 
          showLastButton 
        />
      </Box>
    )
  }

export const RankSingle = () => {
  
  const {id} = useParams();

  const setRankType = (id) => {
    switch(id) {
      case '1': 
        return "新书榜";
      case '2':
        return "收藏榜";
      case '3': 
        return "完结榜"; 
    }
  }

  const rankOfName = setRankType(id);
  return (
    <Box>
      <BoxList RankOfName={rankOfName} id={id}/>
    </Box>
  )
}

