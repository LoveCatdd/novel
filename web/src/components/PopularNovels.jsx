import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { authAxios, unAuthAxios } from '../api/axios';
import { json } from 'react-router';
import styled from '@emotion/styled';
import { Divider, Link } from '@mui/material';
import SegmentIcon from '@mui/icons-material/Segment';

const BoxStyle = {
    maxWidth: '1200px',
    // backgroundColor: '#333131',
    borderRadius: '10px',
    margin: '20px',
    padding: '10px 0px 0px 15px',
    marginLeft: '97px',
};

const SkeletonStyle = {
    bgcolor:'#4C4949',
    borderRadius: '10px',
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
margin-bottom: 10px;
`;

const img_path = "/novels";


const SingleSkeleton = () => {
    return (
        <Box sx={{marginBottom: '20px', marginLeft: '10px'}}>
            <Box sx={{marginBottom: '10px'}}>
                <Skeleton variant='round'width={150} height={35} animation="wave" sx={SkeletonStyle} />
            </Box>
            <Box>
                <Skeleton variant='round'width={150} height={125} animation="wave" sx={SkeletonStyle} />
            </Box>
        </Box>
    )
}

const PopularNovelsSkeleton = () => {
    return (
        <Grid xs={3}>
            <SingleSkeleton />
            <SingleSkeleton />
        </Grid>
    )
}



export const PopularNovels = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    const init = async () => {
        try {
            const resp = await unAuthAxios("post", 'http://localhost:8088/api/v1/page/front-hotbook', {});
    
            const data = resp.data;
            if (data.error_message === "success" ) {
                setList(data.hotWorks);
            } else setList([]);
            console.log(list[0])
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
    <Box sx={BoxStyle} >
        <Typography sx={{ color: '#FFFFFF', fontSize: '30px', marginBottom: '10px', fontWeight: 'bold'}}>
            热门小说
        </Typography>
        {loading ? 
            <Grid container spacing={4} sx={{marginTop: '5px'}}>
                <PopularNovelsSkeleton />
                <PopularNovelsSkeleton />
                <PopularNovelsSkeleton />
                <PopularNovelsSkeleton />
            </Grid>
            :
            <Box sx={{display:'flex', flexWrap: 'wrap', color: 'white'}}>
                {list?.map((e, index) => (
                    <Box key={index} sx={{marginBottom: '20px', marginLeft: '10px',width: 'calc(20% + 140px)'}}>
                        <Box sx={{marginBottom: '10px'}}>
                            <Typography width={360} height={35} >
                                <Link href={`/novel_lib?lib_name=${e.lib}`} underline="none" color='grey' sx={{fontSize: '20px', display: 'flex','&:hover': {
                            color: 'darkred',
                        } }}>
                                    <SegmentIcon sx={{marginTop:'2px'}}/>
                                    {e.lib}
                                </Link>
                            </Typography>
                        </Box>
                            {e.list.map((el, index) => (
                                <Container>
                                    <Link color="white" underline='none' href={`/page/${el.workId}`}>
                                        <TruncatedTypography  key={index} variant='round'width={360} height="auto" sx={{fontSize: '16px' ,'&:hover': {
                            color: 'darkred',
                        }}} >
                                            {el.workName}
                                        </TruncatedTypography>
                                    </Link>
                                    <Divider sx={{backgroundColor: '#6D6B6B',marginTop: '3px', marginBottom: '5px', width: '95%'}} />
                                </Container>
                            ))}
                    </Box>
                ))}
            </Box>}
    </Box>
  )
}
