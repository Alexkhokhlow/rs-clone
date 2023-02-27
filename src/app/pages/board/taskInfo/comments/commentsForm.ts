import { Socket } from 'socket.io-client';
import { TComment, TUser } from '../../../../../types/types';
import Lang from '../../../../common/lang/lang';
import Server from '../../../../server/server';
import Common from '../../../../utils/common';
import Comment from './comment/comment';
import InputComment from './inputComment/inputComment';

export default class CommentsForm {
  commentsForm: HTMLElement;

  title: HTMLElement;

  container: HTMLElement;

  input: InputComment;

  comments: Comment[];

  server: Server;

  token: string | null;

  id: string;

  user: { id: string; name: string };

  private socket: Socket;

  public path: string;

  constructor(socket: Socket) {
    const text = new Lang();
    this.socket = socket;
    this.id = '';
    this.path = '';
    this.user = { name: '', id: '' };
    this.comments = [];
    this.commentsForm = Common.createDomNode('div', ['comments']);
    this.title = Common.createDomNode('span', ['comments__title', 'title__info'], text.text.comments);
    this.input = new InputComment(this.onSave.bind(this));
    this.container = Common.createDomNode('div', ['comments__container']);
    this.server = new Server();
    this.token = localStorage.getItem('token');

    this.commentsForm.append(this.title, this.input.container, this.container);
  }

  createComment(text: string, userName: string, id: string, flag:boolean) {
    const comment = new Comment(
      text,
      userName,
      this.onDelete.bind(this),
      this.onAnswer.bind(this),
      this.comments.length + 1,
      id,
      this.socket,
      this.path,
      flag
    );
    comment.userId = this.user;
    this.comments.push(comment);
    this.container.insertBefore(comment.comment, this.container.children[0]);
  }

  init(user: TUser, comments: TComment[], id: string) {
    this.user = user;
    this.container.innerHTML = '';
    comments.forEach((data) => {
      this.createComment(data.text, data.userName, data.id, data.userId == user.id);
    });
    this.id = id;
  }

  async onSave(event: Event) {
    event.stopPropagation();
    const text = this.input.form.input.value;
    if (text) {
      this.input.form.container.classList.add('hidden');
      this.input.form.input.value = '';
      if (this.token) {
        const { commentInfo } = await this.server.createComment(this.token, this.id, text);
        this.createComment(text, this.user.name, commentInfo.id, true);
        this.socket.emit('taskInfo', this.path);
      }
    }
  }

  onAnswer(event: Event) {
    const target = event.target as HTMLElement;
    const name = target.getAttribute('user');
    if (name && this.token) {
      this.input.form.input.value = `@${name}, `;
      this.input.form.input.focus();
    }
  }

  async onDelete(event: Event) {
    const target = event.target as HTMLElement;
    const id = target.getAttribute('id');
    const commentId = target.getAttribute('comment-id');

    if (id && commentId && this.token) {
      this.container.removeChild(this.comments[Number(id) - 1].comment);
      await this.server.deleteComment(this.token, this.user.id, commentId);
      this.socket.emit('taskInfo', this.path);
    }
  }
}
