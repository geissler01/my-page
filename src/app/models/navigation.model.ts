export interface NavItem {
  label: string;
  route: string;
  badge?: string;
  icon?: string;
}

export interface NavCategory {
  title: string;
  items: NavItem[];
}

export interface TocItem {
  id: string;
  label: string;
}
