import { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EventsPage from './pages/Events';
import EventDetails from './components/EventDetails';
import { EventProvider } from './contexts/EventContext';
import SignUpPage from './pages/SignUp';
import LoginPage from './pages/Login';
import SiteHeadingAndNav from './components/SiteHeadingAndNav';
import NotFoundPage from './pages/NotFound';
import UserContext from './contexts/current-user-context';
import { checkForLoggedInUser } from './adapters/auth-adapter';
import UsersPage from './pages/Users';
import UserPage from './pages/User';
import { ParticipantProvider } from './contexts/ParticipantContext';

export default function App() {
  const { setCurrentUser } = useContext(UserContext);
  useEffect(() => {
    checkForLoggedInUser().then(setCurrentUser);
  }, [setCurrentUser]);

  return (
    <>
      <SiteHeadingAndNav />
      <main>
        <ParticipantProvider>
           <EventProvider>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/events' element={<EventsPage />} />
              <Route path='/events/:id' element={<EventDetails />} /> 
              <Route path='/login' element={<LoginPage />} />
              <Route path='/sign-up' element={<SignUpPage />} />
              <Route path='/users' element={<UsersPage />} />
              <Route path='/users/:id' element={<UserPage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </EventProvider>
        </ParticipantProvider>
       
      </main>
    </>
  );
  
}
