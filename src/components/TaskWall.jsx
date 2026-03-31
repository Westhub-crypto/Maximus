import React, { useState, useEffect } from 'react';

const TaskWall = () => {
  const [tasks, setTasks] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // 1. Grab the packaged data from the App URL
    const queryParams = new URLSearchParams(window.location.search);
    const rawData = queryParams.get('data');

    if (rawData) {
      try {
        // 2. Unpack the data and update the screen
        const parsedData = JSON.parse(decodeURIComponent(rawData));
        setBalance(parsedData.balance || 0);
        
        // Reverse the tasks so the newest ones show up at the top!
        setTasks(parsedData.tasks ? parsedData.tasks.reverse() : []);
      } catch (e) {
        console.error("Error unpacking data");
      }
    }
  }, []);

  return (
    <div className="p-4 text-white">
      
      {/* Wallet Balance Card */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-6 mb-6 shadow-xl text-center border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-white/5 opacity-50 blur-xl"></div>
        <h2 className="text-blue-100 text-sm font-semibold uppercase tracking-wider relative z-10">Current Balance</h2>
        <div className="text-5xl font-extrabold mt-2 relative z-10 drop-shadow-lg">
          {balance} <span className="text-xl text-purple-200 font-medium">Tokens</span>
        </div>
      </div>

      <div className="flex justify-between items-end mb-4 px-1">
        <h3 className="text-xl font-bold">Earn Tokens</h3>
        <span className="text-gray-400 text-sm font-medium">{tasks.length} Available</span>
      </div>

      {/* Task List */}
      {tasks.length === 0 ? (
        <div className="bg-gray-800 rounded-xl p-8 text-center border border-gray-700 mt-6 shadow-inner">
          <div className="text-4xl mb-3">📭</div>
          <h4 className="text-gray-300 font-bold text-lg">No tasks yet!</h4>
          <p className="text-gray-500 text-sm mt-1">Check back later for new ways to earn.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <div key={index} className="bg-gray-800 rounded-2xl p-5 border border-gray-700 shadow-md flex justify-between items-center transition-transform active:scale-95">
              <div>
                <h4 className="font-bold text-lg leading-tight">{task.title}</h4>
                <span className={`inline-block text-xs px-2 py-1 rounded mt-2 font-bold uppercase tracking-wider ${task.type === 'vip' ? 'bg-purple-900/50 text-purple-400 border border-purple-700' : 'bg-blue-900/50 text-blue-400 border border-blue-700'}`}>
                  {task.type}
                </span>
              </div>
              
              <div className="text-right flex flex-col items-end">
                <div className="text-green-400 font-extrabold text-xl mb-2 drop-shadow-sm">+{task.reward}</div>
                <a 
                  href={task.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white text-gray-900 text-sm font-extrabold px-5 py-2 rounded-full shadow-lg"
                >
                  Start
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskWall;
