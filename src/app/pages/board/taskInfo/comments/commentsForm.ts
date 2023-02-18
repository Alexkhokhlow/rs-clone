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

  constructor() {
    this.id = '';
    this.user = { name: '', id: '' };
    this.comments = [];
    this.commentsForm = Common.createDomNode('div', ['comments']);
    this.title = Common.createDomNode('span', ['comments__title', 'title__info'], 'Comments');
    this.input = new InputComment(this.onSave.bind(this));
    this.container = Common.createDomNode('div', ['comments__container']);
    this.server = new Server();
    this.token = localStorage.getItem('token');

    this.commentsForm.append(this.title, this.input.container, this.container);
  }

  createComment(text: string, userName: string, id: string) {
    const comment = new Comment(text, userName, this.onDelete.bind(this), this.comments.length + 1, id);
    comment.userId = this.user;
    this.comments.push(comment);
    this.container.insertBefore(comment.comment, this.container.children[0]);
  }

  init(user: { id: string; name: string }) {
    this.user = user;
    this.container.innerHTML = '';
  }

  async onSave(event: Event) {
    event.stopPropagation();
    const text = this.input.form.input.value;
    this.input.form.container.classList.add('hidden');
    this.input.form.input.value = '';
    if (this.token) {
      const { commentInfo } = await this.server.createComment(this.token, this.id, text);
      this.createComment(text, this.user.name, commentInfo.id);
    }
  }

  onDelete(event: Event) {
    const target = event.target as HTMLElement;
    const id = target.getAttribute('id');
    const commentId = target.getAttribute('comment-id');

    if (id && commentId && this.token) {
      this.container.removeChild(this.comments[Number(id) - 1].comment);
      this.server.deleteComment(this.token, this.user.id, commentId);
    }
  }
}
