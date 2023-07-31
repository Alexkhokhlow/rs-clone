import { TUser } from '../../../types/types';
import Lang from '../../common/lang/lang';
import Server from '../../server/server';
import Common from '../../utils/common';
import StartPageFooter from '../startPage/sections/footer';
import CreatingBoard from '../workspace/createBoard/createBoard';
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

  description: HTMLElement;

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

  token: string | null;

  creatingBoard: CreatingBoard;

  errorMessage: HTMLElement;

  constructor(creatingBoard: CreatingBoard) {
    this.creatingBoard = creatingBoard;
    const text = new Lang();
    this.main = Common.createDomNode('section', ['user__page']);
    this.header = new Header().append(this.creatingBoard);
    this.userInfo = Common.createDomNode('div', ['user__info']);
    this.userImg = Common.createDomNode('div', ['user__image']);
    this.userDescription = Common.createDomNode('div', ['user__description']);
    this.token = localStorage.getItem('token');
    this.server = new Server();

    this.name = Common.createDomNode('p', ['user__name', 'subtitle']);
    this.mail = Common.createDomNode('p', ['user__mail', 'subtitle']);
    this.description = Common.createDomNode('p', ['user__bio', 'subtitle']);

    this.title = Common.createDomNode('h1', ['title', 'profile__title'], text.text.profile);
    this.form = Common.createDomNode('form', ['user__form']);
    this.formNameContainer = Common.createDomNode('div', ['form__container']);
    this.inputNameLabel = Common.createDomNodeLabel('name', text.text.userName, ['label']);
    this.inputName = Common.createDOMNodeInput('name', ['input__name'], 'text');
    this.formBioContainer = Common.createDomNode('div', ['form__container']);
    this.bioLabel = Common.createDomNodeLabel('bio', text.text.aboutMe, ['label']);
    this.bioInput = Common.createDomNode('textarea', ['textarea']) as HTMLTextAreaElement;
    this.btnSubmit = Common.createDomNodeButton(['btn', 'btn-submit'], text.text.save, 'submit');
    this.errorMessage = Common.createDomNode('span', ['form__error', 'invisible'], text.text.nameError);

    this.footer = new StartPageFooter().append();
  }

  async init() {
    if (this.token) {
      const data: TUser = await this.server.getUserInfo(this.token);
      this.name.textContent = data.name;
      this.mail.textContent = data.email;
      this.inputName.value = data.name;
      this.bioInput.value = data.info;
      this.description.textContent = data.info;
    }
  }

  public async render() {
    this.main.append(
      this.header,
      this.userInfo,
      this.description,
      this.title,
      this.form,
      this.creatingBoard.append(),
      this.footer
    );
    this.userInfo.append(this.userImg, this.userDescription);
    this.userDescription.append(this.name, this.mail);

    this.form.append(this.formNameContainer, this.errorMessage, this.formBioContainer, this.btnSubmit);
    this.formNameContainer.append(this.inputNameLabel, this.inputName);
    this.formBioContainer.append(this.bioLabel, this.bioInput);
    this.bioInput.setAttribute('id', 'bio');
    await this.init();

    this.addHandlers();
    return this.main;
  }

  private addHandlers() {
    this.btnSubmit.addEventListener('click', async (e) => {
      e.preventDefault();
      this.changeBtnActivity(false, this.btnSubmit);

      const regExp = /^[a-zA-Z0-9\s]{1,}$/;
      if (regExp.test(this.inputName.value) && this.token) {
        this.name.textContent = this.inputName.value;
        this.description.textContent = this.bioInput.value;
        await this.server.updateUserInfo(this.token, this.inputName.value, this.bioInput.value);
      } else {
        this.errorMessage.classList.remove('invisible');
      }
    });

    this.inputName.addEventListener('input', () => {
      this.errorMessage.classList.add('invisible');
      this.changeBtnActivity(true, this.btnSubmit);
    });

    this.bioInput.addEventListener('input', () => {
      this.changeBtnActivity(true, this.btnSubmit);
    });
  }

  private changeBtnActivity(condition: boolean, btn: HTMLElement) {
    if (condition) {
      btn.removeAttribute('disabled');
    } else {
      btn.setAttribute('disabled', 'disabled');
    }
  }
}
