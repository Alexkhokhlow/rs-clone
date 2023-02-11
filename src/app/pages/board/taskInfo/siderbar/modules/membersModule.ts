import Common from '../../../../../utils/common';
import ModuleForm from './moduleForm';

export default class MembersModule {
  members: HTMLElement;

  title: HTMLElement;

  module: ModuleForm;

  constructor() {
    this.module = new ModuleForm();
    this.members = Common.createDomNode('div', ['members']);
    this.title = Common.createDomNode('span', ['members__title'], 'Board members');
    this.members.append(this.title);
    this.module.init('Members', this.members);
  }
}
