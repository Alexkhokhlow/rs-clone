import Common from '../../../utils/common';
import CommentsForm from './comments/commentsForm';
import Description from './description/description';
import Labels from './labels/labels';
import Sidebar from './siderbar/sidebar';

const closeIcon = require('../../../../assets/board/close.svg') as string;

export default class TaskInfo {
  public taskInfo: HTMLElement;

  private title: HTMLElement;

  private info: HTMLElement;

  private description: Description;

  private comment: CommentsForm;

  private close: HTMLImageElement;

  private sidebar: Sidebar;

  private header: HTMLElement;

  private main: HTMLElement;

  private container: HTMLElement;

  private labels: Labels;

  constructor() {
    this.taskInfo = Common.createDomNode('div', ['task-info']);
    this.title = Common.createDomNode('h2', ['task-info__title'], 'make new Page');
    this.title.contentEditable = 'true';
    this.info = Common.createDomNode('h4', ['task-info__info'], 'from list create');
    this.close = Common.createDomNodeImg(['task-info__close'], closeIcon);
    this.labels = new Labels();
    this.description = new Description();
    this.comment = new CommentsForm();
    this.sidebar = new Sidebar();
    this.header = Common.createDomNode('header', ['task-info__header']);
    this.main = Common.createDomNode('main', ['task-info__main']);
    this.container = Common.createDOMNode('div', ['task-info__container']);
    this.append();
    this.close.addEventListener('click', this.onClose.bind(this));
    this.sidebar.modalLabels.labelsContainer.addEventListener('click', this.addLabels.bind(this));
    this.labels.addButton.addEventListener('click', () => {
      this.sidebar.onOpenModule(this.sidebar.modalLabels.module.module);
    })
  }

  private append() {
    this.container.append(this.main, this.sidebar.sidebar);
    this.header.append(this.title, this.close, this.info);
    this.main.append(this.labels.labelsWrapper, this.description.description, this.comment.commentsForm);
    this.taskInfo.append(this.header, this.container);
  }

  public init(title: string) {
    this.title.textContent = title;
  }

  private onClose() {
    this.taskInfo.classList.remove('active');
  }

  private addLabels(event: Event) {
    const target = event.target as HTMLElement;
    const targetColor = target.closest('.label__color') as HTMLInputElement;
    const targetCheck = target.closest('.label__checkbox') as HTMLInputElement;
    if (target) {
      if(targetColor) {
        if (!(targetColor.previousElementSibling as HTMLInputElement).checked) {
          (targetColor.previousElementSibling as HTMLInputElement).checked = true;
          this.showLabels();
          this.labels.labels.insertBefore(targetColor.cloneNode(true), this.labels.addButton);
        } else {
          (targetColor.previousElementSibling as HTMLInputElement).checked = false;
          const element = (Array.from(this.labels.labels.children) as HTMLElement[]).find(child => child.title === targetColor.title) as HTMLInputElement;
          element.remove();
          this.hideLabels();
        }
      }

      if (targetCheck) {
        if (targetCheck.checked) {
          this.showLabels();
          this.labels.labels.insertBefore((targetCheck.nextElementSibling as HTMLInputElement).cloneNode(true), this.labels.addButton);
        } else {
          const element = (Array.from(this.labels.labels.children) as HTMLElement[]).find(child => child.title === (targetCheck.nextElementSibling as HTMLInputElement).title) as HTMLInputElement;
          element.remove();
          this.hideLabels();
        }
      }
    }
  }

  private showLabels() {
    if (this.labels.labelsWrapper.classList.contains('hidden')) {
      this.labels.labelsWrapper.classList.remove('hidden');
    }
  }

  private hideLabels() {
    if (this.labels.labels.children.length === 1) {
      this.labels.labelsWrapper.classList.add('hidden');
    }
  }
}
