import AppRouter from './routes/AppRouter';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from './contexts/AuthCtx';
import { UserProvider } from './contexts/UserCtx';

function App() {
    return (
        <div className="App">
            <ToastContainer theme="dark" style={{ fontSize: '1.3em', fontWeight: 'bold' }} />
            <AuthProvider>
                <UserProvider>
                    <AppRouter />
                </UserProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
