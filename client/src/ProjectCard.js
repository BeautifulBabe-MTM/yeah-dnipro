import React, { useState } from 'react';
import './App.css';

const ProjectCard = ({ name, description, deadline, image }) => {
  return (
    <div className="project-card">
      <img src={image} alt={name} className="project-image" />
      <h2>{name}</h2>
      <div className="project-details">
        <p>Деталі: {description}</p>
        <p>Дедлайн: {deadline}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
