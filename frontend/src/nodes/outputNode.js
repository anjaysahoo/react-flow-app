// outputNode.js

import TemplateNode from "../lib/template-node/templateNode";
import {outputIcon} from "../utils/app-icon.util";

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

    const inputHandles = [
        { type: 'value' },
    ]

    return (
        <TemplateNode
            label={'Output'}
            config={formConfig}
            id={id}
            inputHandles={inputHandles}
            icon={outputIcon}
        />
    );
}
