import React, { useState } from 'react';

const DeleteModal = ({ projects, onCancel, onDelete }) => {
  const [selectedProject, setSelectedProject] = useState('');

  return (
    <div className="modal">
      <h3 className='modal-name'>Видалити проєкт</h3>
      <p>Виберіть проєкт для видалення:</p>
      <div className='select-container'>
        <select onChange={(e) => setSelectedProject(e.target.value)} value={selectedProject}>
          <option value="">----------</option>
          {projects && projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.id}
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
