import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { authAxios, unAuthAxios } from '../api/axios';
import styled from '@emotion/styled';
import { Link } from '@mui/material';

const BoxStyle = {
    maxWidth: '1500px',
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

const SingleSkeleton = () => {
    return (
        <Box sx={{display: 'flex'}}>
            <Grid xs={3} sx={{marginRight: '10'}}>
                <Box>
                    <Skeleton variant='round'width={90} height={125} animation="wave" sx={SkeletonStyle} />
                </Box>
            </Grid>
            <Grid xs={9}>
                <Box sx={{marginBottom: '10px', marginLeft: '10px'}}>
                    <Skeleton variant='round' width={100} height={25} animation="wave" sx={SkeletonStyle} />
                </Box>
                <Box sx={{marginBottom: '10px', marginLeft: '10px'}}>
                    <Skeleton variant='round' width={170} height={50} animation="wave" sx={SkeletonStyle} />
                </Box>
                <Box sx={{marginBottom: '10px', marginLeft: '10px', display: 'flex'}}>
                    <Box sx={{marginBottom: '10px'}}>
                        <Skeleton variant='round' width={70} height={25} animation="wave" sx={SkeletonStyle} />
                    </Box>
                    <Box sx={{marginLeft: '40px'}}>
                        <Skeleton variant='round' width={60} height={25} animation="wave" sx={SkeletonStyle} />
                    </Box>
                </Box>
            </Grid>
        </Box>
    )
}

const NewBookSelectionSkeleton = () => {
    return (
        <Grid xs={4}>
            <SingleSkeleton />
            <SingleSkeleton />
        </Grid>
    )
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
margin-left: 10px;
`;

const img_path = "/novels";


export const NewBookSelection = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    
    const init = async () => {
        try {
            const resp = await unAuthAxios("post", 'http://localhost:8088/api/v1/page/front-newbook', {});

            const data = resp.data;
            if (data.error_message === "success") {
                setList(data.newWorks);
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
        <Box sx={BoxStyle} >
            <Typography sx={{marginLeft: '0px', color: '#FFFFFF', fontSize: '30px' }}>
                新书精选
            </Typography>
            {loading ? 
                    <Grid container spacing={3} sx={{marginTop: '5px'}}>
                    <NewBookSelectionSkeleton />
                    <NewBookSelectionSkeleton />
                    <NewBookSelectionSkeleton />
                </Grid>
            :
            <Box sx={{display:'flex', flexWrap: 'wrap', color: 'white', width: '100%'}}>
                {/* {list} */}
                {list.map((e, index) => (
                    <Box key={index} sx={{width: 'calc(20% + 140px)',display: 'flex',margin: '10px',paddingBottom: '10px' ,paddingTop: '10px'  ,'&:hover': {
                        bgcolor: '#333131',
                        borderRadius: '10px',
                        transition: '0.3s ease',
                        paddingLeft: '15px',
                      },
                    }}>
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
                        }}} >{e.fullName}</Link>
                                </Typography>
                            </Box>
                            <Box sx={{marginLeft: '40px'}}>
                                <Typography width={100} height={25} sx={{color: 'grey', fontSize: '16px'}}>
                                    <Link href={`/novel_lib?lib_name=${e.workLib}`} underline="none" color='grey' sx={{'&:hover': {
                            color: 'white',
                        }}}>{e.workLib}</Link>
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                ))}
            </Box>
            }

        </Box>
    )
}
