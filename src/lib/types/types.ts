export interface shortcutItem {
  label?: string;
  key: string;
  icon?: string;
  role?: string;
  alias?: string | string[];
  separator?: boolean;
  onSelect?: () => void;
  children?: shortcutItem[]
}

export interface ShortcutItems {
  items: shortcutItem[];
}
