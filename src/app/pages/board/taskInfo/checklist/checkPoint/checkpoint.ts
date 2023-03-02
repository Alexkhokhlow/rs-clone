import { Socket } from 'socket.io-client';
import Server from '../../../../../server/server';
import Common from '../../../../../utils/common';

export default class Checkpoint {
  public point: HTMLElement;

  public checkbox: HTMLInputElement;

  public input: HTMLTextAreaElement;

  private buttons: HTMLElement;

  private edit: HTMLButtonElement;

  private delete: HTMLButtonElement;

  private id: string;

  private token: string;

  private server: Server;

  private socket: Socket;

  private path: string;

  constructor(id: string, socket: Socket, path: string) {
    this.id = id;
    this.socket = socket;
    this.path = path;
    this.point = Common.createDomNode('div', ['checkpoint']);
    this.checkbox = Common.createDomNodeInput('', '', ['checkpoint__checkbox'], 'checkbox');
    this.input = Common.createDomNode('textarea', ['checkpoint__text']) as HTMLTextAreaElement;
    this.input.disabled = true;
    this.buttons = Common.createDomNode('div', ['checkpoint__buttons']);
    this.edit = Common.createDomNodeButton(['checkpoint__edit']);
    this.delete = Common.createDomNodeButton(['checkpoint__delete']);
    this.server = new Server();
    this.token = localStorage.getItem('token') as string;

    this.append();
  }

  private append() {
    this.buttons.append(this.edit, this.delete);
    this.point.append(this.checkbox, this.input, this.buttons);
    this.delete.addEventListener('click', this.onDelete.bind(this));
    this.edit.addEventListener('click', this.onEdit.bind(this));
    this.checkbox.addEventListener('click', this.onCheck.bind(this));
  }

  private async onEdit() {
    if (!this.edit.classList.contains('checkpoint__save')) {
      this.edit.classList.add('checkpoint__save');
      this.input.disabled = false;
      this.input.classList.add('active');
    } else {
      await this.server.updateTodo(this.token, this.id, this.input.value, this.input.classList.contains('done'));
      this.edit.classList.remove('checkpoint__save');
      this.input.disabled = true;
      this.input.classList.remove('active');
      this.socket.emit('taskInfo', this.path);
    }
  }

  private async onDelete() {
    this.point.remove();
    await this.server.deleteTodo(this.token, this.id);
    this.socket.emit('taskInfo', this.path);
  }

  private async onCheck() {
    this.input.classList.toggle('done');
    await this.server.updateTodo(this.token, this.id, this.input.value, this.input.classList.contains('done'));
    this.socket.emit('taskInfo', this.path);
  }
}
