import DropDownButton from './navigation/dropdownButton/dropdownButton';
import Logo from './logo/logo';

export default class Header {
  header: HTMLElement;
  logo: Logo;

  constructor() {
    this.header = document.createElement('header');
    this.header.classList.add('header');

    this.logo = new Logo();
  }
}
