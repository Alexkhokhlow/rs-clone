import { TComments, TLabels } from '../../../../types/types';
import Server from '../../../server/server';
import Common from '../../../utils/common';
import Checklist from './checklist/checklist';
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

  private server: Server;

  private labels: Labels;

  private token: string | null;

  private main: HTMLElement;

  private container: HTMLElement;

  private taskId: string;

  constructor() {
    this.taskId = '';
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
    this.server = new Server();
    this.token = localStorage.getItem('token');
    this.append();
  }

  private append() {
    this.container.append(this.main, this.sidebar.sidebar);
    this.header.append(this.title, this.close, this.info);
    this.main.append(this.labels.labelsWrapper, this.description.description, this.comment.commentsForm);
    this.taskInfo.append(this.header, this.container);
    this.bindEvents();
  }

  private bindEvents() {
    this.close.addEventListener('click', this.onClose.bind(this));
    this.sidebar.modalLabels.labelsContainer.addEventListener('click', this.addLabels.bind(this));
    this.labels.addButton.addEventListener('click', () => {
      this.sidebar.onOpenModule(this.sidebar.modalLabels.module.module);
    });
    this.sidebar.modalCheckList.add.addEventListener('click', this.createCheckList.bind(this));
  }

  public async init(id: string) {
    if (this.token) {
      const { taskInfo, comments, user, labels } = await this.server.getTaskInfo(this.token, id);
      this.taskId = taskInfo.taskId;
      this.comment.init(user);
      this.labels.labels.innerHTML = '';
      this.labels.labels.append(this.labels.addButton);
      this.hideLabels();
      this.sidebar.modalLabels.labelsContainer.innerHTML = '';
      this.sidebar.modalLabels.createLabels();

      (labels as TLabels[]).forEach((data: { color: string; id: string; text: string; title: string }) => {
        Array.from(this.sidebar.modalLabels.labelsContainer.children).forEach((item) => {
          if ((item.children[1] as HTMLInputElement).title === data.title) {
            (item.children[0] as HTMLInputElement).checked = true;
            (item.children[1] as HTMLInputElement).value = data.text;
          }
        });
        this.showLabels();
        const labelColor = Common.createDomNodeInput('', '', ['label__color']);
        labelColor.readOnly = true;
        labelColor.style.background = data.color;
        labelColor.title = data.title;
        labelColor.value = data.text;
        this.labels.labels.insertBefore(labelColor, this.labels.addButton);
      });
      (comments as TComments[]).forEach((data: { id: string; text: string; userName: string }) => {
        this.comment.createComment(data.text, data.userName, data.id);
      });
      this.title.textContent = taskInfo.name;
      this.info.textContent = `from ${taskInfo.tasklist}`;
      this.description.id = id;
      this.comment.id = id;
      if (taskInfo.description) {
        this.description.init(taskInfo.description);
      } else {
        this.description.init('');
      }
      this.taskInfo.classList.add('active');
    }
  }

  private onClose() {
    this.taskInfo.classList.remove('active');
  }

  private createCheckList(event: Event) {
    event.preventDefault();
    const checklist = new Checklist();
    this.main.insertBefore(checklist.checklist, this.comment.commentsForm);
    checklist.checklistTitle.textContent = this.sidebar.modalCheckList.inputTitle.value;
    this.sidebar.modalCheckList.module.onClose();
    this.sidebar.modalCheckList.inputTitle.value = 'Checklist';
  }

  private async addLabels(event: Event) {
    const target = event.target as HTMLElement;
    const targetColor = target.closest('.label__color') as HTMLInputElement;
    const targetCheck = target.closest('.label__checkbox') as HTMLInputElement;
    if (target) {
      if (targetColor) {
        if (!(targetColor.previousElementSibling as HTMLInputElement).checked) {
          (targetColor.previousElementSibling as HTMLInputElement).checked = true;
          this.showLabels();
          if (this.token) {
            this.server.addLabel(this.token, this.taskId, targetColor.getAttribute('id')!);

            const targetColorCopy = targetColor.cloneNode(true) as HTMLElement;
            this.labels.labels.insertBefore(targetColorCopy, this.labels.addButton);
          }
        } else {
          (targetColor.previousElementSibling as HTMLInputElement).checked = false;
          const element = (Array.from(this.labels.labels.children) as HTMLElement[]).find((child) => {
            if (child.title === targetColor.title) {
              if (this.token) {
                this.server.deleteLabel(this.token, child.getAttribute('id')!);
              }
              return true;
            }
            return false;
          }) as HTMLInputElement;

          element.remove();
          this.hideLabels();
        }
      }

      if (targetCheck) {
        const elementColor = targetCheck.nextElementSibling as HTMLInputElement;
        if (targetCheck.checked) {
          this.showLabels();
          if (this.token) {
            this.server.addLabel(this.token, this.taskId, elementColor.getAttribute('id')!);

            const targetColorCopy = elementColor.cloneNode(true) as HTMLElement;
            this.labels.labels.insertBefore(targetColorCopy, this.labels.addButton);
          }
        } else {
          const element = (Array.from(this.labels.labels.children) as HTMLElement[]).find((child) => {
            if (child.title === elementColor.title) {
              if (this.token) {
                this.server.deleteLabel(this.token, child.getAttribute('id')!);
              }
              return true;
            }
            return false;
          }) as HTMLInputElement;
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
