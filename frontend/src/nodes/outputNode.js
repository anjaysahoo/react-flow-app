// outputNode.js

import { Handle, Position } from 'reactflow';
import TemplateNode from "./templateNode";

export const OutputNode = ({ id, data }) => {

    const formConfig = [
        { type: 'text', name: 'outputName', label: 'Name', value: data?.outputName || id.replace('customOutput-', 'output_') },
        {
            type: 'select',
            name: 'outputType',
            label: 'Type',
            options: [
                { value: 'Text', label: 'Text' },
                { value: 'Image', label: 'Image' },
            ],
            value: data.outputType || 'Text',
        }
    ];

  return (
    <div style={{width: 200, height: 80, border: '1px solid black'}}>
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-value`}
      />
      <div>
        <span>Output</span>
      </div>
      <TemplateNode config={formConfig} id={id}/>
    </div>
  );
}
