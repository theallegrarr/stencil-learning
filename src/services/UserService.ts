import { User } from '../utils/types';

class UserService {
  private users: User[] = [];

  getUsers(): Promise<User[]> {
    return fetch('http://localhost:3300/users')
      .then(response => response.json())
      .then(data => {
        this.users = data;
        return this.users;
      });
  }

  createUser(userData, cb): Promise<void | User[]> {
    return fetch('http://localhost:3300/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(async response => {
        if (!response.ok) {
          const data = await response.json();
          throw new Error(`HTTP error! status: ${data.message}`);
        }
        return response.json();
      })
      .then(data => {
        this.users = data;
        cb(this.users);
      })
      .catch(error => {
        cb(this.users, error.message);
      });
  }

  updateUser(id, userData, cb): Promise<void | User[]> {
    return fetch(`http://localhost:3300/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(async response => {
        if (!response.ok) {
          const data = await response.json();
          throw new Error(`HTTP error! status: ${data.message}`);
        }
        return response.json();
      })
      .then(data => {
        this.users = data;
        cb(this.users);
      })
      .catch(error => {
        cb(this.users, error.message);
      });
  }

  deleteUser(id, cb): Promise<void | User[]> {
    return fetch(`http://localhost:3300/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async response => {
        if (!response.ok) {
          const data = await response.json();
          throw new Error(`HTTP error! status: ${data.message}`);
        }
        return response.json();
      })
      .then(data => {
        this.users = data;
        cb(this.users);
      })
      .catch(error => {
        cb(this.users, error.message);
      });
  }
}

export const userService = new UserService();
