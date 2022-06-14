import { Routes, Route } from 'react-router-dom';

// import isAuth from '../guards/isAuth';
// import isGuest from '../guards/isGuest';
// import isAdmin from '../guards/isAdmin';
import SamplePage from '../components/pages/SamplePage.js';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<SamplePage />} />
        </Routes>
    );
};

export default AppRouter;
