export default class Home {
  home: HTMLElement;
  button: HTMLButtonElement;

  constructor() {
    this.home = document.createElement('section');
    this.home.classList.add('dsa');
    this.button = document.createElement('button');
    this.button.innerHTML = 'buuton';
    this.home.append(this.button);
    this.button.addEventListener('click', () => {
      window.location.href = 'login';
    });
  }
}
