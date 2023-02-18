import Common from "../../../../../utils/common";
import AddItemButton from "../../../common/addItemButton";

export default class Checkpoint {
  public point: HTMLElement;

  public checkbox: HTMLInputElement;

  public input: AddItemButton;

  public delete: HTMLButtonElement;

  constructor(inputValue: string) {
    this.point = Common.createDomNode('div', ['checkpoint']);
    this.checkbox = Common.createDomNodeInput('', '', ['checkpoint__checkbox'], 'checkbox');
    this.input = new AddItemButton(inputValue, inputValue, 'Save', this.onSave.bind(this));
    this.delete = Common.createDomNodeButton(['checkpoint__delete']);

    this.append();
  }

  private append() {
    this.point.append(this.checkbox, this.input.container, this.delete)
  }

  private onSave() {
    if (this.input.form.data) {
      this.input.button.textContent = this.input.form.data;
    }

    this.input.button.setAttribute('value', this.input.form.data);
    this.input.onClose();
  }

}
