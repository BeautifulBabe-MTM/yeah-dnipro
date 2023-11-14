import React from 'react';
import './App.css';

const ProjectList = ({ projects }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Project List</h2>
      {projects.length === 0 ? (
        <p>No projects available</p>
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