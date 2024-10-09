import { Box, Divider, Link, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import Skeleton from '@mui/material/Skeleton';
import { RankSingle } from '../components/RankSingle';
import { authAxios, unAuthAxios } from '../api/axios';
import styled from '@emotion/styled';
import { useStore } from '../store/store';

const BoxStyle = {
  maxWidth: '1200px', backgroundColor: '#333131', borderRadius: '10px', margin: '20px'
};

const SkeletonStyle = {
  bgcolor: '#4C4949',
  borderRadius: '10px'
}

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
`;

const RankSkeleton = () => {
  return (
    <Grid xs={4} sx={{ margin: '30px' }}>
      <Skeleton variant="rounded" animation="wave" width={300} height={630} sx={SkeletonStyle} />

    </Grid>

  )
}

const RankList1 = ({index, name, recommend, id}) => {
  return (
    <>
      <Box sx={{display: 'flex', alignContent: 'center', width: '100%', padding: '5px'}}>
        <Box sx={{textAlign: 'center', height: '20px' ,width: '20px' ,fontWeight: 'bold',color: 'white',bgcolor: `rgb(${(index * 25) % 256}, ${150}, ${255 - (index * 25) % 256})`}}>{index + 1}</Box>
        <Box sx={{display: 'flex', justifyContent: 'center', width: '80%'}}>
          <Link color="white" underline='none' href={`/page/${id}`}  sx={{'&:hover': {
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

const RankList2 = ({img, name, lib, recommend, authorName, id}) => {
  return (
    <>
      <Box sx={{display: 'flex', width: '355px',marginRight: '10px'}}>
      <Link color="white" underline='none' href={`/page/${id}`}>
        <Box component="img" src={img_path + img} alt={name} width={120} height={155} />
      </Link>
      <Box sx={{ width: '235px' ,marginLeft: '10px',overflow: 'hidden',}}>
      <Link color="white" underline='none' href={`/page/${id}`} >
        <TruncatedTypography>{name}</TruncatedTypography>
      </Link>
      <Link color="white" underline='none' href={`/author_space?author_name=${authorName}`} sx={{'&:hover': {
                            color: 'darkred',
                        }}}>
        <Box sx={{ marginRight: '15px', marginTop: '10px', marginBottom: '10px'}}>{authorName}</Box>
      </Link>
      <Link color="white" underline='none' href={`/novel_lib?lib_name=${lib}`} sx={{'&:hover': {
                            color: 'darkred',
                        }}}>
        <Box sx={{marginRight: '15px', marginBottom: '10px'}}>{lib}</Box>
      </Link>
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
  marginBottom: '10px'
}


export const Rank = () => {

  const [listNew, setListNew] = useState([]);
  const [listCollect, setListCollect] = useState([]);
  const [listEnd, setListEnd] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const {userStore} = useStore();

  console.log(userStore.jwt_token);

const init_new = async () => {
  try {
    const resp = await unAuthAxios("post", 'http://localhost:8088/api/v1/page/rank-newbook', {});

    const data = resp.data;
    if (data.error_message === "success") {
      setListNew(data.rankNewBook);
    } else setListNew([]);
  } catch (error) {
    setListNew([]);
  } finally {
    setLoading1(false)
  }
}
const init_collect = async () => {
  try {
    const resp = await unAuthAxios("post", 'http://localhost:8088/api/v1/page/rank-collect', {});

    const data = resp.data;
    if (data.error_message === "success") {
      setListCollect(data.rankCollectBook);
    } else setListCollect([]);
  } catch (error) {
    setListCollect([]);
  } finally {
    setLoading2(false)
  }
}

    const init_end = async () => {
      try {
        const resp = await unAuthAxios("post", 'http://localhost:8088/api/v1/page/rank-endbook', {});

        const data = resp.data;
        if (data.error_message === "success") {
          setListEnd(data.rankCompleteBook);
        } else setListEnd([]);
      } catch (error) {
        setListEnd([]);
      } finally {
        setLoading3(false)
      }
    }


  useEffect(() => {
    init_new();
    init_collect();
    init_end();
  }, [])

  return (
    <Box sx={{ display: 'flex' }}>
      {loading1 ? <RankSkeleton /> :
        <Box sx={{color: 'white',marginLeft: '67px', marginRight: '25px' }}>
            <Typography sx={TypographyStyle}>
              新书榜
            </Typography>
            <Divider sx={{backgroundColor: '#6D6B6B', marginBottom: '25px', width: '95%'}} />

          {listNew.map((e, index) => (
            <Box key={index}>
              {index===0 ? 
                <RankList2  id={e.workId} authorName={e.fullName} img={e.workImg} name={e.workName} lib={e.workLib} recommend={e.workRecommend}/>
              :
                <RankList1 id={e.workId} index={index} name={e.workName} recommend={e.workRecommend} />
              }
            </Box>
          ))}  
          <Link href="/ranking/1" underline="none" sx={{color: 'grey', display: 'flex', justifyContent: 'end', marginRight: '35px'   ,'&:hover': {
                            color: 'white',
                        }}}>
            更多
          </Link>  
        </Box>
        }

      {loading2 ? <RankSkeleton /> :
        <Box sx={{color: 'white', marginRight: '25px' }}>
          <Typography sx={TypographyStyle}>
            收藏榜
          </Typography>
          <Divider sx={{backgroundColor: '#6D6B6B', marginBottom: '25px', width: '95%'}} />

        {listCollect.map((e, index) => (
            <Box key={index}>
              {index===0 ? 
                <RankList2 id={e.workId}   authorName={e.fullName} img={e.workImg} name={e.workName} lib={e.workLib} recommend={e.workRecommend}/>
              :
                <RankList1  id={e.workId}  index={index} name={e.workName} recommend={e.workRecommend} />
              }
          </Box>
        ))}    
        <Link href="/ranking/2" underline="none" sx={{color: 'grey', display: 'flex', justifyContent: 'end', marginRight: '35px' ,'&:hover': {
                            color: 'white',
                        }}}>
          更多
        </Link>  
      </Box>
        }
      {loading3 ? <RankSkeleton /> :
        <Box sx={{color: 'white' }}>
          <Typography sx={TypographyStyle}>
            完结榜
          </Typography>
          <Divider sx={{backgroundColor: '#6D6B6B', marginBottom: '25px', width: '95%'}} />

        {listEnd.map((e, index) => (
            <Box key={index}>
              {index===0 ? 
                <RankList2 id={e.workId}  authorName={e.fullName} img={e.workImg} name={e.workName} lib={e.workLib} recommend={e.workRecommend}/>
              :
                <RankList1 id={e.workId}  index={index} name={e.workName} recommend={e.workRecommend} />
              }
          </Box>
        ))}    
        <Link href="/ranking/3" underline="none" sx={{color: 'grey', display: 'flex', justifyContent: 'end', marginRight: '35px'   ,'&:hover': {
                            color: 'white',
                        }}}>
          更多
        </Link>  
      </Box>
        }
    </Box>

  )
}
