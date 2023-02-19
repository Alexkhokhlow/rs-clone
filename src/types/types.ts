export default interface IResponseBoard {
  access: boolean;
  dashboard: IBoard;
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
}

export interface ICommentInfo {
  createdAt: string;
  id: string;
  taskinfoId: string | null;
  text: string;
  updatedAt: string;
  userId: string;
  userName: string;
}

export type TLabels = {
  color: string;
  id: string;
  text: string;
  title: string;
};

export type TComments = {
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
