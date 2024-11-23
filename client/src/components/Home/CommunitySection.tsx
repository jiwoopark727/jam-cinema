import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styled, { keyframes } from 'styled-components';
import { RootState } from '../../store';
import dayjs from 'dayjs';

const blinkAnimation = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const COMWrapper = styled.div`
  width: 1200px;
  margin: auto;
  padding-top: 39px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;

  .title {
    font-size: 27px;
    font-weight: 400;
  }

  .more {
    font-size: 16px;
    margin-top: 20px;
    cursor: pointer;
  }
`;

const COMCotainer = styled.div`
  text-align: start;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  padding-top: 30px;

  .sub_title {
    padding-bottom: 20px;
  }

  .under_line {
    margin-top: 10px;
    margin-bottom: 22px;
    border: 1.3px black solid;
  }

  .post_box {
    background-color: white;
    width: 584px;
    height: 305px;
    border-radius: 15px;
    padding: 20px;
  }

  .post {
    padding-top: 14px;
    padding-bottom: 15px;
    border-bottom: 1px black solid;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }

  .post_title {
    text-align: start;
  }

  .post_viewCount {
    font-size: 14px;
    color: gray;
  }

  .hot_text {
    color: red;
    font-size: 12px;
    padding-left: 5px;
    animation: ${blinkAnimation} 0.7s infinite;
  }

  .new_text {
    color: red;
    font-size: 12px;
    padding-left: 5px;
    animation: ${blinkAnimation} 0.7s infinite;
  }
`;

interface IPost {
  communityNumber: number;
  title: string;
  nickname: string;
  date: string;
  hit: number;
}

export const CommunitySection = () => {
  const navigate = useNavigate();

  const currentUser = useSelector(
    (state: RootState) => state.members.user.nickname
  );

  const [popularPost, setPopularPost] = useState<IPost[]>();
  const [recentPost, setRecentPost] = useState<IPost[]>();

  useEffect(() => {
    axios
      .get('http://localhost:8001/community/list/recent')
      .then((res) => {
        // console.log(res.data);
        setRecentPost(res.data);
        console.log(recentPost);
      })
      .catch((err) => console.log(err));

    axios
      .get('http://localhost:8001/community/list/popular')
      .then((res) => {
        // console.log(res.data);
        setPopularPost(res.data);
        console.log(popularPost);
      })
      .catch((err) => console.log(err));
  }, []);

  const formatTimeDifference = (postTime: string) => {
    const postDate = new Date(postTime);
    const currentDate = new Date();

    console.log(postTime);
    console.log(postDate.getTime());
    console.log(currentDate.getTime());

    const diff = currentDate.getTime() - postDate.getTime();
    console.log(diff);
    console.log(dayjs(postDate).format('YYYY-MM-DD'));
    const diffMinutes = Math.floor(diff / (1000 * 60));
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) {
      return '방금 전';
    } else if (diffMinutes < 60) {
      return `${diffMinutes}분 전`;
    } else if (diffHours < 24) {
      return `${diffHours}시간 전`;
    } else if (diffDays < 7) {
      return `${diffDays}일 전`;
    } else {
      return postDate.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
  };

  return (
    <COMWrapper>
      <HeaderContainer>
        <span className='title'>
          커뮤니티 <FontAwesomeIcon icon={faGlobe} />
        </span>
        <span className='more'>더보기 +</span>
      </HeaderContainer>
      <COMCotainer>
        <div className='sub_title'>
          <span>인기 게시글 👀</span>
          <hr className='under_line' />
          <div className='post_box'>
            {popularPost?.map((post, idx) => {
              return (
                <div
                  className='post'
                  key={idx}
                  onClick={() =>
                    navigate('/community/detail/' + `${post.communityNumber}`, {
                      state: { info: post, currentUser: currentUser },
                    })
                  }
                >
                  <span className='post_title'>
                    <span>{post.title}</span>
                    <span className='hot_text'>HOT</span>
                  </span>
                  <span className='post_viewCount'>{post.hit}회</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className='sub_title'>
          <span>최근 게시글 🔥</span>
          <hr className='under_line' />
          <div className='post_box'>
            {recentPost?.map((post, idx) => {
              return (
                <div
                  className='post'
                  key={idx}
                  onClick={() =>
                    navigate('/community/detail/' + `${post.communityNumber}`, {
                      state: { info: post, currentUser: currentUser },
                    })
                  }
                >
                  <span className='post_title'>
                    <span>{post.title}</span>
                    <span className='new_text'>NEW</span>
                  </span>
                  <span className='post_viewCount'>
                    {formatTimeDifference(post.date)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </COMCotainer>
    </COMWrapper>
  );
};
