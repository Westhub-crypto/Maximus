import React, { useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import AdminDashboard from './components/AdminDashboard';
import TaskWall from './components/TaskWall';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [view, setView] = useState('user'); // Default to user view
  const [loading, setLoading] = useState(true);

  const ADMIN_ID = 8067627422;

  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
    const user = WebApp.initDataUnsafe?.user;

    // Security Check
    if (user && user.id === ADMIN_ID) {
      setIsAdmin(true);
      setView('admin'); // Show Admin Panel by default for you
    }
    setLoading(false);
  }, []);

  if (loading) return <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center">Loading Maximus...</div>;

  return (
    <div className="min-h-screen bg-gray-900 font-sans pb-10">
      
      {/* 🚀 TOGGLE MENU: Only visible to you (the Admin) */}
      {isAdmin && (
        <div className="bg-gray-800 p-3 flex justify-center space-x-4 border-b border-gray-700">
          <button 
            onClick={() => setView('admin')}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${view === 'admin' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-700 text-gray-400'}`}
          >
            Admin Panel
          </button>
          <button 
            onClick={() => setView('user')}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${view === 'user' ? 'bg-purple-600 text-white shadow-lg' : 'bg-gray-700 text-gray-400'}`}
          >
            View Task Wall
          </button>
        </div>
      )}

      {/* Render the screen you selected */}
      {view === 'admin' ? <AdminDashboard /> : <TaskWall />}

    </div>
  );
}

export default App;
