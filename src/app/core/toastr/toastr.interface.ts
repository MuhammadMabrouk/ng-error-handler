export interface Toast {
  id: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  message: string;
  duration?: number;
  autoDismiss?: boolean;
}
