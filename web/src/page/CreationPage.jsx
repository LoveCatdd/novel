import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@emotion/react';
import { authAxios } from '../api/axios';
import { useStore } from '../store/store';
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
     
  
export const CreationPage = () => {
    const [value, setValue] = React.useState(0);
    const theme = useTheme();

    const {userStore} = useStore();
    userStore.updateUserInfoFromSessionStorage();

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const Front = () => {
      const [info, setInfo] = useState({});

      const init = async () => {
        try {
          const resp = await authAxios("get", `http://localhost:8088/api/v1/create/info?id=${userStore.uid}`,{});
          const data = resp.data;
          setInfo(data.creationInfo);
        } catch (error) {
          
        }
      }

      useEffect(() => {
        init();
      }, [])

      return (
        <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '25px'}}>
          <Box sx={{fontSize: '48px',width: '200px', borderRadius: '10px', marginRight: '15px'}}>
            <Box sx={{ display: 'flex', justifyContent: 'center', color: 'white'}}>收藏</Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', color: 'lightblue'}}>{info.totalCollect === null ? 0 : info.totalCollect}</Box>
          </Box>
          <Box sx={{fontSize: '48px',width: '200px', borderRadius: '10px',marginLeft: "10px", marginRight: '15px'}}>
            <Box sx={{ display: 'flex', justifyContent: 'center', color: 'white'}}>作品数</Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', color: 'lightblue'}}>{info.totalWorks}</Box>
          </Box>
          <Box sx={{fontSize: '48px',width: '200px', borderRadius: '10px',marginLeft: "10px", marginRight: '15px'}}>
            <Box sx={{ display: 'flex', justifyContent: 'center', color: 'white'}}>热度值</Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', color: 'lightblue'}}>{info.totalRecommendation === null ? 0 : info.totalRecommendation}</Box>
          </Box>
        </Box>
      );
    };
    
    const Works = () => {
      return (
        <Box>

        </Box>
      );
    };
    

    return (
        <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
        <Tabs 
            value={value} 
            onChange={handleChange} 
            textColor="secondary"
            indicatorColor="secondary" 
            aria-label="basic tabs example"
        >
                <Tab 
                    sx={{ 
                        color: 'white',
                        '&:hover': {
                            color: 'rgba(190, 184, 184, 0.33)', 
                        }, 
                    }} 
 
                    label='首页' 
                    {...a11yProps(0)}  
                />
                {/* <Tab 
                    sx={{ 
                        color: 'white',
                        '&:hover': {
                            color: 'rgba(190, 184, 184, 0.33)', 
                        }, 
                    }} 
 
                    label='我的作品' 
                    {...a11yProps(1)}  
                /> */}
        </Tabs>
        </Box>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Front />
        </TabPanel>
        {/* <TabPanel value={value} index={1} dir={theme.direction}>
          <Works />
        </TabPanel> */}



    </Box>
    )
}
