import { Box, Divider, Link, Pagination, PaginationItem, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { unAuthAxios } from '../api/axios';
import styled from '@emotion/styled';
import { useLocation } from 'react-router';

const TruncatedTypography = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

`;

const Container = styled.div`
overflow: hidden;
margin-bottom: 10px;
margin-left: 10px;
`;
const RankList1 = ({index, name, recommend, id}) => {
    return (
      <>
        <Box sx={{display: 'flex', alignContent: 'center', width: '100%', padding: '5px'}}>
          <Box sx={{textAlign: 'center', height: '20px' ,width: '20px' ,fontWeight: 'bold',color: 'white',bgcolor: `rgb(${(index * 25) % 256}, ${150}, ${255 - (index * 25) % 256})`}}>{index + 1}</Box>
          <Box sx={{display: 'flex', justifyContent: 'center', width: '80%'}}>
          <Link color="white" underline='none' href={`/page/${id}`}sx={{'&:hover': {
                            color: 'darkred',
                  }}}>
            {name}
          </Link>  
          </Box>
          <Box sx={{fontWeight: 'bold', fontSize: '16px' ,color: 'grey' }}>{recommend}</Box>
        </Box>
        <Divider sx={{backgroundColor: '#6D6B6B',marginTop: '3px', marginBottom: '5px', width: '95%'}} />
      </>
    )
  }
  
  const img_path = "/novels";
  
  const RankList2 = ({img, name, type, recommend, authorName, id}) => {
    return (
      <>
        <Box sx={{display: 'flex', width: '355px',marginRight: '10px'}}>
        <Link color="white" underline='none' href={`/page/${id}`}>
          <Box component="img" src={img_path + img} alt={name} width={120} height={155} />
        </Link>
        <Box sx={{ width: '235px' ,marginLeft: '10px',overflow: 'hidden',}}>
        <Link color="white" underline='none' href={`/page/${id}`}>
          <TruncatedTypography>{name}</TruncatedTypography>
        </Link>
        <Link color="white" underline='none' href={`/author_space?author_name=${authorName}`} sx={{'&:hover': {
                            color: 'darkred',
                        }}}>
        <Box sx={{ marginRight: '15px', marginTop: '10px', marginBottom: '10px'}}>{authorName}</Box>
      </Link>          <TruncatedTypography sx={{display:'flex',justifyContent: 'flex-end', marginRight: '15px', marginBottom: '10px', fontSize: '16px', color: 'grey'}}>{type}</TruncatedTypography>
          <Box sx={{display:'flex',justifyContent: 'flex-end', marginRight: '35px',marginTop: '5px', color: '#89B4F1', fontWeight: 'bold', fontSize: '24px'}}>{recommend}</Box>
        </Box>
      </Box> 
        <Divider sx={{backgroundColor: '#6D6B6B',marginTop: '3px', marginBottom: '5px', width: '95%'}} />
      </>
    )
  }
  
  const TypographyStyle = {
    color: '#FFFFFF', 
    fontSize: '30px',
    marginBottom: '10px',
    fontWeight: 'bold'
  }

  const Page = ({count ,setPage}) => {
    return (
      <Pagination
      sx={{
        
        height: '30px',
        width: '440px',
      }}
      renderItem={(item) => (
        <PaginationItem
        {...item}
        sx={{
          fontSize:'16px',
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
    )
  }



export const LibPage = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageNew, setPageNew] = useState(1);
    const [pageEnd, setPageEnd] = useState(1);
    const [pageCollect, setPageCollect] = useState(1);
    const [limit, setLimit] = useState(10);
    const [listNew, setListNew] = useState([]);
    const [listCollect, setListCollect] = useState([]);
    const [listEnd, setListEnd] = useState([]);
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [loading3, setLoading3] = useState(true);
    const [countNew, setCountNew] = useState(1);
    const [countEnd, setCountEnd] = useState(1);
    const [countCollect, setCountCollect] = useState(1);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const lib_name = queryParams.get('lib_name');  

    const init_count = async (type) => {
      try {
        const resp = await unAuthAxios("get", `http://localhost:8088/api/v1/search/get-lib-rankcount?type=${type}&lib=${lib_name}`, {});
    
        const data = resp.data;
        if (data.error_message === "success") {
          switch(type) {
            case "1": 
              setCountNew(data.count);
              break;
            case "1": 
              setCountEnd(data.count);
              break;
            case "1": 
              setCountCollect(data.count);
              break;
          }
        } 
      } catch (error) {
        
      }
    }


  const init_new = async () => {
    try {
      const resp = await unAuthAxios("get", `http://localhost:8088/api/v1/search/get-lib-ranksinfo?lib=${lib_name}&type=1&page=${pageNew}&limit=${limit}`, {});
  
      const data = resp.data;
      if (data.error_message === "success") {
        setListNew(data.newWorks);
      } else setListNew([]);
    } catch (error) {
      setListNew([]);
    } finally {
      setLoading1(false)
    }
  }

  const init_collect = async () => {
    try {
      const resp = await unAuthAxios("get", `http://localhost:8088/api/v1/search/get-lib-ranksinfo?lib=${lib_name}&type=2&page=${pageCollect}&limit=${limit}`, {});
  
      const data = resp.data;
      if (data.error_message === "success") {
        setListCollect(data.collectWorks);
      } else setListCollect([]);
    } catch (error) {
      setListCollect([]);
    } finally {
      setLoading2(false)
    }
  }
  
      const init_end = async () => {
        try {
          const resp = await unAuthAxios("get", `http://localhost:8088/api/v1/search/get-lib-ranksinfo?lib=${lib_name}&type=3&page=${pageEnd}&limit=${limit}`, {});
  
          const data = resp.data;
          if (data.error_message === "success") {
            setListEnd(data.endWorks);
          } else setListEnd([]);
        } catch (error) {
          setListEnd([]);
        } finally {
          setLoading3(false)
        }
      }
  
    
  
    useEffect(() => {
        init_new();
        init_count('1');
    }, [pageNew])
    
    useEffect(() => {
        init_collect();
        init_count('2');
    },[pageCollect])

    useEffect(() => {
        init_end();
        init_count('3');
    }, [pageEnd])

    
    const init = async () => {
        try {
            const resp = await unAuthAxios("get", `http://localhost:8088/api/v1/search/get-lib-info?lib=${lib_name}`, {});

            const data = resp.data;
            if (data.error_message === "success") {
                setList(data.topWorksLibResponses);
            } else setList([]);
        } catch (error) {
            setList([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
       init();
    },[])

    return (
        <Box>
            <Typography sx={{marginLeft: '0px', color: '#FFFFFF', fontSize: '30px', fontWeight: 'bold' }}>
                TOP 50
            </Typography>

            { !loading && <Box sx={{display:'flex', flexWrap: 'wrap', color: 'white', width: '100%'}}>
                {list.map((e, index) => (
                    <Box key={index} sx={{ width: 'calc(20% + 140px)',display: 'flex',margin: '10px',paddingBottom: '10px' ,paddingTop: '10px'  ,'&:hover': {
                      bgcolor: '#333131',
                      borderRadius: '10px',
                      transition: '0.3s ease',
                      paddingLeft: '15px',
                    },}}>
                    <Link underline='none' href={`/page/${e.workId}`}>
                        <Box component="img" width={110} height={155} src={img_path + e.workImg} alt={e.workName} />
                    </Link>
                    <Box>
                        <Container>
                            <Link underline='none' color="white" href={`/page/${e.workId}`} >
                                <TruncatedTypography width="auto" height={25} sx={{fontSize: '18px'}} >
                                    {e.workName}
                                </TruncatedTypography>
                            </Link>
                        </Container>
                        <Container >
                            <TruncatedTypography width={170} height={50}  >
                                {e.workIntro}
                            </TruncatedTypography>
                        </Container>
                        <Box sx={{ marginTop: '20px',marginBottom: '10px', marginLeft: '10px', display: 'flex'}}>
                            <Box sx={{marginBottom: '10px'}}>
                                <Typography width={100} height={25} sx={{ fontSize: '16px'}}>
                                    <Link href={`/author_space?author_name=${e.fullName}`} underline="none" color='grey' sx={{'&:hover': {
                            color: 'white',
                        }}}>{e.fullName}</Link>
                                </Typography>
                            </Box>
                            <Box sx={{marginLeft: '40px'}}>
                                <TruncatedTypography width={100} height={25} sx={{color: 'grey', fontSize: '16px'}}>
                                    {e.workType}
                                </TruncatedTypography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                ))}
            </Box>}
            <Box sx={{ display: 'flex',  marginTop: '40px',marginBottom: '20px'}}>
                {!loading1 &&
                <Box sx={{color: 'white',marginLeft: '0px', marginRight: '25px', }}>
                    <Typography sx={TypographyStyle}>
                    新书榜
                    </Typography>
                    <Divider sx={{backgroundColor: '#6D6B6B', marginBottom: '25px', width: '95%'}} />

                    {listNew.map((e, index) => (
                        <Box key={index}>
                        {index===0 ? 
                            <RankList2  id={e.workId} authorName={e.fullName} img={e.workImg} name={e.workName} type={e.workType} recommend={e.workRecommend}/>
                        :
                            <RankList1 id={e.workId} index={index} name={e.workName} recommend={e.workRecommend} />
                        }
                        </Box>
                    ))}  
                    <Page count={countNew} setPage={setPageNew} />
                </Box>
                }

                {!loading2 &&
                    <Box sx={{color: 'white', marginRight: '25px', marginLeft: '40px' }}>
                    <Typography sx={TypographyStyle}>
                        收藏榜
                    </Typography>
                    <Divider sx={{backgroundColor: '#6D6B6B', marginBottom: '25px', width: '95%'}} />

                    {listCollect.map((e, index) => (
                        <Box key={index}>
                        {index===0 ? 
                            <RankList2 id={e.workId}   authorName={e.fullName} img={e.workImg} name={e.workName} type={e.workType} recommend={e.workRecommend}/>
                        :
                            <RankList1  id={e.workId}  index={index} name={e.workName} recommend={e.workRecommend} />
                        }
                    </Box>
                    ))}    
                    <Page count={countCollect} setPage={setPageCollect}/>
                </Box>
                    }
                {!loading3 &&
                    <Box sx={{color: 'white' , marginLeft: '40px'}}>
                    <Typography sx={TypographyStyle}>
                        完结榜
                    </Typography>
                    <Divider sx={{backgroundColor: '#6D6B6B', marginBottom: '25px', width: '95%'}} />

                    {listEnd.map((e, index) => (
                        <Box key={index}>
                        {index===0 ? 
                            <RankList2 id={e.workId}  authorName={e.fullName} img={e.workImg} name={e.workName} type={e.workType} recommend={e.workRecommend}/>
                        :
                            <RankList1 id={e.workId}  index={index} name={e.workName} recommend={e.workRecommend} />
                        }
                    </Box>
                    ))}
                  <Page count={countEnd}  setPage={setPageEnd}/>
            </Box>
                }
            </Box>
        </Box>
        
    )
}
