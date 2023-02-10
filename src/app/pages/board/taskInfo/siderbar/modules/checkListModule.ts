import Common from '../../../../../utils/common';
import ModuleForm from './moduleForm';

export default class CheckListModule {
  checkList: HTMLElement;

  title: HTMLElement;
  module: ModuleForm;

  constructor() {
    this.module = new ModuleForm();
    this.checkList = Common.createDomNode('div', ['checkList']);
    this.title = Common.createDomNode('span', ['checkList__title'], 'checkList');
    this.checkList.append(this.title);
    this.module.init('checkList', this.checkList);
  }
}
