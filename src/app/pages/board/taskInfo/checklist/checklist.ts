import Common from "../../../../utils/common";
import AddItemButton from "../../common/addItemButton";
import Checkpoint from "./checkPoint/checkpoint";

export default class Checklist {
  public checklist: HTMLElement;

  private checklistHeader: HTMLElement;

  public checklistTitle: HTMLElement;

  private checklistDelete: HTMLButtonElement;

  private addItemButton: AddItemButton;

  private checkpoints: HTMLElement;

  constructor() {
    this.checklist = Common.createDomNode('div', ['checklist__info']);
    this.checklistHeader = Common.createDomNode('div', ['checklist__header__wrapper']);
    this.checklistTitle = Common.createDomNode('h4', ['checklist__title__info', 'title__info']);
    this.checklistDelete = Common.createDomNodeButton(['checklist__delete'], 'Delete');
    this.checkpoints = Common.createDomNode('div', ['checkpoints__wrapper']);
    this.addItemButton = new AddItemButton('Add an item', 'Add an item', 'Add', this.onSave.bind(this))

    this.append();
  }

  private append() {
    this.checklistHeader.append(this.checklistTitle, this.checklistDelete);
    this.checklist.append(this.checklistHeader, this.checkpoints, this.addItemButton.container);
    this.bindEvents();
  }

  private bindEvents() {
    this.checklistDelete.addEventListener('click', this.removeChecklist.bind(this))
  }

  private removeChecklist() {
    this.checklist.remove()
  }

  private onSave() {
    const checkpoint = new Checkpoint(this.addItemButton.form.input.value);
    this.checkpoints.append(checkpoint.point);
    this.addItemButton.onClose();
  }
}
