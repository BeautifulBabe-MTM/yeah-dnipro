import React, { useState } from 'react';
import './App.css';
import ProjectList from './ProjectList';
import CardEditor from './CardEditor';

const App = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1 className="title-text">☼ єДніпро</h1>
      <div className="title">
        <div className='button-container-navbar'>
          <button onClick={() => navigateTo('home')} className="button">Головна сторінка</button>
          <button onClick={() => navigateTo('card-editor')} className="button">Управління проєктами</button>
        </div>
      </div>
      <div className='body-part'>
        {currentPage === 'home' && (
          <div>
            <ProjectList projects={projects} />
          </div>
        )}
        {currentPage === 'card-editor' && (
          <CardEditor />
        )}
      </div>
    </div>
  );
};

export default App;
