import { Socket } from 'socket.io-client';
import { ITodo } from '../../../../../types/types';
import Lang from '../../../../common/lang/lang';
import Server from '../../../../server/server';
import Common from '../../../../utils/common';
import AddItemButton from '../../common/addItemButton';
import Checkpoint from './checkPoint/checkpoint';

export default class Checklist {
  public checklist: HTMLElement;

  private checklistHeader: HTMLElement;

  public checklistTitle: HTMLElement;

  private titleIcon: HTMLElement;

  private checklistTitleInput: HTMLInputElement;

  private checklistDelete: HTMLButtonElement;

  private addItemButton: AddItemButton;

  public checkpointsWrapper: HTMLElement;

  public checkpoints: Checkpoint[];

  private server: Server;

  private token: string;

  private id: string;

  private path: string;

  private socket: Socket;

  constructor(id: string, title: string, path: string, socket: Socket) {
    const text = new Lang();
    this.socket = socket;
    this.path = path;
    this.id = id;
    this.checklist = Common.createDomNode('div', ['checklist__info']);
    this.checklistHeader = Common.createDomNode('div', ['checklist__header__wrapper']);
    this.titleIcon = Common.createDomNode('div', ['checklist__icon']);
    this.checklistTitle = Common.createDomNode('h4', ['checklist__title__info', 'title__info'], title);
    this.checklistTitleInput = Common.createDomNodeInput("Enter checklist's title", '', ['checklist__title__input']);
    this.checklistDelete = Common.createDomNodeButton(['checklist__delete'], text.text.delete);
    this.checkpointsWrapper = Common.createDomNode('div', ['checkpoints__wrapper']);
    this.addItemButton = new AddItemButton(
      text.text.checklist.addItem,
      text.text.checklist.addItem,
      text.text.checklist.add,
      this.onSave.bind(this)
    );
    this.checkpoints = [];
    this.token = localStorage.getItem('token') as string;
    this.server = new Server();

    this.append();
  }

  private append() {
    this.checklistHeader.append(this.titleIcon, this.checklistTitle, this.checklistDelete);
    this.checklist.append(this.checklistHeader, this.checkpointsWrapper, this.addItemButton.container);
    this.bindEvents();
  }

  private bindEvents() {
    this.checklistDelete.addEventListener('click', this.removeChecklist.bind(this));
    this.checklistTitle.addEventListener('click', () => {
      Common.clickTitle(this.checklistHeader, this.checklistTitle, this.checklistTitleInput);
    });
    this.checklistTitleInput.addEventListener('focusout', async () => {
      Common.changeTitle(this.checklistHeader, this.checklistTitle, this.checklistTitleInput);
      await this.server.updateCheckList(this.token, this.id, this.checklistTitleInput.value);
      this.socket.emit('label', this.path);
    });
  }

  private async removeChecklist() {
    this.checklist.remove();
    await this.server.deleteCheckList(this.token, this.id);
    this.socket.emit('taskInfo', this.path);
  }

  private async onSave() {
    if (this.addItemButton.form.input.value.trim()) {
      const text = this.addItemButton.form.input.value;
      const response = (await this.server.createTodo(this.token, this.id, text)) as { todo: ITodo };
      const checkpoint = new Checkpoint(response.todo.id, this.socket, this.path);
      checkpoint.input.value = text;
      this.checkpointsWrapper.append(checkpoint.point);
      this.addItemButton.onClose();
      this.checkpoints.push(checkpoint);
      this.socket.emit('taskInfo', this.path);
    }
  }
}
