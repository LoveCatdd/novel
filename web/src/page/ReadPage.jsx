import { Box, Breadcrumbs, Divider, Link, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { authAxios, unAuthAxios } from '../api/axios';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useStore } from '../store/store';

export const ReadPage = () => {


const handleRedo = () => {
  console.log(page);
  if (page < (maxPage)) {
    window.location.href = `/page/${wid}/${(parseInt(page) + 1)}?name=${name}&page=${(parseInt(page) + 1)}&path=${path}&count=${maxPage}`;
  }

}

const handleUndo = () => {
  if (page > 1) {
    window.location.href = `/page/${wid}/${parseInt(page) - 1}?name=${name}&page=${parseInt(page) - 1}&path=${path}&count=${maxPage}`;
  }
}
const handleArrowForward = () => {
  if (idx < (maxIdx - 1)) {
    setIdx(idx + 1);
  }
}

const handleArrowBackIos = () => {
  if (idx > 0) {
    setIdx(idx - 1);
  }
}

const handleArrowRight = () => {
  if (idx_ < (maxIdx_ - 1)) {
    setIdx_(idx_ + 1);
    setIdx(0);
  }
}
const handleArrowLeft = () => {
  if (idx_ > 0) {
    setIdx_(idx_ - 1);
    setIdx(0);
  }
}

const actions = [
  { icon: <KeyboardDoubleArrowRightIcon onClick={handleRedo} />, name: '下一卷' },
  { icon: <KeyboardDoubleArrowLeftIcon onClick={handleUndo}/>, name: '上一卷' },
  { icon: <KeyboardArrowRightIcon onClick={handleArrowRight} />, name: '下一章' },
  { icon: <KeyboardArrowLeftIcon  onClick={handleArrowLeft}/>, name: '上一章' },
  { icon: <LastPageIcon onClick={handleArrowForward} />, name: '下一页' },
  { icon: <FirstPageIcon  onClick={handleArrowBackIos}/>, name: '上一页' },
  ];
  
const tilteStyle = {
  display: 'flex', 
  justifyContent:'center',
  alignContent: 'center',
  fontSize: '36px',
  marginTop: '15px',
  marginBottom: '10px',
  color: '#CCCCCC'
};

const articleStyle = {
  marginLeft: '55px',
  marginBottom: '45px',
  fontSize: '24px',
  color: '#CCCCCC'
};

  const {wid} = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name');
  const page = queryParams.get('page');
  const path = queryParams.get('path');
  const maxPage = queryParams.get('count');
  const file_path = `/novels${path}/txt`;
  const [chunks, setChunks] = useState([[]]);
  const [loading, setLoading] = useState(true);
  const [idx, setIdx] = useState(0);
  const [idx_, setIdx_] = useState(0);
  const navigate =  useNavigate();
  const {userStore} = useStore();
  userStore.updateUserInfoFromSessionStorage();


  const maxIdx_ = chunks.length;
  const maxIdx = chunks[idx_].length;

  const init = async () => {
      try {
        const resp = await unAuthAxios('get', `${file_path}/${page}.txt`, {});
        const content = resp.data;
        const lines = content.split('\n');
        
        const chunks_ = [];
        let currentChunk = [];
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];

          if (line.includes('Act')) {
            if (currentChunk.length > 0) {
              chunks_.push(currentChunk);
            }
            currentChunk = [line];
          } else {
            currentChunk.push(line);
          }
        }
        if (currentChunk.length > 0) {
          chunks_.push(currentChunk);
        }

        const subChunks = chunks_.map(chunk => {
          const subChunkSize = 400;
          const subChunks = [];
          for (let i = 0; i < chunk.length; i += subChunkSize) {
            const subChunk = chunk.slice(i, i + subChunkSize);
            subChunks.push(subChunk);
          }
          return subChunks;
        });
  
        console.log(subChunks);
  
        setChunks(subChunks);
        setLoading(false);
        
      } catch (error) {
        console.error('Error fetching or processing file:', error);
      }
      
      if (userStore.uid === '') return ;
      authAxios("post", 'http://localhost:8088/api/v1/watch/watch-addhistory', {
        wid: wid,
        uid: userStore.uid,
        createDate: new Date()
      });
  }

    useEffect(() => {
      init();
    },[])


    const breadcrumbs = [
        <Link
          underline="none"
          key="1"
          style={{ color: "grey" }}
          href='/'
        >
          首页
        </Link>,
        <Link
          underline="none"
          key="2"
          style={{ color: "grey" }}
          href={`/page/${wid}`}
        >
          {name}
        </Link>,
        <Typography key="3" color="white" sx={{display: 'flex'}}>
          第{page}话 
          <Box component="i" sx={{marginLeft: '10px', marginRight: '10px'}}>{idx_ + 1}/{maxIdx_}章</Box>
          <Box component="i">{idx + 1}/{maxIdx}页</Box>
        </Typography>,
      ];
    
  return (
    <>
        <Box>
            <Breadcrumbs color="rgba(190, 184, 184)" separator="›" aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
        </Box>
        <Box sx={{userSelect: 'none', position: 'relative', marginTop: '10px',height: '80%', marginLeft: '35px'}}>
            {!loading && <Box sx={{ height: '100%', color: '#222621', minHeight: "1000px"}}>
                {chunks[idx_][idx].map((e, index) => (
                  <Box key={index} >
                    <Typography sx={index === 0 && idx === 0 ? tilteStyle : articleStyle} >{e}</Typography>
                    {index === 0 && idx === 0 && <Divider sx={{backgroundColor: '#6D6B6B'}} />}
                  </Box>
                ))}
            </Box>}
            <Box sx={{position: 'fixed',bottom: 90, right: 60, transform: 'translateZ(0px)', flexGrow: 1,  }}>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    icon={<SpeedDialIcon />}
                >
                    {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                    />
                    ))}
                </SpeedDial>
            </Box>

        </Box>
    
    </>

  )
}
