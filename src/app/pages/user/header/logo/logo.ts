export default class Logo{
  title: HTMLHeadingElement;
  logo: HTMLDivElement;
  icon: HTMLDivElement;

  constructor(){
    this.logo = document.createElement('div');
    this.logo.classList.add('logo');
    this.icon = document.createElement('div');
    this.icon.classList.add('logo__icon')
    this.title = document.createElement('h1');
    this.title.classList.add('logo__title');
    this.title.textContent = 'Trello-clone'
    this.logo.append(this.icon, this.title)
  }
}