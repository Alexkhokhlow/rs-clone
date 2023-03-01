export interface ILang {
  constants: {
    articles: {
      integrations: { title: string; description: string };
      butler: { title: string; description: string };
      trello: { title: string; description: string };
    };
    cardsDescription: {
      boards: { title: string; description: string };
      cards: { title: string; description: string };
      lists: { title: string; description: string };
    };
    actions: {
      projectManagement: { title: string; description: string };
      brainstorming: { title: string; description: string };
      meetings: { title: string; description: string };
      taskManagement: { title: string; description: string };
      crm: { title: string; description: string };
    };
  };
  actions: { subtitle: string; title: string };
  header: { logIn: string; trelloFree: string };
  more: { subtitle: string; title: string; description: string };
  powerhouse: { subtitle: string; title: string; description: string };
  singupSection: { title: string; subtitle: string; email: string; submit: string };
  start: { title: string };
  using: { text: string };
  save: string;
  profile: string;
  userName: string;
  aboutMe: string;
  cancel: string;
  name: string;
  create: string;
  enterName: string;
  workspaceTitle: string;
  private: string;
  public: string;
  submit: string;
  singUp: string;
  from: string;
  delete: string;
  comments: string;
  checklistText: string;
  continueWith: string;
  writeComment: string;
  answer: string;
  edit: string;
  detailed: string;
  description: string;
  enterDescription: string;
  labels: string;
  members: string;
  add: string;
  addCheckList: string;
  title: string;
  enterTitle: string;
  workspace: { board: { title: string; info: string }; available: { title: string; info: string } };
  userModal: { account: string; switcher: string; logOut: string };
  createBoard: {
    createBoard: string;
    background: string;
    boardTitle: string;
    enter: string;
    require: string;
    visibility: string;
    visibilityChoose: string;
    publicDescription: string;
    privateDescription: string;
  };
  login: {
    invalid: string;
    invalidName: string;
    invalidPass: string;
    password: string;
    email: string;
    sing: string;
    login: string;
    singUp: string;
    or: string;
    continue: string;
    name: string;
    already: string;
    error: string;
    busy: string;
    ready: string;
  };
  errorPage: { notFound: string; private: string; sign: string };
  share: { title: string; input: string; share: string; text: string; link: string; copied: string };
  board: { listText: string; lestPlaceholder: string; listValue: string };
  checklist: { addItem: string; add: string };
  card: {
    listText: string;
    lestPlaceholder: string;
  };
  nameError: string;
}
