import IResponseBoard, {
  TUser,
  IBoard,
  IResponseBoards,
  TTask,
  ITaskList,
  TComment,
  ICheckList,
  ITodo,
  TLabel,
  ITaskInfo,
} from '../../types/types';

export default class Server {
  private address: string;

  constructor() {
    this.address = 'http://localhost:3000/api';
  }

  async signUp(email: string, password: string, userName: string, color: string) {
    const response = await fetch(`${this.address}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName, email, password, color }),
    });

    await this.checkError(response);

    return response;
  }

  async updateUserInfo(token: string, userName: string, info: string) {
    const response = await fetch(`${this.address}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, userName, info }),
    });

    await this.checkError(response);

    const json = (await response.json()) as TUser;
    return json;
  }

  async getUserInfo(token: string) {
    const response = await fetch(`${this.address}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    await this.checkError(response);

    const json = (await response.json()) as TUser;
    return json;
  }

  async signGoogle() {
    window.location.replace('https://trello-clone-x3tl.onrender.com/auth/google');
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

    const json = (await response.json()) as { token: string };
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

    const json = (await response.json()) as boolean;
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

    const json = (await response.json()) as IBoard;
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

    const json = (await response.json()) as IResponseBoards;
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

    const json = (await response.json()) as IResponseBoard;
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

    const json = (await response.json()) as TUser[];
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

    const json = (await response.json()) as ITaskList;
    return json;
  }

  async updateTaskList(token: string, id: string, name: string) {
    const response = await fetch(`${this.address}/tasklist`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, id, name }),
    });

    await this.checkError(response);

    const json = (await response.json()) as ITaskList;
    return json;
  }

  async deleteTaskList(token: string, id: string, boardId: string) {
    const response = await fetch(`${this.address}/tasklist`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, id, boardId }),
    });

    await this.checkError(response);

    const json = (await response.json()) as ITaskList;
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

    const json = (await response.json()) as TTask;
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

    const json = (await response.json()) as TTask;
    return json;
  }

  async deleteTask(token: string, id: string) {
    const response = await fetch(`${this.address}/task`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, id }),
    });

    await this.checkError(response);

    const json = (await response.json()) as TTask;
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

    const json = (await response.json()) as ITaskInfo;
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

    const json = (await response.json()) as ITaskInfo;
    return json;
  }

  async updateTaskName(token: string, id: string, name: string) {
    const response = await fetch(`${this.address}/taskName`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, id, name }),
    });

    await this.checkError(response);

    const json = (await response.json()) as ITaskInfo;
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

    const json = (await response.json()) as { commentInfo: TComment };
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

    const json = (await response.json()) as TComment;
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

    const json = (await response.json()) as TComment;
    return json;
  }

  async createCheckList(token: string, id: string, name: string) {
    const response = await fetch(`${this.address}/checkList`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, id, name }),
    });

    await this.checkError(response);

    const json = (await response.json()) as { checkList: ICheckList };
    return json;
  }

  async updateCheckList(token: string, id: string, name: string) {
    const response = await fetch(`${this.address}/checkList`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, id, name }),
    });

    await this.checkError(response);

    const json = (await response.json()) as ICheckList;
    return json;
  }

  async deleteCheckList(token: string, id: string) {
    const response = await fetch(`${this.address}/checkList`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, id }),
    });

    await this.checkError(response);

    const json = (await response.json()) as ICheckList;
    return json;
  }

  async createTodo(token: string, id: string, text: string) {
    const response = await fetch(`${this.address}/todo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, id, text }),
    });

    await this.checkError(response);

    const json = (await response.json()) as { todo: ITodo };
    return json;
  }

  async updateTodo(token: string, id: string, text: string, checked: boolean) {
    const response = await fetch(`${this.address}/todo`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, id, text, checked }),
    });

    await this.checkError(response);

    const json = (await response.json()) as ITodo;
    return json;
  }

  async deleteTodo(token: string, id: string) {
    const response = await fetch(`${this.address}/todo`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, id }),
    });

    await this.checkError(response);

    const json = (await response.json()) as ITodo;
    return json;
  }

  async addLabel(token: string, taskId: string, labelId: string, dashboardId: string) {
    const response = await fetch(`${this.address}/label`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, labelId, taskId, dashboardId }),
    });

    await this.checkError(response);

    const json = (await response.json()) as TLabel;
    return json;
  }

  async getLabels(token: string, boardId: string) {
    const response = await fetch(`${this.address}/labels`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, boardId }),
    });

    await this.checkError(response);

    const json = (await response.json()) as TLabel[];
    return json;
  }

  async getLabel(token: string, taskId: string, dashboardId: string) {
    const response = await fetch(`${this.address}/label/${taskId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, dashboardId }),
    });

    await this.checkError(response);

    const json = (await response.json()) as TLabel;
    return json;
  }

  async updateLabel(token: string, id: string, text: string, dashboardId: string) {
    const response = await fetch(`${this.address}/label`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, id, text, dashboardId }),
    });

    await this.checkError(response);

    const json = (await response.json()) as TLabel;
    return json;
  }

  async deleteLabel(token: string, taskId: string, labelId: string, dashboardId: string) {
    console.log('delete');
    const response = await fetch(`${this.address}/label`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, labelId, taskId, dashboardId }),
    });

    await this.checkError(response);

    const json = (await response.json()) as TLabel;
    return json;
  }

  async checkError(response: Response) {
    if (!response.ok) {
      const message = `An error has occurred: ${await response.text()}`;
      throw new Error(message);
    }
  }
}
