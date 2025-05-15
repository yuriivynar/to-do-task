import React, { useState } from 'react';
import { useAuthStore } from '../store/AuthStore';

interface RegisterFormProps {
  onShowLogin: () => void;
}

const Register: React.FC<RegisterFormProps> = ({ onShowLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const register = useAuthStore((state) => state.register);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Register error');
    }
  };

  return (
    <div id="register-form" className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
      <h2 className="text-xl font-bold mb-4 text-center">Реєстрація</h2>
      {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
      <div className="mb-4">
        <label htmlFor="reg-name" className="block text-gray-700 text-sm font-medium mb-2">
          Ім'я
        </label>
        <input
          type="text"
          id="reg-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ваше ім'я"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="reg-email" className="block text-gray-700 text-sm font-medium mb-2">
          Електронна пошта
        </label>
        <input
          type="email"
          id="reg-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="your@email.com"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="reg-password" className="block text-gray-700 text-sm font-medium mb-2">
          Пароль
        </label>
        <input
          type="password"
          id="reg-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Створіть пароль"
          required
        />
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Зареєструватися
      </button>
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Вже маєте обліковий запис?{' '}
          <button
            onClick={onShowLogin}
            className="text-blue-600 hover:underline focus:outline-none"
          >
            Увійти
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;