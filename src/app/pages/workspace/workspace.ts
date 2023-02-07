import Header from './header/header';
import Common from '../../utils/common';
import MainWorkspace from './main/main';

export default class Workspace {
  private workspace: HTMLElement;
  private header: Header;
  private main: MainWorkspace;

  constructor() {
    this.workspace = Common.createDomNode('div', ['workspace__page']);
    this.header = new Header();
    this.main = new MainWorkspace();
  }

  public append() {
    this.workspace.append(this.header.append(), this.main.append());

    return this.workspace;
  }
}
