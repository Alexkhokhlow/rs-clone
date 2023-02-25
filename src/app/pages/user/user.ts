import { TUser } from '../../../types/types';
import Server from '../../server/server';
import Common from '../../utils/common';
import StartPageFooter from '../startPage/sections/footer';
import Header from '../workspace/header/header';

export default class UserPage {
  header: HTMLElement;

  main: HTMLElement;

  footer: HTMLElement;

  userInfo: HTMLElement;

  userImg: HTMLElement;

  userDescription: HTMLElement;

  name: HTMLElement;

  mail: HTMLElement;

  title: HTMLElement;

  form: HTMLElement;

  formNameContainer: HTMLElement;

  inputNameLabel: HTMLElement;

  inputName: HTMLInputElement;

  formBioContainer: HTMLElement;

  bioLabel: HTMLElement;

  bioInput: HTMLTextAreaElement;

  btnSubmit: HTMLButtonElement;

  server: Server;

  token: string;

  constructor() {
    this.main = Common.createDomNode('section', ['user__page']);
    this.header = new Header().append();
    this.userInfo = Common.createDomNode('div', ['user__info']);
    this.userImg = Common.createDomNode('div', ['user__image']);
    this.userDescription = Common.createDomNode('div', ['user__description']);
    this.token = localStorage.getItem('token')!;
    this.server = new Server();

    // получать по токену информацию (name, mail);
    this.name = Common.createDomNode('p', ['user__name', 'subtitle'], 'Name');
    this.mail = Common.createDomNode('p', ['user__mail', 'subtitle'], 'mail@mail.ru');

    this.title = Common.createDomNode('h1', ['title', 'profile__title'], 'Profile');
    this.form = Common.createDomNode('form', ['user__form']);
    this.formNameContainer = Common.createDomNode('div', ['form__container']);
    this.inputNameLabel = Common.createDomNodeLabel('name', 'Username', ['label']);
    // получать по токену name и вставить в placeholder к this.inputName и получить bio
    this.inputName = Common.createDOMNodeInput('name', ['input__name'], 'text');
    this.formBioContainer = Common.createDomNode('div', ['form__container']);
    this.bioLabel = Common.createDomNodeLabel('bio', 'About Me', ['label']);
    this.bioInput = Common.createDomNode('textarea', ['textarea']) as HTMLTextAreaElement;
    this.btnSubmit = Common.createDomNodeButton(['btn', 'btn-submit'], 'Save', 'submit');

    this.footer = new StartPageFooter().append();
  }

  async init() {
    const data: TUser = await this.server.getUserInfo(this.token);
    this.name.textContent = data.name;
    this.mail.textContent = data.email;
    this.inputName.value = data.name;
    this.bioInput.value = data.info;
  }

  public async render() {
    this.main.append(this.header, this.userInfo, this.title, this.form, this.footer);
    this.userInfo.append(this.userImg, this.userDescription);
    this.userDescription.append(this.name, this.mail);

    this.form.append(this.formNameContainer, this.formBioContainer, this.btnSubmit);
    this.formNameContainer.append(this.inputNameLabel, this.inputName);
    this.formBioContainer.append(this.bioLabel, this.bioInput);
    this.bioInput.setAttribute('id', 'bio');
    await this.init();

    this.addHandlers();
    return this.main;
  }

  private addHandlers() {
    this.btnSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      this.server.updateUserInfo(this.token, this.inputName.value, this.bioInput.value);
      this.name.textContent = this.inputName.value;

      // TODO: залить на сервер изменения и изменить имя на странице (перезагрузить страницу?)
    });
  }
}
