export interface IMessageBoxData {
  title: string;
  message: string;
  width?: number;
  height?: number;
}

export interface IMessageBox {
  data: IMessageBoxData[];
}
