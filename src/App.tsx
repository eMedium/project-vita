import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store';
import PhaserView from './components/phaser/PhaserView';


const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();


  return (
    <div className="flex flex-col h-screen">
      <div className='text-center text-2xl font-bold text-white bg-gray-800 p-2 relative z-20'>
        Phaser Game
      </div>
      <div className="flex-1 relative">
        <PhaserView />
      </div>
      <div className='text-center text-2xl font-bold text-white bg-gray-800 p-2 relative z-20'>
        Footer
      </div>
    </div>
  );
};

export default App;
