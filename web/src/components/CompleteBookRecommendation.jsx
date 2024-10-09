import React from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';


const BoxStyle = {
    maxWidth: '1200px',
    backgroundColor: '#333131',
    borderRadius: '10px',
    margin: '20px',
    padding: '10px 0px 0px 15px',

};

const SkeletonStyle = {
    bgcolor:'#4C4949',
    borderRadius: '10px',
}

const SingleSkeleton_1 = () => {
    return (
        <>
        </>
    )
}

const SingleSkeleton_2 = () => {
    return (
        <>
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
            <Box sx={{marginTop: '10px', marginLeft: '10px', marginBottom: '5px' }}>
                <Skeleton variant='round' width={280} height={100} animation="wave" sx={SkeletonStyle} />
            </Box>
        </>
    )
}

const CompleteBookRecommendationSkeleton_1 = () => {
    return (
        <Grid xs={4}>
            <SingleSkeleton_1 />
        </Grid>
    )
}


const CompleteBookRecommendationSkeleton_2 = () => {
    return (
        <Grid xs={4}>
            <SingleSkeleton_2 />
        </Grid>
    )
}

export const CompleteBookRecommendation = () => {
  return (
    <Box sx={BoxStyle} >
        <Typography sx={{ color: '#FFFFFF', fontSize: '30px' }}>
            完本推荐
        </Typography>
        <Grid container spacing={3}>
            <CompleteBookRecommendationSkeleton_1 />
            <CompleteBookRecommendationSkeleton_2 />
            <CompleteBookRecommendationSkeleton_2 />
        </Grid>
    </Box>
  )
}
