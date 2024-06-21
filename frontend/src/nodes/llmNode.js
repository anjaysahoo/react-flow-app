// llmNode.js

import { Handle, Position } from 'reactflow';
import TemplateNode from "./templateNode";

export const LLMNode = ({ id, data }) => {

    const formConfig = [
        { type: 'plain', name: 'llm', value: 'This is a LLM.' },
    ];

  return (
      <div style={{width: 200, height: 80, border: '1px solid black'}}>
          <div>
              <span>LLM</span>
          </div>
          <TemplateNode config={formConfig} id={id}/>
          <Handle
              type="target"
              position={Position.Left}
              id={`${id}-system`}
              style={{top: `${100 / 3}%`}}
          />
          <Handle
              type="target"
              position={Position.Left}
              id={`${id}-prompt`}
              style={{top: `${200 / 3}%`}}
          />
          <Handle
              type="source"
              position={Position.Right}
              id={`${id}-response`}
          />
      </div>
  );
}
