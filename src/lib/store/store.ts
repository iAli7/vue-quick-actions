export interface shortcutItem {
    name: string;
    icon?: any | null;
    role: 'application' | 'command' | 'group';
    tag?: string | null;
    onSelect: () => void;
    children?: shortcutItem[] 
  }
  
  export interface ShortcutItems {
    items: shortcutItem[];
  }