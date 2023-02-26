import { Socket } from 'socket.io-client';
import { ICheckList, TLabel } from '../../../../types/types';
import Server from '../../../server/server';
import Common from '../../../utils/common';
import Checklist from './checklist/checklist';
import Checkpoint from './checklist/checkPoint/checkpoint';
import CommentsForm from './comments/commentsForm';
import Description from './description/description';
import Labels from './labels/labels';
import Sidebar from './siderbar/sidebar';

const closeIcon = require('../../../../assets/board/close.svg') as string;

export default class TaskInfo {
  public taskInfo: HTMLElement;

  private title: HTMLElement;

  private info: HTMLElement;

  public description: Description;

  public comment: CommentsForm;

  private close: HTMLImageElement;

  public sidebar: Sidebar;

  private header: HTMLElement;

  private server: Server;

  private labels: Labels;

  private token: string;

  private main: HTMLElement;

  public container: HTMLElement;

  private taskId: string;

  private dashboardId: string;

  private id: string;

  private checkListContainer: HTMLElement;

  private socket: Socket;

  public path: string;

  private titleInput: HTMLInputElement;

  constructor(socket: Socket) {
    this.id = '';
    this.taskId = '';
    this.socket = socket;
    this.dashboardId = '';
    this.path = '';
    this.taskInfo = Common.createDomNode('div', ['task-info']);
    this.title = Common.createDomNode('h2', ['task-info__title'], 'make new Page');
    this.titleInput = Common.createDomNodeInput('Enter title', '', ['task-info__title__input']);
    this.info = Common.createDomNode('h4', ['task-info__info'], 'from list create');
    this.close = Common.createDomNodeImg(['task-info__close'], closeIcon);
    this.labels = new Labels();
    this.description = new Description(socket);
    this.comment = new CommentsForm(socket);
    this.sidebar = new Sidebar(socket);
    this.header = Common.createDomNode('header', ['task-info__header']);
    this.main = Common.createDomNode('main', ['task-info__main']);
    this.container = Common.createDOMNode('div', ['task-info__container']);
    this.checkListContainer = Common.createDOMNode('div', ['task-info__checkList']);

    this.server = new Server();
    this.token = localStorage.getItem('token')!;
    this.append();
    this.socket.on('label', (data) => {
      this.getTaskInfo();
    });
    this.socket.on('taskInfo', (data) => {
      this.getTaskInfo();
    });
  }

  private append() {
    this.container.append(this.main, this.sidebar.sidebar);
    this.header.append(this.title, this.close, this.info);
    this.main.append(this.description.description, this.checkListContainer, this.comment.commentsForm);
    this.taskInfo.append(this.header, this.labels.labelsWrapper, this.container);
    this.bindEvents();
  }

  private bindEvents() {
    this.close.addEventListener('click', this.onClose.bind(this));
    this.sidebar.modalLabels.labelsContainer.addEventListener('click', this.addLabels.bind(this));
    this.labels.labels.addEventListener('click', () => {
      this.sidebar.onOpenModule(this.sidebar.modalLabels.module.module);
    });
    this.sidebar.modalCheckList.add.addEventListener('click', this.createCheckList.bind(this));
    this.header.addEventListener('click', () => {
      Common.clickTitle(this.header, this.title, this.titleInput);
    });
    this.titleInput.addEventListener('focusout', () => {
      Common.changeTitle(this.header, this.title, this.titleInput);
      this.server.updateTaskName(this.token, this.id, this.titleInput.value)
    });
  }

  private async getTaskInfo() {
    if (this.id) {
      const response = await this.server.getTaskInfo(this.token, this.id);
      console.log(response.labels);
      this.initLabels(response.labels);
      this.initDescription(this.id, response.taskInfo.description);
      this.initCheckLists(response.checkLists);
      this.comment.init(response.user, response.comments, this.id);
    }
  }

  public async init(id: string, dashboardId: string) {
    this.id = id;
    this.sidebar.modalLabels.path = this.path;
    this.dashboardId = dashboardId;
    const response = await this.server.getTaskInfo(this.token, id);
    this.title.textContent = response.taskInfo.name;
    this.info.textContent = `from ${response.taskInfo.tasklist}`;
    this.taskId = response.taskInfo.taskId;
    this.comment.init(response.user, response.comments, id);
    this.initCheckLists(response.checkLists);
    this.initLabels(response.labels);
    this.initDescription(id, response.taskInfo.description);
    this.taskInfo.classList.add('active');
  }

  private initCheckLists(checkLists: ICheckList[]) {
    this.checkListContainer.innerHTML = '';
    checkLists.forEach((item) => {
      const checkList = new Checklist(item.id, item.name, this.path, this.socket);
      item.todo.forEach((data) => {
        const checkpoint = new Checkpoint(data.id, this.socket, this.path);
        checkpoint.input.value = data.text;
        checkpoint.checkbox.checked = data.checked;
        if (data.checked) {
          checkpoint.input.classList.toggle('done');
        }
        checkList.checkpointsWrapper.append(checkpoint.point);
      });
      this.checkListContainer.append(checkList.checklist);
    });
  }

  private initDescription(id: string, description: string) {
    this.description.id = id;
    description ? this.description.init(description) : this.description.init('');
  }

  private async initLabels(labels: TLabel[]) {
    let labelsCopy = labels.slice();
    (Array.from(this.labels.labels.children) as HTMLInputElement[]).forEach((label) => {
      const item = labelsCopy.find((item) => item.title === label.title);
      if (item) {
        label.value = item.text;
        labelsCopy = labelsCopy.filter((item1) => item1.title !== item.title);
      } else {
        label.remove();
      }
    });

    labels.length ? this.showLabels() : this.hideLabels();

    labelsCopy.forEach((data) => {
      this.showLabels();
      this.labels.labels.append(this.sidebar.modalLabels.createLabelColor(data));
    });

    Array.from(this.sidebar.modalLabels.labelsContainer.children).forEach((item) => {
      (item.children[0] as HTMLInputElement).checked = Boolean(
        labels.find((label) => (item.children[1] as HTMLInputElement).title === label.title)
      );
    });
  }

  private onClose() {
    this.taskInfo.classList.remove('active');
  }

  private async createCheckList(event: Event) {
    event.preventDefault();
    const name = this.sidebar.modalCheckList.inputTitle.value;
    const response: { checkList: { id: string } } = await this.server.createCheckList(this.token, this.id, name);
    const checklist = new Checklist(response.checkList.id, name, this.path, this.socket);
    this.checkListContainer.append(checklist.checklist);
    this.sidebar.modalCheckList.module.onClose();
    this.sidebar.modalCheckList.inputTitle.value = 'Checklist';
    this.socket.emit('taskInfo', this.path);
  }

  private async addLabels(event: Event) {
    const target = event.target as HTMLElement;
    const targetColor = target.closest('.label__color') as HTMLInputElement;
    const targetCheck = target.closest('.label__checkbox') as HTMLInputElement;
    if (targetColor) {
      if (!(targetColor.previousElementSibling as HTMLInputElement).checked) {
        (targetColor.previousElementSibling as HTMLInputElement).checked = true;
        await this.addLabel(targetColor);
      } else {
        (targetColor.previousElementSibling as HTMLInputElement).checked = false;
        await this.removeLabel(targetColor);
      }
      this.socket.emit('taskInfo', this.path);
    }

    if (targetCheck) {
      const elementColor = targetCheck.nextElementSibling as HTMLInputElement;
      targetCheck.checked ? await this.addLabel(elementColor) : await this.removeLabel(elementColor);
      this.socket.emit('taskInfo', this.path);
    }
  }

  async addLabel(element: HTMLInputElement) {
    this.showLabels();
    const copyElement = element.cloneNode(true) as HTMLElement;
    const id = element.getAttribute('id')!;
    copyElement.setAttribute('id', id);
    await this.server.addLabel(this.token, this.taskId, id, this.dashboardId);
    const item = (Array.from(this.labels.labels.children) as HTMLElement[]).find((child) => {
      return Number(child.getAttribute('id')!) > Number(id);
    });
    item ? this.labels.labels.insertBefore(copyElement, item) : this.labels.labels.append(copyElement);
  }

  async removeLabel(element: HTMLInputElement) {
    await Promise.all(
      (Array.from(this.labels.labels.children) as HTMLElement[]).map(async (child) => {
        if (child.title === element.title) {
          await this.server.deleteLabel(this.token, this.taskId, element.getAttribute('id')!, this.dashboardId);
          child.remove();
        }
      })
    );
    if (!this.labels.labels.children.length) {
      this.hideLabels();
    }
  }

  private showLabels() {
    this.labels.labelsWrapper.classList.remove('hidden');
  }

  private hideLabels() {
    this.labels.labelsWrapper.classList.add('hidden');
  }
}
