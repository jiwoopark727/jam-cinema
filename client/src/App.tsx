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
import { useRef } from 'react';

function App() {
  const GSRef = useRef<HTMLDivElement>(null); // 에디터 픽 섹션 컴포넌트의 위치를 참조

  const onScrollToGS = () => {
    if (GSRef.current) {
      GSRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Routes>
      <Route path='/' element={<Layout onScrollToGS={onScrollToGS} />}>
        <Route index element={<HomeView ref={GSRef} />} />
        <Route path='/join' element={<JoinView />} />
        <Route path='/login' element={<LoginView />} />
        <Route path='/mypage' element={<MyPageView />} />
        <Route path='/community' element={<CommunityView />} />
        <Route path='/community/write' element={<CommunityWriteView />} />
        <Route path='/community/modify/:id' element={<CommunityModifyView />} />
        <Route path='/community/detail/:id' element={<CommunityDetailView />} />
        <Route path='/search' element={<SearchView />} />
        <Route path='/results' element={<ResultsView />} />
        <Route path='/detail/:id' element={<DetailView />} />
        <Route path='/genre/:genreId' element={<GenreView />} />
      </Route>
    </Routes>
  );
}

export default App;
