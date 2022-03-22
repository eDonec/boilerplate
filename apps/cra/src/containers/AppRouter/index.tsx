import { Route, Routes } from 'react-router-dom';

import HomePage from 'pages/HomePage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/dashboard' element={<HomePage />} />
    </Routes>
  );
};

export default AppRouter;
