// inputNode.js

import TemplateNode from "./templateNode";

export const InputNode = ({ id, data }) => {

const formConfig = [
    { type: 'text', name: 'inputName', label: 'Name', value: data?.inputName || id.replace('customInput-', 'input_') ,
        validation: {
                maxLength: 15,
                specialCharactersAllowed: false,
        }
    },
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

    const outputHandles = [
        { type: 'value' },
    ]

  return (
      <TemplateNode
          label={'Input'}
          config={formConfig}
          id={id}
          outputHandles={outputHandles}
      />
  );
}
