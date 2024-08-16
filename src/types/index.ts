export interface ComponentInfo {
  id: string;
  type: ComponentType;
  text?: string;
  config?: ComponentConfig[];
}

export interface ComponentConfig {
  label: string;
  value: string;
  fn: FunctionType;
  attr: string;
}

export enum ComponentType {
  Button = 'button',
  Paragraph = 'p',
}

export enum FunctionType {
  Alert = 'alert',
}

export const storedFunction: Record<FunctionType, (message: string) => void> = {
  [FunctionType.Alert]: (message: string) => alert(message),
};
