import Common from '../../utils/common';

const closeIconlink = require('../../../assets/board/close.svg') as string;

export default class AddItemButton {
  button: HTMLButtonElement;

  container: HTMLElement;

  onClick: (event: Event) => void;

  data: string;

  inputValue: string;

  buttonText: string;

  constructor(title: string, inputValue: string, buttonText: string, onClick: (event: Event) => void) {
    this.onClick = onClick;
    this.inputValue = inputValue;
    this.buttonText = buttonText;
    this.data = '';
    this.container = Common.createDOMNode('div', ['add-item']);
    this.button = Common.createDomNodeButton(['add-item__button'], title);
    this.container.append(this.button);
    this.button.addEventListener('click', this.activate.bind(this));
  }

  activate() {
    const form = Common.createDOMNode('div', ['add-item__form']);
    const input = Common.createDOMNodeInput('1', ['add-item__form__input'], 'text', this.inputValue);
    console.log(input);
    const container = Common.createDOMNode('div', ['add-item__form__container']);
    const button = Common.createDomNodeButton(['add-item__form__container__button'], this.buttonText);
    const closeIcon = Common.createDomNodeImg(['add-item__form__container__close'], closeIconlink);

    container.append(button, closeIcon);
    form.append(input, container);

    closeIcon.addEventListener('click', this.close.bind(this));
    this.container.replaceChild(form, this.button);
    button.addEventListener('click', this.onClick);
    input.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLInputElement;
      this.data = target.value;
    });
  }

  close() {
    this.container.replaceChild(this.button, this.container.children[0]);
    this.data = '';
  }
}
