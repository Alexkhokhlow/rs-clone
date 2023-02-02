import Common from '../../utils/common';

export default class LoginForm {
  form: HTMLElement;

  constructor() {
    this.form = Common.createDomNode('form', ['form, login__form'], 'form');
  }
}
