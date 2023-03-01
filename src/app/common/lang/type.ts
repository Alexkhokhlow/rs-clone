export interface ILang {
  aboutMe: string;
  actions: { subtitle: string; title: string };
  add: string;
  addCheckList: string;
  answer: string;
  board: { lestPlaceholder: string; listText: string; listValue: string };
  cancel: string;
  card: {
    lestPlaceholder: string;
    listText: string;
  };
  checklist: { add: string; addItem: string };
  checklistText: string;
  comments: string;
  constants: {
    actions: {
      brainstorming: { description: string; title: string };
      crm: { description: string; title: string };
      meetings: { description: string; title: string };
      projectManagement: { description: string; title: string };
      taskManagement: { description: string; title: string };
    };
    articles: {
      butler: { description: string; title: string };
      integrations: { description: string; title: string };
      trello: { description: string; title: string };
    };
    cardsDescription: {
      boards: { description: string; title: string };
      cards: { description: string; title: string };
      lists: { description: string; title: string };
    };
  };
  continueWith: string;
  create: string;
  createBoard: {
    background: string;
    boardTitle: string;
    createBoard: string;
    enter: string;
    privateDescription: string;
    publicDescription: string;
    require: string;
    visibility: string;
    visibilityChoose: string;
  };
  delete: string;
  description: string;
  detailed: string;
  edit: string;
  enterDescription: string;
  enterName: string;
  enterTitle: string;
  errorPage: { notFound: string; private: string; sign: string };
  from: string;
  header: { logIn: string; trelloFree: string };
  labels: string;
  login: {
    already: string;
    busy: string;
    continue: string;
    email: string;
    error: string;
    invalid: string;
    invalidName: string;
    invalidPass: string;
    login: string;
    name: string;
    or: string;
    password: string;
    ready: string;
    sing: string;
    singUp: string;
  };
  members: string;
  more: { description: string; subtitle: string; title: string };
  name: string;
  nameError: string;
  powerhouse: { description: string; subtitle: string; title: string };
  private: string;
  profile: string;
  public: string;
  save: string;
  share: { copied: string; input: string; link: string; share: string; text: string; title: string };
  singUp: string;
  singupSection: { email: string; submit: string; subtitle: string; title: string };
  submit: string;
  start: { title: string };
  title: string;
  userModal: { account: string; logOut: string; switcher: string };
  userName: string;
  using: { text: string };
  workspace: { available: { info: string; title: string }; board: { info: string; title: string } };
  workspaceTitle: string;
  writeComment: string;
}
