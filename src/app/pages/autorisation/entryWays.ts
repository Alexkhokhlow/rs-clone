import Lang from '../../common/lang/lang';
import Common from '../../utils/common';

export default class EntryWays {
  elem: string;

  name: string;

  constructor(elem: string) {
    this.elem = elem.toLowerCase();
    this.name = elem === 'msft' ? 'Microsoft' : elem;
  }

  render() {
    const text = new Lang();
    const content = `<span id="${this.elem}__icon" class="icon"></span> <span class="label" data-analytics-button="loginWith${this.elem}Button">${text.text.continueWith} ${this.name}</span>`;
    const entryWay = Common.createDOMNode('a', [`btn_${this.elem}`, 'btn_way'], content);
    entryWay.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLElement;
      if (target.classList.contains('btn_google')) {
        window.location.replace('https://trello-clone-kz9j.onrender.com/api/google');
      }
    });
    return entryWay;
  }
}
