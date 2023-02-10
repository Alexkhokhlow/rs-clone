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

  constructor() {
    this.sidebar = Common.createDomNode('sidebar', ['sidebar']);
    this.title = Common.createDomNode('span', ['sidebar__title'], 'Add to card');
    this.modules = Common.createDomNode('div', ['sidebar__modules']);
    this.members = Common.createDomNodeButton(['sidebar__modules__members', 'module__button'], 'Members');
    this.labels = Common.createDomNodeButton(['sidebar__modules__members', 'module__button'], 'Labels');
    this.checkList = Common.createDomNodeButton(['sidebar__modules__members', 'module__button'], 'Checklist');
    this.modalMembers = new MembersModule();
    this.modalLabels = new LabelsModule();
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
