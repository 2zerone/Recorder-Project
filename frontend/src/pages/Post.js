import React, { useState, useEffect } from 'react';
import Clock from 'react-live-clock'

import axios from 'axios';

import InputUnstyled from '@mui/base/InputUnstyled';
import { styled } from '@mui/system';
import { Button, Stack, Avatar, Box, ImageList, ImageListItem, IconButton, Typography, getPopoverUtilityClass, Grid } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../redux/actions/user';
import { getPost } from '../redux/actions/post';
import { useParams } from 'react-router-dom';
// import Fab from '@mui/material/Fab';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';

export default function Post() {

  // 댓글 입력 창 관련
  const blue = {
    200: '#80BFFF',
    400: '#3399FF',
  };
  const grey = {
    50: '#F3F6F9',
    100: '#E7EBF0',
    200: '#E0E3E7',
    300: '#CDD2D7',
    400: '#B2BAC2',
    500: '#A0AAB4',
    600: '#6F7E8C',
    700: '#3E5060',
    800: '#2D3843',
    900: '#1A2027',
  };
  const StyledInputElement = styled('input')(
    ({ theme }) => `
    width: 500px;
    font-size: 0.875rem;
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 400;
    line-height: 1.5;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
    border-radius: 8px;
    padding: 12px 12px;
    transition: all 150ms ease;
  
    &:hover {
      background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
      border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
    }
  
    &:focus {
      outline: 2px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
      outline-offset: 2px;
    }
  `,
  );
  const CustomInput = React.forwardRef(function CustomInput(props, ref) {
    return (
      <InputUnstyled components={{ Input: StyledInputElement }} {...props} ref={ref} />
    );
  });
  
  // const { user: currentUser } = useSelector((state) => state.auth);
  // const data = useSelector((state) => state.user);

  // const [ userData, setUserData ] = useState([]);
  const [ postData, setPostData ] = useState([]);

  // const dispatch = useDispatch();

  const { postId } = useParams();

  useEffect(() => {
    getPosts();
    // setCurrentData(getPostById(postId));
  }, []);

  function getPosts() {
    axios.get('http://localhost:8080/board/posts/' + `${postId}`)
    .then((res) => {
      setPostData(res.data);
      console.log(res.data);
    })
  }

  // console.log('postData.userId', postData.userId);

  // function getUsers() {
  //   dispatch(getUser(postData.userId))
  //   .then((data) => {
  //     setUserData(data);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   })
  // }
  // const getPostById = postId => {
  //   const array = postData.filter(x => x.postId == postId);
  //   if (array.length === 1) {
  //     return array[0];
  //   }
  //   return null;
  // }

  return(
    <Box
      sx={{
        mt: '20px',
        width: '800px',
        border: '1px solid pink',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* 타이틀 */}
     <Typography variant="h4" sx={{ py: '20px' }}>{postData.title}제목 들어갈 것임</Typography>

      {/* 작성자 */}
      <Box sx={{ 
        width: '600px',
        display: 'flex', 
        flexDirection: 'column', 
        p: 0.5, 
        alignItems: 'end' 
        }}
      >
        <Typography >{postData.userNickname}</Typography>
      </Box>

      {/* 내용 */}
      <Box
        sx={{
          mt: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
      {postData.content}
      </Box>

      {/* 하단 작성자 프로필사진, 이름, 설명 */}
      <Box 
        sx={{ 
          width: '500px',
          display: 'flex', 
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Avatar alt="jiwoon-joo" src={postData.profilePhoto} sx={{ width: 80, height: 80, mr: '10px' }}/>
        <Stack spacing={1}>
          <Typography variant="h6" >{postData.domain}</Typography>
          <Typography variant="h7" >{postData.introduce}</Typography>
        </Stack>
      </Box>

      
      {/* 댓글 입력 */}
      <Stack direction="row" spacing={1} sx={{ my: 3 }}>
        <CustomInput aria-label="Demo input" placeholder="댓글을 입력해주세요" />
        <Button size="small" sx={{ backgroundColor: '#ff5f70', color: 'white', ':hover': { bgcolor: '#ffc0cb'}}}>등록</Button>
      </Stack>

    </Box>
  );   
}