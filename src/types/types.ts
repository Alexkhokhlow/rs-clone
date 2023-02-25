export default interface IResponseBoard {
  access: boolean;
  dashboard: IBoard;
  labels: TLabel[];
  id: string;
}

export interface IResponseBoards {
  availableDashboards: IBoard[];
  createdDashboards: IBoard[];
}
export interface IBoard {
  color: string;
  public: boolean;
  id: string;
  name: string;
  pathName: string;
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
  name: string;
  labels: TLabel[];
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
  labels: TLabel[];
  comments: TComment[];
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
  name: string;
  info: string;
  email: string;
};

export type TTaskInfo = {
  taskId: string;
  name: string;
  tasklist: string;
  description: string;
};

export type TLabel = {
  text: string;
  title: string;
  color: string;
  index: string;
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
