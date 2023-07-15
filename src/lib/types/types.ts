export interface shortcutItem {
  label: string;
  icon?: Object;
  role?: string;
  alias?: string | null;
  separator?: boolean;
  onSelect?: () => void;
  children?: shortcutItem[]
}

export interface ShortcutItems {
  items: shortcutItem[];
}
