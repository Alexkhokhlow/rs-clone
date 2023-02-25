import { Socket } from 'socket.io-client';
import { ITodo } from '../../../../../types/types';
import Server from '../../../../server/server';
import Common from '../../../../utils/common';
import AddItemButton from '../../common/addItemButton';
import Checkpoint from './checkPoint/checkpoint';

export default class Checklist {
  public checklist: HTMLElement;

  private checklistHeader: HTMLElement;

  public checklistTitle: HTMLElement;

  private checklistDelete: HTMLButtonElement;

  private addItemButton: AddItemButton;

  public checkpointsWrapper: HTMLElement;

  public checkpoints: Checkpoint[];

  private server: Server;

  private token: string;

  private id: string;

  private path: string;

  private socket: Socket;

  constructor(id: string, title: string, path:string, socket:Socket) {
    this.socket = socket;
    this.path = path;
    this.id = id;
    this.checklist = Common.createDomNode('div', ['checklist__info']);
    this.checklistHeader = Common.createDomNode('div', ['checklist__header__wrapper']);
    this.checklistTitle = Common.createDomNode('h4', ['checklist__title__info', 'title__info'], title);
    this.checklistDelete = Common.createDomNodeButton(['checklist__delete'], 'Delete');
    this.checkpointsWrapper = Common.createDomNode('div', ['checkpoints__wrapper']);
    this.addItemButton = new AddItemButton('Add an item', 'Add an item', 'Add', this.onSave.bind(this));
    this.checkpoints = [];
    this.token = localStorage.getItem('token')!;
    this.server = new Server();

    this.append();
  }

  private append() {
    this.checklistHeader.append(this.checklistTitle, this.checklistDelete);
    this.checklist.append(this.checklistHeader, this.checkpointsWrapper, this.addItemButton.container);
    this.bindEvents();
  }

  private bindEvents() {
    this.checklistDelete.addEventListener('click', this.removeChecklist.bind(this));
  }

  private async removeChecklist() {
    this.checklist.remove();
    await this.server.deleteCheckList(this.token, this.id);
    this.socket.emit('taskInfo', this.path);
  }

  private async onSave() {
    if (this.addItemButton.form.input.value.trim()) {
      const text = this.addItemButton.form.input.value;
      const response: {todo : ITodo} = await this.server.createTodo(this.token, this.id, text);
      const checkpoint = new Checkpoint(response.todo.id, this.socket, this.path);
      checkpoint.input.value = text;
      this.checkpointsWrapper.append(checkpoint.point);
      this.addItemButton.onClose();
      this.checkpoints.push(checkpoint);
      this.socket.emit('taskInfo', this.path);
    }
  }
}
