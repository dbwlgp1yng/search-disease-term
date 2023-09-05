import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import NotFound from '../pages/NotFound';
import Main from '../pages/Main';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [{ index: true, path: '/', element: <Main /> }],
  },
]);