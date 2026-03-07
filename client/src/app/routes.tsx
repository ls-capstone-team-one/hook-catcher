import { Route, Routes } from 'react-router';

import App from '@/app/App';

const AppRoutes = () => (
  <Routes>
    <Route element={<App />} path="/" />
  </Routes>
);

export default AppRoutes;
