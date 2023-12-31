import { FC } from 'react';
import styles from './tree.node.module.less';

interface Props {
  data: TreeData[];
  onCheck?: (key: string) => boolean;
  onExpand?: (key: string) => boolean;
}

const TreeNode: FC<Props> = ({ data, onCheck, onExpand }) => {
  return (
    <>
      {data.map((node) => {
        return (
          <div key={node.key} className={styles.node}>
            <div className={styles.item}>
              {/* 拥有子孩子的节点才可以展开 */}
              {node.children ? (
                <div
                  className={styles.icon}
                  onClick={() => onExpand && onExpand(node.key)}
                >
                  {node.expand ? (
                    // 展开
                    <IconMdiArrowDownDropCircleOutline />
                  ) : (
                    // 收起
                    <IconMdiArrowRightDropCircleOutline />
                  )}
                </div>
              ) : null}
              {/* 勾选框部分 */}
              <div className={styles.icon}>
                <input
                  checked={node.checked}
                  onChange={() => onCheck && onCheck(node.key)}
                  type="checkbox"
                ></input>
              </div>
              {/* 勾选框部分结束 */}
              <div className={styles.name}>{node.name}</div>
            </div>
            {node.expand && node.children ? (
              <div className="node-children">
                <TreeNode
                  data={node.children}
                  onCheck={onCheck}
                  onExpand={onExpand}
                ></TreeNode>
              </div>
            ) : null}
          </div>
        );
      })}
    </>
  );
};

export default TreeNode;
