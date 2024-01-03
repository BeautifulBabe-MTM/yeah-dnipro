import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import axios from 'axios';


const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://yeahdnipro-proj.cyclic.app/api/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
  
    fetchProjects();
  }, []);

  return ( 
    <div>
      <h2 className="title-name">Список усіх опублікованих проєктів</h2>
      <input
        type="text"
        placeholder="Пошук проєкту"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      {projects.length === 0 ? (
        <p>Жодного проєкту немає!</p>
      ) : (
        <ul className="project-list">
          {projects.map((project) => (
            // <li key={project._id} className="mb-4">
              <ProjectCard {...project} />
            // </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectList;
