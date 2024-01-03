import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import axios from 'axios';


const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterProjects = () => {
    console.log('Search term:', searchTerm);
    const filteredProjects = projects.filter((project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log('Filtered projects:', filteredProjects);
    return filteredProjects;
  };

  const filteredProjects = filterProjects();

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
          {filteredProjects.map((project) => (
            <ProjectCard key={project.name} {...project} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectList;
