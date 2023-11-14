import React from 'react';
import './App.css';

const ProjectList = ({ projects }) => {
  return (
    <div>
      <h2 className="title-name">Список усіх опублікованних проєктів</h2>
      {projects.length === 0 ? (
        <p>Жодного проєкту немає!</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project.id} className="mb-2">
              {project.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectList;