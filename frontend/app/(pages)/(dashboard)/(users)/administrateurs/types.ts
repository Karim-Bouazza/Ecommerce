export interface Group {
  id: number;
  name: string;
}

export interface UserWithGroups {
  id: number;
  groups: Group[];
}