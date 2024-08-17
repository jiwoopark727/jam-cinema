import { Route, Routes } from 'react-router';
import { JoinView } from './views/JoinView';
import { Layout } from './Layout';
import { HomeView } from './views/HomeView';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomeView />} />
        <Route path='/join' element={<JoinView />} />
      </Route>
    </Routes>
  );
}

export default App;
