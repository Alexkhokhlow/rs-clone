import Common from '../../../../../utils/common';
import ModuleForm from './moduleForm';
import labels from '../../../common/constants';

export default class LabelsModule {
  private labels: HTMLElement;

  private title: HTMLElement;

  public module: ModuleForm;

  public labelsContainer: HTMLElement;

  private wrapper: HTMLElement;

  private label: HTMLLabelElement;

  private input: HTMLInputElement;

  private buttons: HTMLElement;

  private save: HTMLButtonElement;

  private cancel: HTMLButtonElement;

  constructor() {
    this.module = new ModuleForm();
    this.labels = Common.createDomNode('div', ['labels']);
    this.title = Common.createDomNode('span', ['labels__title'], 'Labels');
    this.labelsContainer = Common.createDomNode('ul', ['labels__container']);
    this.wrapper = Common.createDomNode('div', ['label__title__wrapper', 'hidden']);
    this.label = Common.createDomNodeLabel('title', 'Title', ['labels__title']);
    this.input = Common.createDomNodeInput('Enter title', 'title', ['label__input']);
    this.buttons = Common.createDomNode('div', ['buttons']);
    this.save = Common.createDomNodeButton(['button', 'save'], 'Save');
    this.cancel = Common.createDomNodeButton(['button', 'cancel'], 'Cancel');
    this.createLabels();
    this.append();
  }

  private append() {
    this.buttons.append(this.save, this.cancel);
    this.wrapper.append(this.label, this.input, this.buttons);
    this.labelsContainer.append(this.wrapper);
    this.labels.append(this.title, this.labelsContainer);
    this.module.init('Labels', this.labels);
    this.bindEvents();
  }

  private createLabels() {
    labels.forEach(label => {
      const labelLi = Common.createDomNode('li', ['label']);
      const checkbox = Common.createDomNodeInput('', '', ['label__checkbox'], 'checkbox');
      const editWrapper = Common.createDomNode('div', ['label__edit__wrapper']);
      const labelColor = Common.createDomNodeInput('', '', ['label__color']);
      labelColor.readOnly = true;
      labelColor.style.background = `${label.color}`;
      labelColor.title = label.title;
      const edit = Common.createDomNode('div', ['label__edit']);
      editWrapper.append(edit);
      labelLi.append(checkbox, labelColor, editWrapper);
      this.labelsContainer.append(labelLi);
    })
  }

  private bindEvents() {
    this.labelsContainer.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;
      if(target.closest('.label__edit__wrapper')) {
        this.openLabelTitleEditor();
        this.save.addEventListener('click', () => {
          (target.closest('.label__edit__wrapper')?.previousElementSibling as HTMLInputElement).value = this.input.value;
          this.wrapper.classList.add('hidden');
        })
      }
    })
    this.cancel.addEventListener('click', this.closeLabelTitleEditor.bind(this));
  }

  private openLabelTitleEditor() {
    this.wrapper.classList.remove('hidden');
  }

  private closeLabelTitleEditor() {
    this.wrapper.classList.add('hidden');
  }
}
