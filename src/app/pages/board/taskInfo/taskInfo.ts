import Common from '../../../utils/common';
import CommentsForm from './comments/commentsForm';
import Description from './description/description';
import Sidebar from './siderbar/sidebar';

const closeIcon = require('../../../../assets/board/close.svg') as string;

export default class TaskInfo {
  public taskInfo: HTMLElement;

  private title: HTMLElement;

  private info: HTMLElement;

  private description: Description;

  private comment: CommentsForm;

  private close: HTMLImageElement;

  sidebar: Sidebar;
  header: HTMLElement;
  main: HTMLElement;
  container: HTMLElement;

  constructor() {
    this.taskInfo = Common.createDomNode('div', ['task-info']);
    this.title = Common.createDomNode('h2', ['task-info__title'], 'make new Page');
    this.info = Common.createDomNode('h4', ['task-info__info'], 'from list create');
    this.close = Common.createDomNodeImg(['task-info__close'], closeIcon);
    this.description = new Description();
    this.comment = new CommentsForm();
    this.sidebar = new Sidebar();
    this.header = Common.createDomNode('header', ['task-info__header']);
    this.main = Common.createDomNode('main', ['task-info__main']);
    this.container = Common.createDOMNode('div', ['task-info__container']);
    this.container.append(this.main, this.sidebar.sidebar);
    this.header.append(this.title, this.close, this.info);
    this.main.append(this.description.description, this.comment.commentsForm);
    this.taskInfo.append(this.header, this.container);
    this.close.addEventListener('click', this.onClose.bind(this));
  }

  init(title: string, list: string) {
    this.title.textContent = title;
    this.info.textContent = `from ${list}`;
  }

  onClose() {
    this.taskInfo.classList.remove('active');
  }
}
