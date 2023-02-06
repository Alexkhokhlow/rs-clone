export default class DropDownButton {
  button: HTMLElement;

  constructor(text: string) {
    this.button = document.createElement('button');
    this.button.classList.add('dropdown-button');
    this.button.textContent = `${text} ˅`;
  }
}
