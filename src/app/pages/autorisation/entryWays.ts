import Common from '../../utils/common';

export default class EntryWays {
  elem: string;

  name: string;

  constructor(elem: string) {
    this.elem = elem.toLowerCase();
    this.name = elem === 'msft' ? 'Microsoft' : elem;
  }

  render() {
    const content = `<span id="${this.elem}__icon" class="icon"></span> <span class="label" data-analytics-button="loginWith${this.elem}Button">Continue with ${this.name}</span>`;
    const entryWay = Common.createDOMNode('a', [`btn_${this.elem}`, 'btn_way'], content);
    entryWay.addEventListener('click', (e) => {
      e.preventDefault();
      // TODO: добавить авторизацию
    });
    return entryWay;
  }
}
