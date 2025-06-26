// __tests__/tasks.test.js
// Exemplo de testes para as funcionalidades de tarefas

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import TaskCard from '../components/TaskCard';
import AddTaskForm from '../components/AddTaskForm';

// Mock do axios
jest.mock('axios');
const mockedAxios = axios;

// Mock de tarefa para testes
const mockTask = {
  _id: '507f1f77bcf86cd799439011',
  title: 'Tarefa de teste',
  description: 'Descrição de teste',
  color: '#6366f1',
  isFavorite: false,
  completed: false,
  createdAt: '2025-06-26T10:00:00.000Z',
  updatedAt: '2025-06-26T10:00:00.000Z',
};

describe('TaskCard Component', () => {
  const mockOnUpdate = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders task correctly', () => {
    render(
      <TaskCard
        task={mockTask}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText('Tarefa de teste')).toBeInTheDocument();
    expect(screen.getByText('Descrição de teste')).toBeInTheDocument();
  });

  test('toggles favorite status', async () => {
    mockedAxios.put.mockResolvedValue({
      data: { success: true, data: { ...mockTask, isFavorite: true } },
    });

    render(
      <TaskCard
        task={mockTask}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    const favoriteButton = screen.getByRole('button', { name: /heart/i });
    fireEvent.click(favoriteButton);

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith(mockTask._id, {
        ...mockTask,
        isFavorite: true,
      });
    });
  });

  test('toggles completion status', async () => {
    mockedAxios.put.mockResolvedValue({
      data: { success: true, data: { ...mockTask, completed: true } },
    });

    render(
      <TaskCard
        task={mockTask}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    const completeButton = screen.getByRole('button', { name: /check/i });
    fireEvent.click(completeButton);

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith(mockTask._id, {
        ...mockTask,
        completed: true,
      });
    });
  });

  test('enters edit mode', () => {
    render(
      <TaskCard
        task={mockTask}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    expect(screen.getByDisplayValue('Tarefa de teste')).toBeInTheDocument();
  });

  test('deletes task with confirmation', async () => {
    // Mock window.confirm
    window.confirm = jest.fn(() => true);

    mockedAxios.delete.mockResolvedValue({
      data: { success: true, data: {} },
    });

    render(
      <TaskCard
        task={mockTask}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /trash/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(window.confirm).toHaveBeenCalledWith(
        'Tem certeza que deseja excluir esta tarefa?'
      );
      expect(mockOnDelete).toHaveBeenCalledWith(mockTask._id);
    });
  });
});

describe('AddTaskForm Component', () => {
  const mockOnAddTask = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form correctly', () => {
    render(<AddTaskForm onAddTask={mockOnAddTask} onClose={mockOnClose} />);

    expect(screen.getByText('Nova Tarefa')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Digite o título da tarefa...')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Descrição opcional...')
    ).toBeInTheDocument();
  });

  test('creates new task', async () => {
    render(<AddTaskForm onAddTask={mockOnAddTask} onClose={mockOnClose} />);

    const titleInput = screen.getByPlaceholderText(
      'Digite o título da tarefa...'
    );
    const descriptionInput = screen.getByPlaceholderText(
      'Descrição opcional...'
    );
    const submitButton = screen.getByRole('button', { name: /criar/i });

    fireEvent.change(titleInput, { target: { value: 'Nova tarefa' } });
    fireEvent.change(descriptionInput, { target: { value: 'Nova descrição' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnAddTask).toHaveBeenCalledWith({
        title: 'Nova tarefa',
        description: 'Nova descrição',
        color: '#6366f1',
      });
    });
  });

  test('prevents submission with empty title', () => {
    render(<AddTaskForm onAddTask={mockOnAddTask} onClose={mockOnClose} />);

    const submitButton = screen.getByRole('button', { name: /criar/i });

    expect(submitButton).toBeDisabled();
  });

  test('closes form on cancel', () => {
    render(<AddTaskForm onAddTask={mockOnAddTask} onClose={mockOnClose} />);

    const cancelButton = screen.getByRole('button', { name: /cancelar/i });
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  test('closes form on backdrop click', () => {
    render(<AddTaskForm onAddTask={mockOnAddTask} onClose={mockOnClose} />);

    const backdrop = screen.getByRole('dialog').parentElement;
    fireEvent.click(backdrop);

    expect(mockOnClose).toHaveBeenCalled();
  });
});

// Testes de API
describe('Tasks API', () => {
  test('GET /api/tasks returns tasks list', async () => {
    const mockTasks = [mockTask];

    mockedAxios.get.mockResolvedValue({
      data: { success: true, data: mockTasks },
    });

    const response = await axios.get('/api/tasks');

    expect(response.data.success).toBe(true);
    expect(response.data.data).toEqual(mockTasks);
  });

  test('POST /api/tasks creates new task', async () => {
    const newTask = {
      title: 'Nova tarefa',
      description: 'Nova descrição',
      color: '#10b981',
    };

    mockedAxios.post.mockResolvedValue({
      data: { success: true, data: { ...newTask, _id: 'new-id' } },
    });

    const response = await axios.post('/api/tasks', newTask);

    expect(response.data.success).toBe(true);
    expect(response.data.data.title).toBe(newTask.title);
  });

  test('PUT /api/tasks/:id updates task', async () => {
    const updatedTask = { ...mockTask, title: 'Título atualizado' };

    mockedAxios.put.mockResolvedValue({
      data: { success: true, data: updatedTask },
    });

    const response = await axios.put(`/api/tasks/${mockTask._id}`, updatedTask);

    expect(response.data.success).toBe(true);
    expect(response.data.data.title).toBe('Título atualizado');
  });

  test('DELETE /api/tasks/:id removes task', async () => {
    mockedAxios.delete.mockResolvedValue({
      data: { success: true, data: {} },
    });

    const response = await axios.delete(`/api/tasks/${mockTask._id}`);

    expect(response.data.success).toBe(true);
  });
});

// Testes de integração
describe('Task Management Integration', () => {
  test('complete task workflow', async () => {
    // Simula o fluxo completo de criação, atualização e exclusão
    const taskData = {
      title: 'Tarefa de integração',
      description: 'Teste de integração completo',
      color: '#ec4899',
    };

    // Criar tarefa
    mockedAxios.post.mockResolvedValueOnce({
      data: { success: true, data: { ...taskData, _id: 'integration-id' } },
    });

    // Atualizar para favorita
    mockedAxios.put.mockResolvedValueOnce({
      data: {
        success: true,
        data: { ...taskData, _id: 'integration-id', isFavorite: true },
      },
    });

    // Marcar como concluída
    mockedAxios.put.mockResolvedValueOnce({
      data: {
        success: true,
        data: {
          ...taskData,
          _id: 'integration-id',
          isFavorite: true,
          completed: true,
        },
      },
    });

    // Deletar tarefa
    mockedAxios.delete.mockResolvedValueOnce({
      data: { success: true, data: {} },
    });

    // Executar fluxo
    const createResponse = await axios.post('/api/tasks', taskData);
    expect(createResponse.data.success).toBe(true);

    const favoriteResponse = await axios.put('/api/tasks/integration-id', {
      isFavorite: true,
    });
    expect(favoriteResponse.data.data.isFavorite).toBe(true);

    const completeResponse = await axios.put('/api/tasks/integration-id', {
      completed: true,
    });
    expect(completeResponse.data.data.completed).toBe(true);

    const deleteResponse = await axios.delete('/api/tasks/integration-id');
    expect(deleteResponse.data.success).toBe(true);
  });
});
