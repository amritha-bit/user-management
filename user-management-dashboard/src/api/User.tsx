import axios from 'axios';
import type { User } from '../types/Index';

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
});

export const fetchUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<User[]>('/users');
  return response.data;
};

export const fetchUserById = async (id: number): Promise<User> => {
  const response = await apiClient.get<User>(`/users/${id}`);
  return response.data;
};