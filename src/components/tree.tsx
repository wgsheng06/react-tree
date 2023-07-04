import { FC, useEffect, useState } from 'react';
import TreeNode from './tree.node';

interface Props {
  data: TreeData[];
}

type TreeKeyMap = Record<string, TreeData>;

/**
 * 序列化整颗树，方便遍历
 * @param data
 * @param result
 * @returns
 */
const buildKeyMap = (
  data: TreeData[],
  result: TreeKeyMap = {},
  parent: TreeData | null = null
): TreeKeyMap => {
  data.forEach((node) => {
    node.parent = parent;
    result[node.key] = node;
    node.children && buildKeyMap(node.children, result, node);
  });
  return result;
};

const Tree: FC<Props> = ({ data }) => {
  const map = buildKeyMap(data);
  const [treeKeyMap, setTreeKeyMap] = useState<TreeKeyMap>(map);
  const [_data, setData] = useState<TreeData[]>(data);

  useEffect(() => {
    setTreeKeyMap(buildKeyMap(_data));
  }, [_data]);

  const onCheck = (key: string) => {
    const node = treeKeyMap[key];
    const checked = !node.checked;
    node.checked = checked;
    setData([..._data]);
    return true;
  };
  const onExpand = (key: string) => {
    const node = treeKeyMap[key];
    const expand = !node.expand;
    node.expand = expand;
    setData([..._data]);
    return true;
  };

  return (
    <>
      <TreeNode data={_data} onCheck={onCheck} onExpand={onExpand}></TreeNode>
    </>
  );
};

export default Tree;
