import Common from "../../utils/common";

export default class SignupSection {
  section: HTMLElement;
  constructor() {
    this.section = Common.createDomNode('section', ['signup__section']);
  }
}
