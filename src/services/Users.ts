import { UserInterface } from 'src/interface/UserInt';
import { PostInterface } from 'src/interface/PostInt';

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const baseConfig = { baseURL: 'https://gorest.co.in/public/v2' };

export class Users {
  private repository: AxiosInstance;

  constructor({ httpRepository = axios.create(baseConfig) }) {
    this.repository = httpRepository;
  }

  async getAll(): Promise<UserInterface[]> {
    const { data } = await this.repository.get<UserInterface[]>('users');

    return data;
  }

  async get(id: string): Promise<UserInterface> {
    const { data } = await this.repository.get<UserInterface>(`users/${id}`);

    return data;
  }

  async create(user: UserInterface): Promise<UserInterface> {
    const headers = { Authorization: 'Bearer 9690fb8196780608aa119e9cadbf3901b8d6679995f2667a259a1f07fb7617cd' };
    const { data } = await this.repository.post<UserInterface>('users', {
      user, headers,
    });

    return data;
  }

  async update(id: string, user: UserInterface): Promise<UserInterface> {
    // eslint-disable-next-line max-len
    const hdr = { Authorization: 'Bearer 9690fb8196780608aa119e9cadbf3901b8d6679995f2667a259a1f07fb7617cd' };
    const config: AxiosRequestConfig = {
      headers: hdr,
    };
    const { data } = await this.repository.patch<UserInterface>(`users/${id}`, user, config);
    return data;
  }

  async delete(id: string): Promise<Record<string, unknown>> {
    const { data } = await this.repository.delete<Record<string, unknown>>(`users/${id}`);
    return data;
  }

  async getPost(id: string): Promise<PostInterface> {
    const hdr = { Authorization: 'Bearer 9690fb8196780608aa119e9cadbf3901b8d6679995f2667a259a1f07fb7617cd' };
    const config: AxiosRequestConfig = {
      headers: hdr,
    };
    const { data } = await this.repository.get<PostInterface>(`users/${id}/posts`, config);
    return data;
  }
}
