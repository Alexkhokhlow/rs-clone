import StartPageHeader from "./header";
import Common from "../../utils/common";

export default class StartPage {
  header: StartPageHeader;
  container: HTMLElement;
  
  constructor() {
    this.container = Common.createDomNode('div', ['wrapper', 'wrapper__start']);
    this.header = new StartPageHeader();
    this.append();
  }

  private append() {
    this.container.append(this.header.header);
  }
}
