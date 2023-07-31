import { Socket } from 'socket.io-client';
import Lang from '../../../../../common/lang/lang';
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

  socket: Socket;

  path: string;

  answer: HTMLButtonElement;

  text: Lang;

  constructor(
    text: string,
    userName: string,
    onDelete: (event: Event) => void,
    onAnswer: (event: Event) => void,
    id: number,
    commentId: string,
    socket: Socket,
    path: string,
    flag: boolean
  ) {
    this.text = new Lang();
    this.socket = socket;
    this.path = path;
    this.data = text;
    this.id = id;
    this.commentId = commentId;
    this.userId = { name: '', id: '' };
    this.comment = Common.createDomNode('div', ['comment']);
    this.userName = Common.createDomNode('span', ['comment__user'], userName);
    this.input = new AddItemButton(text, text, this.text.text.save, this.onSave.bind(this));
    this.edit = Common.createDomNodeButton(['comment__edit'], this.text.text.edit);
    this.delete = Common.createDomNodeButton(['comment__delete'], this.text.text.delete);
    this.answer = Common.createDomNodeButton(['comment__answer'], this.text.text.answer);
    this.answer.setAttribute('user', userName);

    this.edit.addEventListener('click', this.onEdit.bind(this));
    this.answer.addEventListener('click', onAnswer);
    this.delete.addEventListener('click', onDelete);
    this.delete.setAttribute('id', String(this.id));
    this.delete.setAttribute('comment-id', commentId);

    if (flag) {
      this.comment.append(this.userName, this.input.container, this.edit, this.delete);
    } else {
      this.comment.append(this.userName, this.input.container, this.answer);
    }

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
      this.input.button.textContent = this.text.text.detailed;
    }
    if (this.token) {
      await this.server.updateComment(this.token, this.userId.id, this.commentId, this.data);
      this.socket.emit('taskInfo', this.path);
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
