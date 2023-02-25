import Common from '../../../../utils/common';
import AddItemButton from '../../common/addItemButton';
import Checkpoint from './checkPoint/checkpoint';

export default class Checklist {
  public checklist: HTMLElement;

  private checklistHeader: HTMLElement;

  public checklistTitle: HTMLElement;

  private titleIcon: HTMLElement;

  private checklistTitleInput: HTMLInputElement;

  private checklistDelete: HTMLButtonElement;

  private addItemButton: AddItemButton;

  private checkpointsWrapper: HTMLElement;

  public checkpoints: Checkpoint[];

  constructor() {
    this.checklist = Common.createDomNode('div', ['checklist__info']);
    this.checklistHeader = Common.createDomNode('div', ['checklist__header__wrapper']);
    this.titleIcon =  Common.createDomNode('div', ['checklist__icon']);
    this.checklistTitle = Common.createDomNode('h4', ['checklist__title__info', 'title__info']);
    this.checklistTitleInput = Common.createDomNodeInput('Enter checklist\'s title', '', ['checklist__title__input']);
    this.checklistDelete = Common.createDomNodeButton(['checklist__delete'], 'Delete');
    this.checkpointsWrapper = Common.createDomNode('div', ['checkpoints__wrapper']);
    this.addItemButton = new AddItemButton('Add an item', 'Add an item', 'Add', this.onSave.bind(this));
    this.checkpoints = [];

    this.append();
  }

  private append() {
    this.checklistHeader.append(this.titleIcon, this.checklistTitle, this.checklistDelete);
    this.checklist.append(this.checklistHeader, this.checkpointsWrapper, this.addItemButton.container);
    this.bindEvents();
  }

  private bindEvents() {
    this.checklistDelete.addEventListener('click', this.removeChecklist.bind(this));
    this.checklistTitle.addEventListener('click', () => {
      Common.clickTitle(this.checklistHeader, this.checklistTitle, this.checklistTitleInput)
    });
    this.checklistTitleInput.addEventListener('focusout', () => {
      Common.changeTitle(this.checklistHeader, this.checklistTitle, this.checklistTitleInput);
    });
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
