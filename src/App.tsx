import { Outlet } from 'react-router-dom';
import './App.css';
import Layout from './components/common/Layout/Layout';
import Header from './components/common/Header/Header';

function App() {
  return (
    <>
      <Header />
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
}

export default App;
