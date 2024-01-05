import React, { useState } from 'react';

const DeleteModal = ({ projects, projectName, onCancel, onDelete }) => {
  const [selectedProject, setSelectedProject] = useState('');

  return (
    <div className="modal">
      <h3 className='modal-name'>Видалити проєкт</h3>
      <p>Виберіть проєкт для видалення: {projectName}</p>
      <div className='select-container'>
        <select onChange={(e) => setSelectedProject(e.target.value)} >
          <option value="">----------</option>
          {projects && projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.name} - {project._id}
            </option>
          ))}
        </select>
      </div>
      <div className="delete-modal-buttons">
        <button type="button" onClick={() => onDelete(selectedProject)} className='button-save'>
          Видалити
        </button>
        <button onClick={onCancel} className="button-save">
          Закрити
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
