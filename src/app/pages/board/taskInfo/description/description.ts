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

  constructor() {
    this.data = '';
    this.id = '';
    this.description = Common.createDomNode('div', ['description']);
    this.title = Common.createDomNode('span', ['description__title'], 'Description');
    this.container = Common.createDomNode('div', ['description__container']);
    this.editButton = Common.createDomNodeButton(['description__edit'], 'Edit');
    this.detailButton = Common.createDomNodeButton(
      ['description__container__button'],
      'Add a more detailed description...'
    );
    this.form = new Form('Enter your description...', 'Save', this.onSave.bind(this), this.onClose.bind(this));
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
      this.detailButton.textContent = 'Add a more detailed description...';
    }
    if (this.token) {
      const data = await this.server.updateTaskInfo(this.token, this.id, this.data);
    }
    this.onClose();
  }

  init(description: string) {
    if (description) {
      this.data = description;
      this.detailButton.textContent = description;
    } else {
      this.data = '';
      this.detailButton.textContent = 'Add a more detailed description...';
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
