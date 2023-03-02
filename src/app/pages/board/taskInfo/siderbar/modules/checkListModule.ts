import Lang from '../../../../../common/lang/lang';
import Common from '../../../../../utils/common';
import ModuleForm from './moduleForm';

export default class CheckListModule {
  public checkList: HTMLElement;

  private title: HTMLLabelElement;

  public module: ModuleForm;

  public inputTitle: HTMLInputElement;

  private form: HTMLFormElement;

  public add: HTMLButtonElement;

  constructor() {
    const text = new Lang();
    this.module = new ModuleForm();
    this.checkList = Common.createDomNode('div', ['checklist']);
    this.form = Common.createDomNode('form', ['checklist__form']) as HTMLFormElement;
    this.title = Common.createDomNodeLabel('checklist__title', 'Title', ['checklist__title']);
    this.inputTitle = Common.createDomNodeInput('', 'checklist__title', ['checklist__input']);
    this.inputTitle.value = text.text.checklistText;
    this.add = Common.createDomNodeButton(['checklist__add'], text.text.checklist.add);
    this.append();
    this.module.init(text.text.addCheckList, this.checkList);
  }

  private append() {
    this.form.append(this.title, this.inputTitle, this.add);
    this.checkList.append(this.form);
  }
}
