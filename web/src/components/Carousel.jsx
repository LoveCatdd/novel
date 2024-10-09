import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@emotion/react';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { autoPlay } from 'react-swipeable-views-utils-react-18-fix';
import { Link, Typography } from '@mui/material';
import axios from 'axios';
import { authAxios, unAuthAxios } from '../api/axios';
import styled from '@emotion/styled';

const BoxStyle = {
    maxWidth: '1200px', borderRadius: '10px', margin: '20px',
    border: 'none',marginLeft: '97px', marginTop: '25px'
};

const SkeletonStyle = {
    bgcolor:'#4C4949',
    borderRadius: '10px',
    border: 'none'
}

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


const CarouselSkeleton = () => {
    return (
        <>
            <Grid xs={3} sx={{padding: '20px'}} >
                <Skeleton variant="rounded" animation="wave" width={300} height={430} sx={SkeletonStyle} />
            </Grid> 
            <Grid xs={9} sx={{boxSizing:'border-box', padding: '10px 10px 0px 50px '}}>
                <Box>
                    <Box sx={{ margin: '10px 10px 10px 0px'}}>
                        <Skeleton variant="rectangular" animation="wave" width={825} height={47}  sx={SkeletonStyle} />
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', margin: '10px 10px 10px 0px'}}>
                        <Box >
                            <Skeleton variant="rectangular" animation="wave" width={180} height={33} sx={SkeletonStyle} />
                        </Box>
                        <Box sx={{marginLeft: '90px'}}>
                            <Skeleton variant="rectangular" animation="wave" width={200} height={33}  sx={SkeletonStyle} />
                        </Box>
                    </Box>
                    <Box sx={{margin: '10px 10px 10px 0px'}}>
                        <Skeleton variant="rectangular" width={825} height={80}  animation="wave" sx={SkeletonStyle} />
                    </Box>
                    <Box sx={{margin: '10px 10px 10px 0px'}}>
                        <Skeleton variant="rectangular" width={180} height={33} animation="wave" sx={SkeletonStyle} />
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', margin: '20px 0px 0px 0px', paddingRight: '18px'}}>
                        <Box sx={{width: '100%',  marginRight: '10px'}}>
                            <Skeleton variant="rounded"  animation="wave" width={110} height={185} sx={SkeletonStyle} />
                        </Box>
                        <Box sx={{width: '100%', marginRight: '10px'}}>
                            <Skeleton variant="rounded"  animation="wave" width={110} height={185} sx={SkeletonStyle} />
                        </Box>
                        <Box sx={{width: '100%', height: '100%', marginRight: '10px'}}>
                            <Skeleton variant="rounded" animation="wave" width={110} height={185}  sx={SkeletonStyle} />
                        </Box>
                        <Box sx={{width: '100%', marginRight: '10px'}}>
                            <Skeleton variant="rounded"  animation="wave" width={110} height={185} sx={SkeletonStyle} />
                        </Box>
                        <Box sx={{width: '100%', marginRight: '10px'}}>
                            <Skeleton variant="rounded"  animation="wave" width={110} height={185} sx={SkeletonStyle} />
                        </Box>
                        <Box sx={{width: '100%', marginRight: '10px'}}>
                            <Skeleton variant="rounded"  animation="wave" width={110} height={185} sx={SkeletonStyle} />
                        </Box>
                        <Box sx={{width: '100%', marginRight: '10px'}}>
                            <Skeleton variant="rounded" animation="wave"  width={110} height={185} sx={SkeletonStyle} />
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </>
    )
}

const TruncatedTypography = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

`;

const Container = styled.div`
overflow: hidden;
`;

const img_path = "/novels";

export const Carousel = ({open}) => {

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeStep, setActiveStep] = React.useState(0);

    const init = async () => {
        try {
            const resp = await unAuthAxios("post","http://localhost:8088/api/v1/page/front-carousel",{});
            const data = resp.data;
            if (data.error_message === "success") {
                setList(data.works);
            } else setList([]);
        } catch (error) {
            setList([]);
        } finally {
            setLoading(false);
        }
    } 

    useEffect(() => {
        init();
    }, [])
    

    const handleStepChange = (step) => {
        setActiveStep(step);
    };
  
  return (
    <>
        { loading ? 
            <Box sx={BoxStyle} >
                <Grid container spacing={2}>
                    <CarouselSkeleton />
                </Grid>
            </Box>
        : 
        <Box sx={BoxStyle}>
            <Box container='true' >
                <Box sx={{padding: '20px', border: 'none',display: 'flex',position: 'relative'  }} >
                    <AutoPlaySwipeableViews
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                    >
                        {list?.map((step, index) => (
                            <Link underline='none' href={`/page/${step.workId}`} key={index}>
                            {Math.abs(activeStep - index) <= 2 ? (
                              <Box
                                component="img"
                                width={300} height={430}
                                sx={SkeletonStyle}    
                                src={img_path + step.workImg}
                                alt={step.workName}
                              />
                            ) : null}
                          </Link>
                        ))}
                    </AutoPlaySwipeableViews> 
                    <Box sx={{marginLeft: '20px'}}>
                        <Link href={`/page/${list[activeStep].workId}`} underline='none'  sx={{margin: '10px 10px 10px 0px'}}>
                            <Typography width={825} height={47} sx={{color: 'white',fontSize:'24px', fontWeight:'bold', }}>
                               {list[activeStep].workName}
                            </Typography>
                        </Link>
                        <Box sx={{display: 'flex', alignItems: 'center', margin: '10px 10px 10px 0px'}}>
                            <Box >
                                <Typography  width={180} height={33} sx={{color: 'grey'}} >
                                  作者：
                                  <Link href={`/author_space?author_name=${list[activeStep].fullName}`} underline="none" color='white' sx={{'&:hover': {
                            color: 'darkred',
                        }}}>
                                      {list[activeStep].fullName}
                                  </Link>
                                </Typography>
                            </Box>
                            <Box sx={{marginLeft: '90px', color: 'grey', width: '100%', display: 'flex'}}>
                                类型：
                                <Typography height={33} sx={{color: 'white'}} >
                                    {list[activeStep].workType}
                                </Typography>
                            </Box>
                        </Box>
                        <Container sx={{margin: '10px 10px 10px 0px'}}>
                            <TruncatedTypography width={825} height={75} sx={{color: 'white'}}>
                                {list[activeStep].workIntro}
                            </TruncatedTypography>
                        </Container>
                        <Box sx={{margin: '10px 10px 10px 0px', display: 'flex', color: 'grey'}}>
                            最后更新：
                            <Typography width={180} height={33} sx={{color: 'white'}} >
                            {new Date(list[activeStep].workLastDate).toLocaleDateString('cn', { timeZone: 'Asia/Shanghai' })}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                
                <Box sx={{boxSizing:'border-box', position: 'absolute', right: '233px', top: '359px'}}>
                    <Box sx={{display: 'flex', alignItems: 'center', margin: '20px 0px 0px 0px', paddingRight: '18px'}}>
                        {list?.map((step, index) => (
                            <Box key={index} sx={{width: '100%',  marginRight: '10px'}}>
                                <Box 
                                    component="img"
                                    width={130} 
                                    height={185} 
                                    src={img_path + step.workImg}
                                    alt={step.workName}
                                    onClick={() => handleStepChange(index)}
                                    sx={{
                                        cursor: 'pointer',
                                        opacity: index !== activeStep ? 0.3 : 1, 
                                        transition: 'opacity 0.3s ease-in-out',
                                    }} 
                        
                                />
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    }
    </>
  )
}
