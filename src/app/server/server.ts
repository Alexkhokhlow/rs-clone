export default class Server {
  private address: string;

  constructor() {
    this.address = 'http://localhost:8081/api';
  }

  async signUp(email: string, password: string, userName: string) {
    const response = await fetch(`${this.address}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName, email, password }),
    });

    await this.checkError(response);

    const json = await response.json();
    return json;
  }

  async login(email: string, password: string) {
    const response = await fetch(`${this.address}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    await this.checkError(response);

    const json = await response.json();
    return json;
  }

  async checkEmail(email: string) {
    const response = await fetch(`${this.address}/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    await this.checkError(response);

    const json = await response.json();
    return json;
  }

  async createDashboard(token: string, name: string, color: string, access: boolean) {
    const response = await fetch(`${this.address}/dashboard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, name, color, public: access }),
    });

    await this.checkError(response);

    const json = await response.json();
    return json;
  }

  async getDashboards(token: string) {
    const response = await fetch(`${this.address}/dashboards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    await this.checkError(response);

    const json = await response.json();
    return json;
  }

  async getDashboard(token: string, path: string) {
    const response = await fetch(`${this.address}/dashboard/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    await this.checkError(response);

    const json = await response.json();
    return json;
  }

  async addUserToDashboard(token: string, email: string, pathName: string) {
    const response = await fetch(`${this.address}/users_dashboard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, email, pathName }),
    });

    await this.checkError(response);

    const json = await response.json();
    return json;
  }

  async createTaskList(token: string, name: string, pathName: string) {
    const response = await fetch(`${this.address}/tasklist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, name, pathName }),
    });

    await this.checkError(response);

    const json = await response.json();
    return json;
  }

  async createTask(token: string, id: string, name: string) {
    const response = await fetch(`${this.address}/task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, id, name }),
    });

    await this.checkError(response);

    const json = await response.json();
    return json;
  }

  async checkError(response: Response) {
    if (!response.ok) {
      const message = `An error has occurred: ${await response.text()}`;
      throw new Error(message);
    }
  }
}
