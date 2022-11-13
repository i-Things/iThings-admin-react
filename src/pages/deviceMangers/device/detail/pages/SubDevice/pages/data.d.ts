export interface ModalProps {
  visible: boolean;
  onCancel: () => void;
  refresh: () => void;
  gateWayProductID: string;
  gateWaydeviceName: string;
}

export interface SelectOption {
  label: string;
  value: string;
}
