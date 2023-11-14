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
    <div className="title">
      <h1 className="text-3xl font-bold mb-4">☼ єДніпро</h1>

      <div className='button-container'>
        <button onClick={() => navigateTo('home')} className="button">Home</button>
        <button onClick={() => navigateTo('card-editor')} className="button">Проєкти</button>
      </div>
      
      {currentPage === 'home' && (
        <div>
          <ProjectList projects={projects} />
        </div>
      )}
      {currentPage === 'card-editor' && (
        <CardEditor />
      )}
    </div>
  );
};

export default App;
