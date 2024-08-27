import { Route, Routes } from 'react-router';
import { JoinView } from './views/JoinView';
import { Layout } from './Layout';
import { HomeView } from './views/HomeView';
import { LoginView } from './views/LoginView';
import { CommunityView } from './views/CommunityView';
import { CommunityWriteView } from './views/CommunityWriteView';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomeView />} />
        <Route path='/join' element={<JoinView />} />
        <Route path='/login' element={<LoginView />} />
        <Route path='/community' element={<CommunityView />} />
        <Route path='/community/write' element={<CommunityWriteView />} />
      </Route>
    </Routes>
  );
}

export default App;
