import Common from '../../../../utils/common';

export default class Sidebar {
  sidebar: HTMLElement;
  title: HTMLElement;
  modules: HTMLElement;
  members: HTMLButtonElement;
  labels: HTMLButtonElement;
  checkList: HTMLButtonElement;

  constructor() {
    this.sidebar = Common.createDomNode('sidebar', ['sidebar']);
    this.title = Common.createDomNode('span', ['sidebar__title'], 'Add to card');
    this.modules = Common.createDomNode('div', ['sidebar__modules']);
    this.members = Common.createDomNodeButton(['sidebar__modules__members', 'module'], 'members');
    this.labels = Common.createDomNodeButton(['sidebar__modules__members', 'module'], 'Labels');
    this.checkList = Common.createDomNodeButton(['sidebar__modules__members', 'module'], 'checkList');
    this.sidebar.append(this.title, this.modules);
    this.modules.append(this.members, this.checkList, this.labels);
  }
}
