import eng from './eng';
import rus from './rus';
import { ILang } from './type';


export default class Lang {
  text: ILang;

  constructor() {
    const info = localStorage.getItem('lang');
    switch (info) {
      case 'eng': {
        this.text = eng;
        break;
      }
      case 'rus':
      default: {
        this.text = rus;
        break;
      }
    }
  }
}
