// llmNode.js

import TemplateNode from "../lib/template-node/templateNode";

export const LLMNode = ({ id, data }) => {

    const formConfig = [
        { type: 'plain', name: 'llm', value: 'This is a LLM.' },
    ];

    const inputHandles = [
        { type: 'system' },
        { type: 'prompt' }
    ]

    const outputHandles = [
        { type: 'response' },
    ]

  return (
          <TemplateNode
              label={'LLM'}
              config={formConfig}
              id={id}
              inputHandles={inputHandles}
              outputHandles={outputHandles}
          />
  );
}
