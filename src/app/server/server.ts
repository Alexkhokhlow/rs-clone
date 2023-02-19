export default class Server {
  private address: string;

  constructor() {
    this.address = 'https://trello-clone-x3tl.onrender.com/api';
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

    return response;
  }

  // async signGoogle() {
  //   window.location.replace('http://localhost:3000/auth/google');
  //   // const response = await fetch(`http://localhost:8081/auth/google`, {
  //   //   method: 'GET',
  //   // });
  //   // console.log(response);

  //   // await this.checkError(response);

  //   // const json = await response.json();
  //   // return json;
  // }

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

  async createTask(token: string, id: string, name: string, index: string) {
    const response = await fetch(`${this.address}/task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, id, name, index }),
    });

    await this.checkError(response);

    const json = await response.json();
    return json;
  }

  async updateTask(token: string, id: string, taskListId: string, name: string, index: string) {
    const response = await fetch(`${this.address}/task`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, id, taskListId, name, index }),
    });

    await this.checkError(response);

    const json = await response.json();
    return json;
  }

  async getTaskInfo(token: string, id: string) {
    const response = await fetch(`${this.address}/taskInfo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, id }),
    });

    await this.checkError(response);

    const json = await response.json();
    return json;
  }

  async updateTaskInfo(token: string, id: string, description: string) {
    const response = await fetch(`${this.address}/taskInfo`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, id, description }),
    });

    await this.checkError(response);

    const json = await response.json();
    return json;
  }

  async createComment(token: string, id: string, comment: string) {
    const response = await fetch(`${this.address}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, id, comment }),
    });

    await this.checkError(response);

    const json = await response.json();
    return json;
  }

  async updateComment(token: string, userId: string, id: string, comment: string) {
    const response = await fetch(`${this.address}/comment`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, userId, id, comment }),
    });

    await this.checkError(response);

    const json = await response.json();
    return json;
  }

  async deleteComment(token: string, userId: string, id: string) {
    const response = await fetch(`${this.address}/comment`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, userId, id }),
    });

    await this.checkError(response);

    const json = await response.json();
    return json;
  }

  async addLabel(token: string, taskId: string, labelId: string) {
    const response = await fetch(`${this.address}/label`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token, labelId, taskId}),
    });

    await this.checkError(response);

    const json = await response.json();
    return json;
  }

  async updateLabel(token: string, id: string, title: string) {
    const response = await fetch(`${this.address}/label`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token, id, title}),
    });

    await this.checkError(response);

    const json = await response.json();
    return json;
  }

  async deleteLabel(token: string, id: string) {
    const response = await fetch(`${this.address}/label`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, id }),
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
