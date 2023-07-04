interface TreeData {
  key: string;
  name: string;
  checked: boolean;
  expand: boolean;
  children?: TreeData[];
  parent?: TreeData | null;
}
