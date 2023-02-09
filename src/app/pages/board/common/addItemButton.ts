import Common from '../../../utils/common';
import Form from './form';

export default class AddItemButton {
  button: HTMLButtonElement;

  container: HTMLElement;

  form: Form;

  constructor(formText: string, inputValue: string, buttonText: string, onSave: (event: Event) => void) {
    this.container = Common.createDOMNode('div', ['add-item']);
    this.button = Common.createDomNodeButton(['add-item__button'], formText);
    this.container.append(this.button);
    this.button.addEventListener('click', this.onActivate.bind(this));
    this.form = new Form(inputValue, buttonText, onSave, this.onClose.bind(this));
  }

  onActivate() {
    this.container.replaceChild(this.form.form, this.button);
  }

  onClose() {
    this.container.replaceChild(this.button, this.container.children[0]);
    this.form.data = '';
  }
}
