import React, { useEffect, useState } from 'react';
import { useAuthStore } from './store/AuthStore';
import Register from './components/Register';
import Login from './components/Login';
// import Main from './components/Main';

const App: React.FC = () => {
  const { user, logout } = useAuthStore();
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      useAuthStore.setState({ token });
    }
  }, []);

  const handleShowLogin = () => setShowLogin(true);
  const handleShowRegister = () => setShowLogin(false);

  return (
    <div className="min-h-screen bg-gray-100 ">
      <header className="bg-white shadow-md min-h-20 text-white p-4 flex items-center justify-center">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">To-Do List</h1>
          {user && (
            <button onClick={logout} className="bg-red-500 p-2 rounded hover:bg-red-600">
              Вийти
            </button>
          )}
        </div>
      </header>
      <main className="p-4">
        {/* {!user ? ( */}
          <div className="space-y-8">
            {showLogin ? (
              <Login onShowRegister={handleShowRegister} />
            ) : (
              <Register onShowLogin={handleShowLogin} />
            )}
          </div>
        {/* // ) : (
        //   <Main />
        // )} */}
      </main>
    </div>
  );
};

export default App;