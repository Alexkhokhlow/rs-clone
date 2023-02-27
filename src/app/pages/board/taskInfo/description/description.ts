import { Socket } from 'socket.io-client';
import Lang from '../../../../common/lang/lang';
import Server from '../../../../server/server';
import Common from '../../../../utils/common';
import Form from '../../common/form';

export default class Description {
  description: HTMLElement;

  title: HTMLElement;

  detailButton: HTMLButtonElement;

  form: Form;

  container: HTMLElement;

  editButton: HTMLButtonElement;

  data: string;

  server: Server;

  token: string | null;

  id: string;

  private socket: Socket;

  public path: string;

  text: Lang;
  constructor(socket: Socket) {
    this.text = new Lang();
    this.socket = socket;
    this.data = '';
    this.id = '';
    this.path = '';
    this.description = Common.createDomNode('div', ['description']);
    this.title = Common.createDomNode('span', ['description__title', 'title__info'], this.text.text.description);
    this.container = Common.createDomNode('div', ['description__container']);
    this.editButton = Common.createDomNodeButton(['description__edit'], this.text.text.edit);
    this.detailButton = Common.createDomNodeButton(['description__container__button'], this.text.text.detailed);
    this.form = new Form(
      this.text.text.enterDescription,
      this.text.text.save,
      this.onSave.bind(this),
      this.onClose.bind(this)
    );
    this.description.append(this.title, this.editButton, this.container);
    this.container.append(this.detailButton);

    this.detailButton.addEventListener('click', this.onActivate.bind(this));
    this.editButton.addEventListener('click', this.onEdit.bind(this));
    this.server = new Server();
    this.token = localStorage.getItem('token');
  }

  onActivate() {
    const value = this.data;
    if (value) {
      this.form.initData(value);
    }
    this.container.replaceChild(this.form.form, this.detailButton);
  }

  async onSave() {
    if (this.form.data) {
      this.detailButton.textContent = this.form.data;
      this.data = this.form.data;
    } else {
      this.data = '';
      this.detailButton.textContent = this.text.text.detailed;
    }
    if (this.token) {
      await this.server.updateTaskInfo(this.token, this.id, this.data);
      this.socket.emit('taskInfo', this.path);
    }
    this.onClose();
  }

  init(description: string) {
    if (description) {
      this.data = description;
      this.detailButton.textContent = description;
    } else {
      this.data = '';
      this.detailButton.textContent = this.text.text.detailed;
    }
  }

  onEdit() {
    this.onActivate();
    this.editButton.classList.remove('active');
  }

  onClose() {
    this.data ? this.editButton.classList.add('active') : this.editButton.classList.remove('active');
    this.container.replaceChild(this.detailButton, this.form.form);
  }
}
