import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CardEditor = () => {
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    deadline: '',
    image: '',
  });

  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [projectToDelete, setProjectToDelete] = useState(null);
  const [projects, setProjects] = useState([]);
  const [editedProject, setEditedProject] = useState(null);

  const [errors, setErrors] = useState({
    name: '',
    description: '',
    deadline: '',
    image: '',
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    if (isEditModalOpen) {
      setEditedProject((prevProject) => ({
        ...prevProject,
        [name]: value,
      }));
    } else {
      setNewProject((prevProject) => ({
        ...prevProject,
        [name]: value,
      }));
    }
  };
// Validation
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    const projectToValidate = isEditModalOpen ? editedProject : newProject;
  
    if ((projectToValidate.name.length > 25) || projectToValidate.name.length <= 0) {
      newErrors.name = 'Назва повинна бути не довшою за 25 символів або пустою';
      isValid = false;
    } else {
      newErrors.name = ''; 
    }

    if ((projectToValidate.description.length > 100) || projectToValidate.description.length <= 0) {
      newErrors.description = 'Опис не повинен бути довшим за 100 символів або пустим';
      isValid = false;
    } else {
      newErrors.description = ''; 
    }

    if (projectToValidate.deadline.length <= 0) {
      newErrors.deadline = 'Дедлайн не може бути пустим';
      isValid = false;
    } else {
      newErrors.deadline = '';
    }
  
    if (projectToValidate.image.length <= 0) {
      newErrors.image = 'Посилання на зображення не може бути пустим';
      isValid = false;
    } else {
      newErrors.image = '';
    }
    setErrors(newErrors);
    return isValid;
  };
  // Fetch requests
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
    try {
      if (validateForm() && editedProject) {
        console.log('Отправляемый объект:', editedProject);
        const response = await axios.put(`https://yeahdnipro-proj.cyclic.app/api/updProject/${editedProject._id}`, editedProject);
        console.log('Проект успешно обновлен:', response.data);
        setIsEditModalOpen(false);
      } else {
        console.error('Форма содержит ошибки или не выбран проект для обновления');
      }
    } catch (error) {
      console.error('Ошибка при обновлении проекта:', error);
    }
  };
  const handleDeleteProject = async () => {
    try {
      if (projectToDelete) {
        console.log(projectToDelete);
        const response = await axios.delete(`https://yeahdnipro-proj.cyclic.app/api/deleteProject/${projectToDelete}`);
        console.log('Проект успешно удален:', response.data);
        setIsDeleteModalOpen(false);
      } else {
        console.error('Не выбран проект для удаления');
      }
    } catch (error) {
      console.error('Ошибка при удалении проекта:', error);
    }
  };
  // Edit Modal
  const openEditModal = (projectId) => {
    const projectToEdit = projects.find((project) => project._id === projectId);
    setEditedProject(projectToEdit);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setEditedProject(null);
    setIsEditModalOpen(false);
  };
  // Delete Modal
  const openDeleteModal = (projectId) => {
    setProjectToDelete(projectId);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = (projectId) => {
    setProjectToDelete(projectId);
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://yeahdnipro-proj.cyclic.app/api/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке списка проектов:', error);
      }
    };

    fetchProjects();
  }, []);

  const [selectedProjectId, setSelectedProjectId] = useState('');
  const handleEditProjectSelection = (projectId) => {
    setSelectedProjectId(projectId);
    openEditModal(projectId);
  };

  return (
    // CRUD
    <div>
      <h2 className="card-editor">Управління проєктами</h2>
      <div className="container-crud">
        <button type="button" onClick={() => setIsAddProjectModalOpen(true)} className='createProj-button'> Створити проєкт </button>
        <button type="button" onClick={() => handleEditProjectSelection(selectedProjectId)} className='updProj-button'> Редагувати проєкт </button>
        <button type="button" onClick={() => openDeleteModal(newProject.id)} className='deleleProj-button'> Видалити проєкт </button>
      </div>
      {/* Add Project */}
      {isAddProjectModalOpen && (
        <div className="modal">
          <h3 className="modal-name">Додати проєкт</h3>
          <form>
            <label>Назва:</label>
            <input type="text" name="name" className="proj-input" placeholder="Назва вашого проєкту" value={newProject.name} onChange={(e) => handleInputChange(e)} />
            {errors.name && <p className="error">{errors.name}</p>}
            <label>Деталі:</label>
            <textarea type="text" name="description" className="proj-input-details" placeholder="Тут повинен бути ваш опис" value={newProject.description} onChange={(e) => handleInputChange(e)} />
            {errors.description && <p className="error">{errors.description}</p>}
            <label>Дедлайн:</label>
            <input type="text" name="deadline" className="proj-input" placeholder="1 січня 2001" value={newProject.deadline} onChange={(e) => handleInputChange(e)} />
            {errors.deadline && <p className="error">{errors.deadline}</p>}
            <label>Посилання на зображення:</label>
            <input type="text" name="image" className="proj-input" placeholder="https://example-of-link.png" value={newProject.image} onChange={(e) => handleInputChange(e)} />
            {errors.image && <p className="error">{errors.image}</p>}
            <button type="button" onClick={handleCreateProject} className="button-save"> Додати </button>
            <button type="button" className="button-save" onClick={() => setIsAddProjectModalOpen(false)}> Закрити </button>
          </form>
        </div>
      )}
      {/* Edit modal */}
      {isEditModalOpen && (
        <div className="modal">
          <h3 className="modal-name">Редагувати проєкт</h3>
          <form>
            <label>Виберіть проєкт для редагування:</label>
            <div className='select-container'>
              <select onChange={(e) => handleEditProjectSelection(e.target.value)} value={selectedProjectId}>
                <option value="">----------</option>
                {projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
            <label>Назва:</label>
            <input type="text" name="name" className="proj-input" placeholder="Назва вашого проєкту" value={editedProject ? editedProject.name : ''} onChange={handleInputChange} />
            {errors.name && <p className="error">{errors.name}</p>}
            <label>Деталі:</label>
            <textarea type="text" name="description" className="proj-input-details" placeholder="Тут повинен бути ваш опис" value={editedProject ? editedProject.description : ''} onChange={handleInputChange} />
            {errors.description && <p className="error">{errors.description}</p>}
            <label>Дедлайн:</label>
            <input type="text" name="deadline" className="proj-input" placeholder="1 січня 2001" value={editedProject ? editedProject.deadline : ''} onChange={handleInputChange} />
            {errors.deadline && <p className="error">{errors.deadline}</p>}
            <label>Посилання на зображення:</label>
            <input type="text" name="image" className="proj-input" placeholder="https://example-of-link.png" value={editedProject ? editedProject.image : ''} onChange={handleInputChange} />
            {errors.image && <p className="error">{errors.image}</p>}
            <button type="button" onClick={handleUpdateProject} className="button-save"> Зберегти зміни </button>
            <button type="button" className="button-save" onClick={() => setIsEditModalOpen(false)}> Закрити </button>
          </form>
        </div>
      )}
      {/* Delete modal */}
      {isDeleteModalOpen && (
        <div className="modal">
          <h3 className='modal-name'>Видалити проєкт</h3>
          <p>Виберіть проєкт для видалення:</p>
          <div className='select-container'>
            <select onChange={(e) => setProjectToDelete(e.target.value)} value={projectToDelete}>
              <option value="">----------</option>
              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.name} - {project._id}
                </option>
              ))}
            </select>
          </div>
          <div className="delete-modal-buttons">
            <button type="button" onClick={handleDeleteProject} className='button-save'> Видалити </button>
            <button type="button" onClick={closeDeleteModal} className="button-save"> Закрити </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default CardEditor;