import Common from '../../../../../utils/common';
import ModuleForm from './moduleForm';
import Server from '../../../../../server/server';
import { TLabel } from '../../../../../../types/types';

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

  private token: string;

  private server: Server;

  private emitLabelSocked: () => void;

  private dashboardId: string;

  constructor(emitLabelSocked: () => void) {
    this.dashboardId = '';
    this.emitLabelSocked = emitLabelSocked;
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
    this.append();
    this.server = new Server();
    this.token = localStorage.getItem('token')!;
  }

  private append() {
    this.buttons.append(this.save, this.cancel);
    this.wrapper.append(this.label, this.input, this.buttons);
    this.labels.append(this.title, this.wrapper, this.labelsContainer);
    this.module.init('Labels', this.labels);
    this.bindEvents();
  }

  public async createLabels(labels: TLabel[], dashboardId: string) {
    this.dashboardId = dashboardId;
    labels.forEach((label) => {
      this.createLabel(label);
    });
  }

  public async changeLabels(labels: TLabel[]) {
    (Array.from(this.labelsContainer.children) as HTMLInputElement[]).forEach((label, index) => {
      const colorInput = label.children[1] as HTMLInputElement;
      colorInput.value = labels[index].text;
    });
  }

  private createLabel(label: TLabel) {
    const labelLi = Common.createDomNode('li', ['label']);
    const checkbox = Common.createDomNodeInput('', '', ['label__checkbox'], 'checkbox');
    const editWrapper = Common.createDomNode('div', ['label__edit__wrapper']);
    const labelColor = this.createLabelColor(label);
    const edit = Common.createDomNode('div', ['label__edit']);
    editWrapper.append(edit);
    labelLi.append(checkbox, labelColor, editWrapper);
    this.labelsContainer.append(labelLi);

    editWrapper.addEventListener('click', (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      const label = target.previousElementSibling as HTMLElement;
      this.openLabelTitleEditor();
      this.wrapper.setAttribute('id', label.getAttribute('id')!);
    });
  }

  public createLabelColor(label: TLabel) {
    const labelColor = Common.createDomNodeInput('', '', ['label__color']);
    labelColor.readOnly = true;
    labelColor.style.background = `${label.color}`;
    labelColor.title = label.title;
    labelColor.value = label.text;
    labelColor.setAttribute('id', String(label.index));
    return labelColor;
  }

  private bindEvents() {
    this.save.addEventListener('click', this.onSaveLabel.bind(this));
    this.cancel.addEventListener('click', this.closeLabelTitleEditor.bind(this));
  }

  async onSaveLabel() {
    const text = this.input.value;
    const id = this.wrapper.getAttribute('id')!;
    const colorLabel = this.labelsContainer.children[Number(id)].children[1] as HTMLInputElement;
    colorLabel.value = text;
    this.closeLabelTitleEditor();
    this.input.value = '';
    if (this.token) {
      await this.server.updateLabel(this.token, id, text, this.dashboardId);
      this.emitLabelSocked();
    }
  }

  private openLabelTitleEditor() {
    this.wrapper.classList.remove('hidden');
  }

  private closeLabelTitleEditor() {
    this.wrapper.classList.add('hidden');
  }
}
