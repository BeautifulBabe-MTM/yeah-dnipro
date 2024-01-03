import React, { useState } from 'react';
import './App.css';
import ProjectList from './ProjectList';
import CardEditor from './CardEditor';

const App = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');


  const addProject = (newProject) => {
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="title">
        <h1 className="title-text">☼ єДніпро</h1>

        <div className='button-container'>
          <button onClick={() => navigateTo('home')} className="button">Голова сторінка</button>
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
