import Common from '../../../../../utils/common';
import Form from '../../../common/form';

export default class InputComment {
  container: HTMLElement;

  userIcon: HTMLElement;

  form: Form;

  constructor(onSave: () => void) {
    this.container = Common.createDomNode('div', ['input-comment']);
    this.form = new Form('Write a comment...', 'Save', onSave, this.onClose.bind(this));
    this.userIcon = Common.createDomNode('span', ['input-comment__user'], 'LL');

    this.form.container.classList.add('inactive');

    this.container.addEventListener('click', this.onShowButton.bind(this));
    this.container.append(this.userIcon, this.form.form);
  }

  onShowButton() {
    this.form.container.classList.remove('inactive');
  }

  onClose(event: Event) {
    event.stopPropagation();
    this.form.container.classList.add('inactive');
    this.form.initData('');
  }
}
