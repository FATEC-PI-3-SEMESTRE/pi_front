import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any | null;
  isEditMode: boolean;
}

export const ModalUser = ({ isOpen, onClose, user, isEditMode }: ModalProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: false,
  });

  useEffect(() => {
    if (isOpen && isEditMode && user) {
      setFormData({
        email: user.email || '',
        password: '',
        role: user.access || false,
      });
    } else if (!isEditMode) {
      setFormData({
        email: '',
        password: '',
        role: false,
      });
    }
  }, [isOpen, user, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode && user) {
        await api.patch(`/user/${user.id}`, {
          email: formData.email,
          access: formData.role,
        });
      } else {
        await api.post('/auth/register', {
          email: formData.email,
          password: formData.password,
          access: formData.role,
        });

      }
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    }
  };

  const toggleActivation = async () => {
    if (!user) return;
    try {
      await api.put(`/user/access/${user.id}`);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Erro ao alterar status do usuário:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {isEditMode ? 'Editar Usuário' : 'Criar Novo Usuário'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              disabled={isEditMode}
            />
          </div>

          {!isEditMode && (
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role ? 'admin' : 'user'}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value === 'admin' })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="user">USER</option>
              <option value="admin">ADMIN</option>
            </select>
          </div>

          <div className="mt-4 flex justify-end">
            {isEditMode && (
              <button
                type="button"
                onClick={toggleActivation}
                className={`mr-2 ${
                  user.deleted ? 'bg-green-600' : 'bg-red-600'
                } text-white px-4 py-2 rounded-md`}
              >
                {user.deleted ? 'Reativar' : 'Desativar'}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              {isEditMode ? 'Atualizar' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
