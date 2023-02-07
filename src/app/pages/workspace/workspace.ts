import Header from './header/header';
import Common from '../../utils/common';
import MainWorkspace from './main/main';
import StartPageFooter from '../startPage/sections/footer';

export default class Workspace {
  private workspace: HTMLElement;
  private header: Header;
  private main: MainWorkspace;
  private footer: StartPageFooter;

  constructor() {
    this.workspace = Common.createDomNode('div', ['workspace__page']);
    this.header = new Header();
    this.main = new MainWorkspace();
    this.footer = new StartPageFooter()
  }

  public append() {
    this.workspace.append(this.header.append(), this.main.append(), this.footer.append());

    return this.workspace;
  }
}
