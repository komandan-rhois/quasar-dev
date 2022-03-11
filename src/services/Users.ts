import { User } from 'src/services/models';
import axios, { AxiosInstance } from 'axios';

const baseConfig = { baseURL: 'https://gorest.co.in/public/v2' };

export class Users {
  private repository: AxiosInstance;

  constructor({ httpRepository = axios.create(baseConfig) }) {
    this.repository = httpRepository;
  }

  async getAll(): Promise<User[]> {
    const { data } = await this.repository.get<User[]>('users');

    return data;
  }

  async get(id: string): Promise<User> {
    const { data } = await this.repository.get<User>(`users/${id}`);

    return data;
  }

  async create(user: User): Promise<User> {
    const headers = { Authorization: 'Bearer 9690fb8196780608aa119e9cadbf3901b8d6679995f2667a259a1f07fb7617cd' };
    const { data } = await this.repository.post<User>('users', {
      user, headers,
    });

    return data;
  }

  async update(id: string, user: User): Promise<User> {
    const headers = { Authorization: 'Bearer 9690fb8196780608aa119e9cadbf3901b8d6679995f2667a259a1f07fb7617cd' };
    const { data } = await this.repository.put<User>(`users/${id}`, {
      user, headers,
    });
    return data;
  }

  async delete(id: string): Promise<Record<string, unknown>> {
    const { data } = await this.repository.delete<Record<string, unknown>>(`users/${id}`);
    return data;
  }

  async getPost(id: string): Promise<User> {
    const headers = { Authorization: 'Bearer 9690fb8196780608aa119e9cadbf3901b8d6679995f2667a259a1f07fb7617cd' };
    const { data } = await this.repository.get<User>(`users/${id}/posts`, {
      headers,
    });
    return data;
  }
}
