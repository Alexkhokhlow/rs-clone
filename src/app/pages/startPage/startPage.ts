import Common from '../../utils/common';
import Action from './sections/action';
import StartPageHeader from './sections/header';
import More from './sections/more';
import Powerhouse from './sections/powerhouse';
import SignupSection from './sections/signupSection';
import Using from './sections/using';
import Start from './sections/start';

export default class StartPage {
  public container: HTMLElement;

  public header: StartPageHeader;

  public signupSection: SignupSection;

  public powerhouse: Powerhouse;

  public action: Action;

  private using: Using;

  private more: More;

  public start: Start;

  constructor() {
    this.container = Common.createDomNode('div', ['page', 'page__start']);
    this.header = new StartPageHeader();
    this.signupSection = new SignupSection();
    this.powerhouse = new Powerhouse();
    this.action = new Action();
    this.using = new Using();
    this.more = new More();
    this.start = new Start();
  }

  public append() {
    this.container.append(
      this.header.append(),
      this.signupSection.append(),
      this.powerhouse.append(),
      this.action.append(),
      this.more.append(),
      this.using.append(),
      this.start.append()
    );

    return this.container;
  }
}
