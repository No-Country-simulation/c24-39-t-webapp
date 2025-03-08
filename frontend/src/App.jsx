import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import UserDataForm from './components/UserDataForm';
import Login from './components/UserLogin';

function App() {

  const [currentView, setCurrentView] = useState('login');

  const handleNavigateToRegister = () => {
    setCurrentView('register');
  };

  const handleNavigateToLogin = () => {
    setCurrentView('login');
  };

  return (
    <div className='app'>
      <Header />
      {currentView === 'login' ? (
        <Login navigateToRegister={handleNavigateToRegister} />
      ) : (
        <UserDataForm navigateToLogin={handleNavigateToLogin} />
      )}
    </div>
  );
}

export default App;
