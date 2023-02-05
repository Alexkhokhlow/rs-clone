import Common from "../../../utils/common";

export default class StartPageFooter {
  footer: HTMLElement;

  constructor() {
    this.footer = Common.createDomNode('footer', ['start__footer']);
  }
}
