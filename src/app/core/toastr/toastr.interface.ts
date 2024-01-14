export interface Toast {
  id: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'danger';
  duration?: number;
  autoDismiss?: boolean;
}
