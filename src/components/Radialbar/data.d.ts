export interface IRadialbarData {
  name: string;
  num: number;
}

export interface IRadialbarProps {
  data: IRadialbarData[];
  maxNum?: number;
  formatter?: string;
  config?: any;
}
