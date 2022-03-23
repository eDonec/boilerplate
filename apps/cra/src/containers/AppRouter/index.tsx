import { Route, Routes } from 'react-router-dom';

import HomePage from 'pages/HomePage';

const AppRouter = () => (
  <Routes>
    <Route path='/' element={<HomePage />} />
  </Routes>
);

export default AppRouter;
