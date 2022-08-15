interface ICursorData {
  value: number;
  corlor?: string;
  text?: string;
}

export interface ICursorHitText {
  title?: string;
  content: string[];
}
interface ICursorChartsProps {
  list: ICursorData[];
  data: number;
  hitText: string;
  hit: ICursorHitText[];
}

interface ICursorShowData {
  width: number;
  height: number | string;
  top: number | string;
  left: number;
  text?: string;
  corlor?: string;
}

interface ICursorShowText {
  top: number | value;
  left: number | string;
  text: string;
}
