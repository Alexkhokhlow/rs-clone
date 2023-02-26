export default interface IResponseBoard {
  access: boolean;
  dashboard: IBoard;
  id: string;
  labels: TLabel[];
  users: TUser[];
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
  comments: TComment[];
  labels: TLabel[];
  taskInfo: TTaskInfo;
  user: TUser;
  checkLists: ICheckList[];
}

export interface ICheckList {
  name: string;
  id: string;
  todo : ITodo[]
}

export interface ITodo{
  text: string;
  id: string;
  checked: boolean;
}

export type TUser = {
  id: string;
  userName: string;
  name: string;
  info: string;
  email: string;
  color: string | null;
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
  updatedAt: string;
};

export type TComment = {
  id: string;
  text: string;
  userName: string;
  userId:string;
};

export type TTask = {
  task: {
    id: string;
    index: string;
    name: string;
    updateAt: string;
  };
};
