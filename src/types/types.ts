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
  id: string;
  name: string;
  pathName: string;
  tasklists: ITaskList[];
  public: boolean;
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

export interface ILabel {
  text: string;
  title: string;
  color: string;
  index: string;
}
