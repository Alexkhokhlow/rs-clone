import { TUser } from '../../../../../../types/types';
import Common from '../../../../../utils/common';
import ModuleForm from './moduleForm';

export default class MembersModule {
  members: HTMLElement;

  title: HTMLElement;

  module: ModuleForm;

  userContainer: HTMLElement;

  constructor() {
    this.module = new ModuleForm();
    this.members = Common.createDomNode('div', ['members']);
    this.title = Common.createDomNode('span', ['members__title'], 'Board members');
    this.userContainer = Common.createDOMNode('div', []);
    this.members.append(this.title, this.userContainer);
    this.module.init('Members', this.members);
  }

  init(users: { creator: TUser; users: TUser[] }) {
    this.userContainer.innerHTML = '';
    this.createUser(users.creator);
    users.users.forEach((user) => {
      this.createUser(user);
    });
  }

  createUser(user: TUser) {
    const userWrapper = Common.createDomNode('div', ['members__user']);
    const userIcon = Common.createUserIcon(user.email, user.userName, 'user__subheader', user.color);
    const name = Common.createDomNode('span', [], user.userName);
    userWrapper.append(userIcon, name);
    this.userContainer.append(userWrapper);
  }
}
