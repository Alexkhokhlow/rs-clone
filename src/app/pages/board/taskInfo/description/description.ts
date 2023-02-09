import Common from '../../../../utils/common';
import Form from '../../form';

export default class Description {
  description: HTMLElement;

  title: HTMLElement;

  detailButton: HTMLButtonElement;

  form: Form;

  container: HTMLElement;

  editButton: HTMLButtonElement;

  constructor() {
    this.description = Common.createDomNode('div', ['description']);
    this.title = Common.createDomNode('h4', ['description__title'], 'Description');
    this.container = Common.createDomNode('div', ['description__container']);
    this.editButton = Common.createDomNodeButton(['description__edit']);
    this.detailButton = Common.createDomNodeButton(
      ['description__container__button'],
      'Add a more detailed description...'
    );
    this.form = new Form('Enter your description...', 'Save', this.onSave.bind(this), this.onClose.bind(this));
    this.description.append(this.title, this.container);
    this.container.append(this.detailButton);

    this.detailButton.addEventListener('click', this.onActivate.bind(this));
  }

  onActivate() {
    this.container.replaceChild(this.form.form, this.detailButton);
  }

  onSave() {}

  onEdit() {}

  onClose() {
    this.container.replaceChild(this.detailButton, this.form.form);
  }
}
