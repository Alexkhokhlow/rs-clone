import eng from './eng';
import rus from './rus';
import { ILang } from './type';

export default class Lang {
  text: ILang;

  constructor() {
    const info = localStorage.getItem('lang');
    switch (info) {
      case 'rus': {
        this.text = rus;
        break;
      }
      case 'eng':
      default: {
        this.text = eng;
        break;
      }
    }
  }
}
