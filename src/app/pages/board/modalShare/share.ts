import Server from '../../../server/server';
import Common from '../../../utils/common';

export default class Share {
  public overlay: HTMLElement;

  private modal: HTMLElement;

  private header: HTMLElement;

  private title: HTMLElement;

  private closeButton: HTMLButtonElement;

  private form: HTMLElement;

  private input: HTMLInputElement;

  public submit: HTMLButtonElement;

  private linkWrapper: HTMLElement;

  private linkIcon: HTMLElement;

  private linkText: HTMLElement;

  private text: HTMLElement;

  private link: HTMLElement;

  private copied: HTMLElement;

  private server: Server;

  private token: string;

  public path: string;

  constructor() {
    this.overlay = Common.createDomNode('div', ['overlay__share']);
    this.modal = Common.createDomNode('div', ['share__modal']);
    this.header = Common.createDomNode('header', ['share__header']);
    this.title = Common.createDomNode('h3', ['share__title'], 'Share board');
    this.closeButton = Common.createDomNodeButton(['close__button']);
    this.form = Common.createDomNode('form', ['share__form']);
    this.input = Common.createDomNodeInput('Email address', '', ['share__input'], 'email');
    this.submit = Common.createDomNodeButton(['share__submit'], 'Share');
    this.linkWrapper = Common.createDomNode('div', ['share__link__wrapper']);
    this.linkIcon = Common.createDomNode('div', ['share__link__icon']);
    this.linkText = Common.createDomNode('div', ['share__link__text']);
    this.text = Common.createDomNode('h4', ['share__text'], 'Anyone with the board share link');
    this.link = Common.createDomNode('span', ['share__link'], 'Copy link');
    this.copied = Common.createDomNode('div', ['share__copied'], 'Link copied');
    this.server = new Server();
    this.token = localStorage.getItem('token') as string;
    this.path = '';
  }

  public buildModal() {
    this.header.append(this.title, this.closeButton);
    this.form.append(this.input, this.submit);
    this.linkText.append(this.text, this.link);
    this.linkWrapper.append(this.linkIcon, this.linkText);
    this.modal.append(this.header, this.form, this.linkWrapper);
    this.overlay.append(this.modal);
    this.openModal();
    this.bindEvents();
  }

  private bindEvents() {
    this.link.addEventListener('click', this.copyLink.bind(this));
    this.submit.addEventListener('click', this.sendToEmail.bind(this));
    this.closeButton.addEventListener('click', this.closeModal.bind(this));
    this.overlay.addEventListener('click', this.closeModal.bind(this));
  }

  private openModal() {
    document.body.append(this.overlay);
  }

  private async copyLink() {
    const link = `${window.location.href}`;
    await navigator.clipboard.writeText(link);
    this.header.insertBefore(this.copied, this.closeButton);
    setTimeout(() => {
      this.copied.remove();
    }, 2000);
  }

  private async sendToEmail(event: Event) {
    event.preventDefault();
    const email = this.input.value;
    if (email) {
      try {
        await this.server.addUserToDashboard(this.token, email, this.path);
        this.overlay.remove();
      } catch (e) {
        console.log(e);
      }
    }
  }

  private closeModal(event: Event) {
    const classes = (event.target as HTMLElement).classList;
    if (classes.contains('overlay__share') || classes.contains('close__button')) {
      this.overlay.remove();
    }
  }
}
