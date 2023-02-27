export default interface IResponseBoard {
  access: boolean;
  dashboard: IBoard;
  id: string;
  labels: TLabel[];
  users: { creator: TUser; users: TUser[] };
}

export interface IResponseBoards {
  availableDashboards: IBoard[];
  createdDashboards: IBoard[];
}

export interface IBoard {
  color: string;
  id: string;
  name: string;
  pathName: string;
  public: boolean;
  tasklists: ITaskList[];
}

export interface ITaskList {
  id: string;
  name: string;
  tasks: ITask[];
}

export interface ITask {
  checkLists: [{ all: number; checked: number }];
  comments: number;
  description: string;
  id: string;
  index: string;
  labels: TLabel[];
  name: string;
}

export interface ICommentInfo {
  createdAt: string;
  id: string;
  text: string;
  updatedAt: string;
  userId: string;
  userName: string;
}

export interface ITaskInfo {
  checkLists: ICheckList[];
  comments: TComment[];
  labels: TLabel[];
  taskInfo: TTaskInfo;
  user: TUser;
}

export interface ICheckList {
  id: string;
  name: string;
  todo: ITodo[];
}

export interface ITodo {
  checked: boolean;
  id: string;
  text: string;
}

export type TUser = {
  color: string;
  email: string;
  id: string;
  info: string;
  name: string;
  userName: string;
};

export type TTaskInfo = {
  description: string;
  name: string;
  taskId: string;
  tasklist: string;
};

export type TLabel = {
  color: string;
  index: string;
  text: string;
  title: string;
};

export type TComment = {
  id: string;
  text: string;
  userId: string;
  userName: string;
};

export type TTask = {
  task: {
    id: string;
    index: string;
    name: string;
  };
};
