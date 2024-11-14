import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import UsersList from './views/UsersList';
import Register from './views/Register';
import Editing from './views/Editing';
import Login from './views/Login';
import Home from './views/Home';
import Test from './views/Test';
import './index.css';
import AccessDenied from './views/AccessDenied';
import ProtectedRoute from './components/shared/ProtectedRoute';
import Template from './views/Template';
import Void from './views/Void';
import NotFound from './views/NotFound';

const App: React.FC = () => {

  return (
    <UserProvider>
      <BrowserRouter>

        <main className="flex-grow pt-16 bg-white dark:bg-gray-900 text-black dark:text-gray-200 ">
          <Routes>
            <Route path='/' element={<ProtectedRoute><Template /></ProtectedRoute>} >
              <Route path='home' element={<Home />} />
              <Route path='register' element={<Register />} />
              <Route path='editing' element={<Editing />} />
              <Route path='UsersList' element={<UsersList />} />
            </Route>

            <Route index path='login' element={<Login />} />
            <Route path='accessDenied' element={<AccessDenied />} />
            <Route path='test' element={<Test />} />
            <Route path='void' element={<Void />} />
            <Route path='*' element={<NotFound />} />

          </Routes>
        </main>

      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
