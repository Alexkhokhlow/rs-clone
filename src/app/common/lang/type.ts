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
  start: { title: string };
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
  workspaceTitle: string;
  private: string;
  public: string;
  submit: string;
  singUp: string;
  from: string;
  enterName: string;
  userName: string;
  header: { logIn: string; trelloFree: string };
  continueWith: string;
  login: {
    already: string;
    busy: string;
    continue: string;
    password: string;
    email: string;
    sing: string;
    login: string;
    singUp: string;
    or: string;
    invalidPass: string;
    name: string;
    invalid: string;
    error: string;
    invalidName: string;
    ready: string;
  };
  powerhouse: { subtitle: string; title: string; description: string };
  edit: string;
  detailed: string;
  description: string;
  enterDescription: string;
  labels: string;
  members: string;
  profile: string;
  more: { description: string; title: string; subtitle: string };
  title: string;
  enterTitle: string;
  workspace: { available: { info: string; title: string }; board: { info: string; title: string } };
  writeComment: string;
  name: string;
  userModal: { account: string; logOut: string; switcher: string };
  errorPage: { notFound: string; private: string; sign: string };
  share: { copied: string; input: string; link: string; share: string; text: string; title: string };
  singupSection: { email: string; submit: string; title: string; subtitle: string };
  save: string;
  using: { text: string };
}
