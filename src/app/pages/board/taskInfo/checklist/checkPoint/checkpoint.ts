import Common from '../../../../../utils/common';

export default class Checkpoint {
  public point: HTMLElement;

  private checkbox: HTMLInputElement;

  public input: HTMLTextAreaElement;

  private buttons: HTMLElement;

  private edit: HTMLButtonElement;

  private delete: HTMLButtonElement;

  constructor() {
    this.point = Common.createDomNode('div', ['checkpoint']);
    this.checkbox = Common.createDomNodeInput('', '', ['checkpoint__checkbox'], 'checkbox');
    this.input = Common.createDomNode('textarea', ['checkpoint__text']) as HTMLTextAreaElement;
    this.input.disabled = true;
    this.buttons = Common.createDomNode('div', ['checkpoint__buttons']);
    this.edit = Common.createDomNodeButton(['checkpoint__edit']);
    this.delete = Common.createDomNodeButton(['checkpoint__delete']);

    this.append();
  }

  private append() {
    this.buttons.append(this.edit, this.delete);
    this.point.append(this.checkbox, this.input, this.buttons);
    this.delete.addEventListener('click', this.onDelete.bind(this));
    this.edit.addEventListener('click', this.onEdit.bind(this));
    this.checkbox.addEventListener('click', this.onCheck.bind(this));
  }

  private onEdit() {
    if (!this.edit.classList.contains('checkpoint__save')) {
      this.edit.classList.add('checkpoint__save');
      this.input.disabled = false;
      this.input.classList.add('active');
    } else {
      this.edit.classList.remove('checkpoint__save');
      this.input.disabled = true;
      this.input.classList.remove('active');
    }
  }

  private onDelete() {
    this.point.remove();
  }

  private onCheck() {
    this.input.classList.toggle('done');
  }
}
