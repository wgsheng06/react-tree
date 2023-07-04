import './App.css';
import Tree from './components/tree';

const treeData: TreeData[] = [
  {
    key: '1',
    name: 'Tree Node 1',
    checked: false,
    expand: true,
    children: [
      {
        key: '1-1',
        name: 'Tree Node 1-1',
        checked: false,
        expand: true,
        children: [
          {
            key: '1-1-1',
            name: 'Tree Node 1-1-1',
            checked: false,
            expand: true,
          },
        ],
      },
      {
        key: '1-2',
        checked: true,
        expand: true,
        name: 'Tree Node 1-2',
        children: [
          {
            key: '2-1',
            name: 'Tree Node 2-1',
            checked: false,
            expand: true,
          },
          {
            key: '2-2',
            name: 'Tree Node 2-2',
            checked: false,
            expand: true,
            children: [
              {
                key: '2-2-1',
                name: 'Tree Node 2-1',
                checked: false,
                expand: true,
              },
            ],
          },
        ],
      },
    ],
  },
];

function App() {
  return (
    <>
      <div
        style={{
          width: '300px',
          border: '1px solid #222',
        }}
      >
        <Tree data={treeData}></Tree>
      </div>
    </>
  );
}

export default App;
