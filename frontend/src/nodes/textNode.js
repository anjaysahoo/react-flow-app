// textNode.js

import TemplateNode from "../lib/template-node/templateNode";

export const TextNode = ({ id, data }) => {
    const formConfig = [
        { type: 'textArea', name: 'text', label: 'Text', value: data?.text || '{{input}}' }
    ];

    const outputHandles = [
        { type: 'output' },
    ]

    return (
        <TemplateNode
            label={'Text'}
            config={formConfig}
            id={id}
            outputHandles={outputHandles}
        />
    );
}
