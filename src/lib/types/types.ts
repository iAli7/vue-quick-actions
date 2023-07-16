export interface shortcutItem {
  label?: string;
  icon?: Object;
  alias?: string | null;
  separator?: boolean;
  onSelect?: () => void;
  children?: shortcutItem[]
}

export interface ShortcutItems {
  items: shortcutItem[];
}
