// textNode.js

import { Handle, Position } from 'reactflow';
import TemplateNode from "./templateNode";

export const TextNode = ({ id, data }) => {
    const formConfig = [
        { type: 'text', name: 'text', label: 'Text', value: data?.text || '{{input}}' }
    ];

  return (
    <div style={{width: 200, height: 80, border: '1px solid black'}}>
      <div>
        <span>Text</span>
      </div>
        <TemplateNode config={formConfig} id={id}/>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
      />
    </div>
  );
}
