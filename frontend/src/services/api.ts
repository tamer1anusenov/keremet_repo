import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем перехватчик запросов для добавления токена аутентификации
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Добавляем перехватчик ответов для обработки истечения срока действия токена
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Эндпоинты аутентификации
export const auth = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    patronymic?: string;
    phone: string;
  }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Эндпоинты врачей
export const doctors = {
  getAll: async () => {
    const response = await api.get('/doctors');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/doctors/${id}`);
    return response.data;
  },

  getBySpecialization: async (specialization: string) => {
    const response = await api.get(`/doctors/specialization/${specialization}`);
    return response.data;
  },

  getAvailableSlots: async (doctorId: string, date: string) => {
    const response = await api.get(`/doctors/${doctorId}/slots`, {
      params: { date },
    });
    return response.data;
  },
};

// Эндпоинты записи на прием
export const appointments = {
  create: async (appointmentData: {
    doctorId: string;
    date: string;
    time: string;
  }) => {
    const response = await api.post('/appointments', appointmentData);
    return response.data;
  },

  getMyAppointments: async () => {
    const response = await api.get('/appointments/my');
    return response.data;
  },

  cancel: async (appointmentId: string) => {
    const response = await api.post(`/appointments/${appointmentId}/cancel`);
    return response.data;
  },
};

// Эндпоинты результатов анализов
export const testResults = {
  getMyResults: async () => {
    const response = await api.get('/test-results/my');
    return response.data;
  },

  getResultById: async (resultId: string) => {
    const response = await api.get(`/test-results/${resultId}`);
    return response.data;
  },
};

// Эндпоинты профиля
export const profile = {
  get: async () => {
    const response = await api.get('/profile');
    return response.data;
  },

  update: async (profileData: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  }) => {
    const response = await api.put('/profile', profileData);
    return response.data;
  },

  changePassword: async (passwordData: {
    currentPassword: string;
    newPassword: string;
  }) => {
    const response = await api.put('/profile/password', passwordData);
    return response.data;
  },
};

export default api; 