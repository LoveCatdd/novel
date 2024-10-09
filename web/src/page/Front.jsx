import React from 'react'
import Box from '@mui/material/Box';
import { Carousel } from '../components/Carousel';
import {CompleteBookRecommendation} from '../components/CompleteBookRecommendation';
import {PopularNovels} from '../components/PopularNovels';
import {NewBookSelection} from '../components/NewBookSelection';


export const Front = () => {

    const user =  sessionStorage.getItem('user');
    // console.log(user.jwt_token);
    return (
        <>
            <Box className='main-bottom'>
                <Carousel />
            </Box>
            <Box className='main-bottom'>
                <NewBookSelection />
            </Box>
            <Box className='main-bottom'>
                <PopularNovels />
            </Box>
            {/* <Box className='main-bottom'>
                <CompleteBookRecommendation />
            </Box> */}
    </>
    )
}
