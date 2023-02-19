import Server from '../../../../../server/server';
import Common from '../../../../../utils/common';
import AddItemButton from '../../../common/addItemButton';

export default class Comment {
  userName: HTMLElement;

  comment: HTMLElement;

  input: AddItemButton;

  edit: HTMLButtonElement;

  delete: HTMLButtonElement;

  data: string;

  id: number;

  server: Server;

  token: string | null;

  userId: { id: string; name: string };

  commentId: string;

  constructor(text: string, userName: string, onDelete: (event: Event) => void, id: number, commentId: string) {
    this.data = text;
    this.id = id;
    this.commentId = commentId;
    this.userId = { name: '', id: '' };
    this.comment = Common.createDomNode('div', ['comment']);
    this.userName = Common.createDomNode('span', ['comment__user'], userName);
    this.input = new AddItemButton(text, text, 'save', this.onSave.bind(this));
    this.edit = Common.createDomNodeButton(['comment__edit'], 'Edit');
    this.delete = Common.createDomNodeButton(['comment__delete'], 'Delete');

    this.edit.addEventListener('click', this.onEdit.bind(this));
    this.delete.addEventListener('click', onDelete);
    this.delete.setAttribute('id', String(this.id));
    this.delete.setAttribute('comment-id', commentId);

    this.comment.append(this.userName, this.input.container, this.edit, this.delete);
    this.input.button.disabled = true;
    this.server = new Server();
    this.token = localStorage.getItem('token');
  }

  async onSave() {
    if (this.input.form.data) {
      this.input.button.textContent = this.input.form.data;
      this.data = this.input.form.data;
    } else {
      this.data = '';
      this.input.button.textContent = 'Add a more detailed description...';
    }
    if (this.token) {
      this.server.updateComment(this.token, this.userId.id, this.commentId, this.data);
    }

    this.input.button.setAttribute('value', this.input.form.data);
    this.input.onClose();
    this.edit.classList.remove('hidden');
    this.delete.classList.remove('hidden');
  }

  onEdit() {
    this.input.form.initData(this.data);
    this.input.onActivate();
    this.edit.classList.add('hidden');
    this.delete.classList.add('hidden');
  }
}
