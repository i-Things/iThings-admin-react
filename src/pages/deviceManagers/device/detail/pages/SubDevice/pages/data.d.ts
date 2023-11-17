export interface ModalProps {
  visible: boolean;
  refresh: () => void;
  gateWayProductID: string;
  gateWaydeviceName: string;
  setVisible: SetStateAction;
}

export interface SelectOption {
  label: string;
  value: string;
}
