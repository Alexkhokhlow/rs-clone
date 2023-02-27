import { Socket } from 'socket.io-client';
import Lang from '../../../../common/lang/lang';
import Common from '../../../../utils/common';
import CheckListModule from './modules/checkListModule';
import LabelsModule from './modules/labelsModule';
import MembersModule from './modules/membersModule';

export default class Sidebar {
  sidebar: HTMLElement;

  title: HTMLElement;

  modules: HTMLElement;

  members: HTMLButtonElement;

  labels: HTMLButtonElement;

  modalMembers: MembersModule;

  modalLabels: LabelsModule;

  modalCheckList: CheckListModule;

  checkList: HTMLButtonElement;

  constructor(socket: Socket) {
    const text = new Lang();
    this.sidebar = Common.createDomNode('sidebar', ['sidebar']);
    this.title = Common.createDomNode('span', ['sidebar__title'], text.text.add);
    this.modules = Common.createDomNode('div', ['sidebar__modules']);
    this.members = Common.createDomNodeButton(['sidebar__modules__members', 'module__button'], text.text.members);
    this.labels = Common.createDomNodeButton(['sidebar__modules__labels', 'module__button'], text.text.labels);
    this.checkList = Common.createDomNodeButton(['sidebar__modules__check', 'module__button'], text.text. checklistText);
    this.modalMembers = new MembersModule();
    this.modalLabels = new LabelsModule(socket);
    this.modalCheckList = new CheckListModule();

    this.sidebar.append(this.title, this.modules);
    this.modules.append(
      this.modalMembers.module.module,
      this.modalLabels.module.module,
      this.modalCheckList.module.module,
      this.members,
      this.checkList,
      this.labels
    );

    this.members.addEventListener('click', () => {
      this.onOpenModule(this.modalMembers.module.module);
    });
    this.labels.addEventListener('click', () => {
      this.onOpenModule(this.modalLabels.module.module);
    });
    this.checkList.addEventListener('click', () => {
      this.onOpenModule(this.modalCheckList.module.module);
    });
  }

  onOpenModule(module: HTMLElement) {
    module.classList.add('active');
  }
}
