import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteModal from './Modals/DeleteModal';

const CardEditor = () => {
  const [newProject, setNewProject] = useState({
    id: '',
    name: '',
    description: '',
    deadline: '',
    image: '',
  });

  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [projects, setProjects] = useState([]);

  const [errors, setErrors] = useState({
    name: '',
    description: '',
    deadline: '',
    image: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if ((newProject.name.length > 25) || newProject.name.length <= 0) {
      newErrors.name = 'Назва повинна бути не довшою за 25 символів або пустою';
      isValid = false;
    } else {
      newErrors.name = '';
    }

    if ((newProject.description.length > 100) || newProject.description.length <= 0) {
      newErrors.description = 'Опис не повинен бути довшим за 100 символів або пустим';
      isValid = false;
    } else {
      newErrors.description = '';
    }

    if (newProject.deadline.length <= 0) {
      newErrors.deadline = 'Дедлайн не може бути пустим';
      isValid = false;
    } else {
      newErrors.deadline = '';
    }

    if (newProject.image.length <= 0) {
      newErrors.image = 'Посилання на зображення не може бути пустим';
      isValid = false;
    } else {
      newErrors.image = '';
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreateProject = async () => {
    try {
      if (validateForm()) {
        console.log('Отправляемый объект:', newProject);
        const response = await axios.post('https://yeahdnipro-proj.cyclic.app/api/addProject', newProject);

        console.log('Проект успешно добавлен:', response.data);

        setIsAddProjectModalOpen(false);
      } else {
        console.error('Форма содержит ошибки');
      }
    } catch (error) {
      console.error('Ошибка при создании проекта:', error);
    }
  };

  const handleUpdateProject = async () => {
  };

  const handleDeleteProject = async () => {
    try {
      const response = await axios.delete(`https://yeahdnipro-proj.cyclic.app/api/deleteProject/${projectToDelete}`);

      console.log('Проект успешно удален:', response.data);

      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Ошибка при удалении проекта:', error);
    }
  };

  const openDeleteModal = (projectId) => {
    setProjectToDelete(projectId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setProjectToDelete(null);
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://yeahdnipro-proj.cyclic.app/api/getProjects');
        setProjects(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке списка проектов:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <h2 className="card-editor">Управління проєктами</h2>
      <div className="container">
        <button type="button" onClick={() => setIsAddProjectModalOpen(true)} className='createProj-button'>
          Створити проєкт
        </button>
        <button type="button" onClick={handleUpdateProject} className='updProj-button'>
          Оновити проєкт
        </button>
        <button type="button" onClick={() => openDeleteModal(newProject.id)} className='deleleProj-button'>
          Видалити проєкт
        </button>
      </div>

      {isAddProjectModalOpen && (
        <div className="modal">
          <h3 className="modal-name">Додати проєкт</h3>
          <form>
            <label>Назва:</label>
            <input
              type="text"
              name="name"
              className="proj-input"
              placeholder="Назва вашого проєкту"
              value={newProject.name}
              onChange={(e) => handleInputChange(e)}
            />
            {errors.name && <p className="error">{errors.name}</p>}

            <label>Деталі:</label>
            <textarea
              type="text"
              name="description"
              className="proj-input-details"
              placeholder="Тут повинен бути ваш опис"
              value={newProject.description}
              onChange={(e) => handleInputChange(e)}
            />
            {errors.description && <p className="error">{errors.description}</p>}

            <label>Дедлайн:</label>
            <input
              type="text"
              name="deadline"
              className="proj-input"
              placeholder="1 січня 2001"
              value={newProject.deadline}
              onChange={(e) => handleInputChange(e)}
            />
            {errors.deadline && <p className="error">{errors.deadline}</p>}

            <label>Посилання на зображення:</label>
            <input
              type="text"
              name="image"
              className="proj-input"
              placeholder="https://example-of-link.png"
              value={newProject.image}
              onChange={(e) => handleInputChange(e)}
            />
            {errors.image && <p className="error">{errors.image}</p>}

            <button type="button" onClick={handleCreateProject} className="button-save">
              Зберегти проєкт
            </button>
            <button type="button" className="button-save" onClick={() => setIsAddProjectModalOpen(false)}>
              Закрити
            </button>
          </form>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="modal">
          <DeleteModal
            projects={projects}  
            projectName={projectToDelete ? projects.find((project) => project.id === projectToDelete).name : ''}
            onDelete={() => handleDeleteProject(projectToDelete)}
            onCancel={closeDeleteModal}
          />
        </div>
      )}

    </div>
  );
};

export default CardEditor;
