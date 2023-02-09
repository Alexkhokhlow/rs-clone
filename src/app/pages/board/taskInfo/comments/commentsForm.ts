import Common from '../../../../utils/common';
import Comment from './comment/comment';
import InputComment from './inputComment/inputComment';

export default class CommentsForm {
  commentsForm: HTMLElement;
  title: HTMLElement;
  container: HTMLElement;
  input: InputComment;
  comments: Comment[];

  constructor() {
    this.comments = [];
    this.commentsForm = Common.createDomNode('div', ['comments']);
    this.title = Common.createDomNode('span', ['comments__title'], 'comments');
    this.input = new InputComment(this.onSave.bind(this));
    this.container = Common.createDomNode('div', ['comments__container']);

    this.commentsForm.append(this.title, this.input.container, this.container);
  }

  onSave() {
    const comment = new Comment(this.input.form.input.value, this.onDelete.bind(this), this.comments.length + 1);
    this.comments.push(comment);
    this.commentsForm.append(comment.comment);
  }

  onDelete(event: Event) {
    const target = event.target as HTMLElement;
    const id = target.getAttribute('id');
    if (id) {
      this.commentsForm.removeChild(this.comments[Number(id) - 1].comment);
    }
  }
}
