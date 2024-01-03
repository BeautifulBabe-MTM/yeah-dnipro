import React, { useState } from 'react';

const CardEditor = () => {
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    deadline: '',
    image: '',
  });

  const handleCreateProject = async () => {
    try {
      console.log('Проект успешно добавлен:', newProject);
    } catch (error) {
      console.error('Ошибка при создании проекта:', error);
    }
  };

  const handleUpdateProject = async () => {
  };

  const handleDeleteProject = async () => {
  };

  return (
    <div>
      <h2 className="card-editor">Управління проєктами</h2>
      <div className="container">
        <button type="button" onClick={handleCreateProject} className='createProj-button'>
          Створити проєкт
        </button>
        <button type="button" onClick={handleUpdateProject} className='updProj-button'>
          Оновити проєкт
        </button>
        <button type="button" onClick={handleDeleteProject} className='deleleProj-button'>
          Видалити проєкт
        </button>
      </div>
    </div>
  );
};

export default CardEditor;
