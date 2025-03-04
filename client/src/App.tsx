import { Route, Routes } from 'react-router';
import { JoinView } from './views/JoinView';
import { Layout } from './Layout';
import { HomeView } from './views/HomeView';
import { LoginView } from './views/LoginView';
import { CommunityView } from './views/CommunityView';
import { CommunityWriteView } from './views/CommunityWriteView';
import { CommunityModifyView } from './views/CommunityModifyView';
import { CommunityDetailView } from './views/CommunityDetailView';
import SearchView from './views/SearchView';
import ResultsView from './views/ResultsView';
import DetailView from './views/DetailView';
import GenreView from './views/GenreView';
import { MyPageView } from './views/MyPageView';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { userLogin, userLogout } from './store/member';
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { darkTheme, lightTheme } from './theme';
import NewsView from './views/NewsView';

function App() {
  const dispatch = useDispatch();
  const GSRef = useRef<HTMLDivElement>(null); // 에디터 픽 섹션 컴포넌트의 위치를 참조

  const onScrollToGS = () => {
    if (GSRef.current) {
      GSRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // 페이지 로드 시 localStorage에서 토큰을 읽어서 인증 처리
    const accessToken =
      localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

    if (accessToken) {
      // Access Token을 사용하여 유효한 로그인 세션을 확인
      axios
        .get('http://localhost:8001/auth/api/protected', {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          // 로그인된 사용자 정보 저장
          dispatch(userLogin(response.data.user)); // 로그인 상태 업데이트 (Redux)
        })
        .catch((error) => {
          console.error('Token verification failed', error);
          localStorage.removeItem('accessToken'); // 토큰이 만료된 경우 로그아웃 처리
          dispatch(userLogout({})); // Redux 상태 업데이트 (로그아웃)
        });
    }
  }, [dispatch]); // 앱 시작 시 한 번 실행

  useEffect(() => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
  }, []);

  const isDark = useSelector((state: RootState) => state.darkMode.dark);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Routes>
        <Route path='/' element={<Layout onScrollToGS={onScrollToGS} />}>
          <Route index element={<HomeView ref={GSRef} />} />
          <Route path='/join' element={<JoinView />} />
          <Route path='/login' element={<LoginView />} />
          <Route path='/mypage' element={<MyPageView />} />
          <Route path='/community' element={<CommunityView />} />
          <Route path='/news' element={<NewsView />} />
          <Route path='/community/write' element={<CommunityWriteView />} />
          <Route path='/community/modify/:id' element={<CommunityModifyView />} />
          <Route path='/community/detail/:id' element={<CommunityDetailView />} />
          <Route path='/search' element={<SearchView />} />
          <Route path='/results' element={<ResultsView />} />
          <Route path='/detail/:id' element={<DetailView />} />
          <Route path='/genre/:genreId' element={<GenreView />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
