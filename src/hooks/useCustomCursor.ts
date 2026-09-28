export interface CursorState {
  x: number;
  y: number;
  hovered: boolean;
  label: string;
  variant: 'default' | 'project' | 'link' | 'drag' | 'button';
  isTouch: boolean;
}

// Custom cursor temporarily disabled per user preference
export function useCustomCursor(): CursorState {
  return {
    x: -100,
    y: -100,
    hovered: false,
    label: '',
    variant: 'default',
    isTouch: true,
  };
}
