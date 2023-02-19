import Common from '../../../../utils/common';
import AddItemButton from '../../common/addItemButton';
import Checkpoint from './checkPoint/checkpoint';

export default class Checklist {
  public checklist: HTMLElement;

  private checklistHeader: HTMLElement;

  public checklistTitle: HTMLElement;

  private checklistDelete: HTMLButtonElement;

  private addItemButton: AddItemButton;

  private checkpointsWrapper: HTMLElement;

  public checkpoints: Checkpoint[];

  constructor() {
    this.checklist = Common.createDomNode('div', ['checklist__info']);
    this.checklistHeader = Common.createDomNode('div', ['checklist__header__wrapper']);
    this.checklistTitle = Common.createDomNode('h4', ['checklist__title__info', 'title__info']);
    this.checklistDelete = Common.createDomNodeButton(['checklist__delete'], 'Delete');
    this.checkpointsWrapper = Common.createDomNode('div', ['checkpoints__wrapper']);
    this.addItemButton = new AddItemButton('Add an item', 'Add an item', 'Add', this.onSave.bind(this));
    this.checkpoints = [];

    this.append();
  }

  private append() {
    this.checklistHeader.append(this.checklistTitle, this.checklistDelete);
    this.checklist.append(this.checklistHeader, this.checkpointsWrapper, this.addItemButton.container);
    this.bindEvents();
  }

  private bindEvents() {
    this.checklistDelete.addEventListener('click', this.removeChecklist.bind(this));
  }

  private removeChecklist() {
    this.checklist.remove();
  }

  private onSave() {
    if (this.addItemButton.form.input.value.trim()) {
      const checkpoint = new Checkpoint();
      checkpoint.input.value = this.addItemButton.form.input.value;
      this.checkpointsWrapper.append(checkpoint.point);
      this.addItemButton.onClose();
      this.checkpoints.push(checkpoint);
    }
  }
}
