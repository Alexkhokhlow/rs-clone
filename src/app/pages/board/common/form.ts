import Common from '../../../utils/common';

export default class Form {
  form: HTMLElement;

  input: HTMLInputElement;

  container: HTMLElement;

  button: HTMLButtonElement;

  closeIcon: HTMLButtonElement;

  data: string;

  constructor(inputValue: string, buttonText: string, onClick: (event: Event) => void, close: (event: Event) => void) {
    this.data = '';
    this.form = Common.createDOMNode('div', ['add-item__form']);
    this.input = Common.createDOMNodeInput('1', ['add-item__form__input'], 'text', inputValue);
    this.container = Common.createDOMNode('div', ['add-item__form__container']);
    this.button = Common.createDomNodeButton(['add-item__form__container__button'], buttonText);
    this.closeIcon = Common.createDomNodeButton(['add-item__form__container__close'], 'Cancel');

    this.container.append(this.button, this.closeIcon);
    this.form.append(this.input, this.container);

    this.closeIcon.addEventListener('click', close);
    this.button.addEventListener('click', onClick);
    this.input.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLInputElement;
      this.data = target.value;
    });
  }

  initData(data: string) {
    this.data = data;
    this.input.value = data;
  }
}
