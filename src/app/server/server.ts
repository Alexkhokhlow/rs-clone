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

  async checkError(response: Response) {
    if (!response.ok) {
      const message = `An error has occurred: ${await response.text()}`;
      throw new Error(message);
    }
  }
}
