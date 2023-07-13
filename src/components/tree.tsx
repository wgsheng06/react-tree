import { FC, useEffect, useState } from 'react';
import TreeNode from './tree.node';

interface Props {
  data: TreeData[];
}

type TreeKeyMap = Record<TreeData['key'], TreeData>;

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

  // 内部_data改变时，扁平化的树结构更新
  useEffect(() => {
    setTreeKeyMap(buildKeyMap(_data));
  }, [_data]);

  // 当前被勾选时，所有子节点都应该被勾选
  // 当前被取消勾选时，所有子节点都应该被取消勾选
  const onCheckedChildrenNode = (children: TreeData[], checked: boolean) => {
    children.forEach((node) => {
      node.checked = checked;
      node.children && onCheckedChildrenNode(node.children, checked);
    });
  };

  // 当前被勾选时，
  // 深度所有父节点，并遍历其所有的子节点，判断该父节点是否充满
  const onCheckedParentAll = (parent: TreeData | null | undefined = null) => {
    // 这里通过!parent.checked进行了剪枝操作
    // 如果某一层父节点已经是checked了，那么子节点的checked对其及其再往上的节点已经没有影响了
    while (parent && !parent.checked) {
      parent.checked = (parent.children as TreeData[]).every(
        (child) => child.checked
      );
      parent = parent.parent;
    }
  };

  // 当前被取消勾选时，所有父节点都应该被取消勾选
  const onUnCheckedParent = (parent: TreeData | null | undefined = null) => {
    // 这里通过parent.checked进行了剪枝操作
    // 如果某一层父节点已经是!checked了，那么子节点的!checked对其及其再往上的节点已经没有影响了
    while (parent && parent.checked) {
      parent.checked = false;
      parent = parent.parent;
    }
  };

  const onCheck = (key: string) => {
    const node = treeKeyMap[key];
    const checked = !node.checked;

    // 这里先操作当前节点，这样后续操作其他节点时，可以不用管自身节点
    node.checked = checked;

    if (checked) {
      // 操作所有子节点
      node.children && onCheckedChildrenNode(node.children, true);
      // 操作所有父节点
      onCheckedParentAll(node.parent);
    } else {
      // 操作所有子节点
      node.children && onCheckedChildrenNode(node.children, false);
      // 操作所有父节点
      onUnCheckedParent(node.parent);
    }
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
