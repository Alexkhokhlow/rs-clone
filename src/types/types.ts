export default interface IResponseBoard {
  access: boolean;
  dashboard: IBoard;
  id: string;
  labels: TLabel[];
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
}

export type TUser = {
  id: string;
  name: string;
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
};

export type TTask = {
  task: {
    id: string;
    index: string;
    name: string;
    updateAt: string;
  };
};
