import Common from '../../../../../utils/common';
import ModuleForm from './moduleForm';

export default class LabelsModule {
 labels: HTMLElement;

  title: HTMLElement;
  module: ModuleForm;

  constructor() {
    this.module = new ModuleForm();
    this.labels = Common.createDomNode('div', ['labels']);
    this.title = Common.createDomNode('span', ['labels__title'], 'Labels');
    this.labels.append(this.title);
    this.module.init('Labels', this.labels);
  }
}
