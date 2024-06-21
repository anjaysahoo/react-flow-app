// inputNode.js

import { Handle, Position } from 'reactflow';
import TemplateNode from "./templateNode";

export const InputNode = ({ id, data }) => {

const formConfig = [
    { type: 'text', name: 'inputName', label: 'Name', value: data?.inputName || id.replace('customInput-', 'input_') },
    {
        type: 'select',
        name: 'inputType',
        label: 'Type',
        options: [
            { value: 'Text', label: 'Text' },
            { value: 'File', label: 'File' },
        ],
        value: data.inputType || 'File'
    }
];

  return (
    <div style={{width: 200, height: 80, border: '1px solid black'}}>
      <div>
        <span>Input</span>
      </div>
      <TemplateNode config={formConfig} id={id}/>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-value`}
      />
    </div>
  );
}
