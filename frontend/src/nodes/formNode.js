import TemplateNode from "../lib/template-node/templateNode";
import {formIcon} from "../utils/app-icon.util";

export const FormNode = ({id, data}) => {
    const formConfig = [
        { type: 'text', name: 'username', label: 'Username', value: '' },
        {
            type: 'select',
            name: 'country',
            label: 'Country',
            options: [
                { value: 'usa', label: 'USA' },
                { value: 'canada', label: 'Canada' },
            ],
            value: data?.inputCountry,
        },
        {
            type: 'radio',
            name: 'gender',
            label: 'Gender',
            options: [
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
            ],
            value: 'male',
        },
    ];

    const outputHandles = [
        { type: 'value' },
    ]

    return (
        <TemplateNode
            label={'Form'}
            config={formConfig}
            id={id}
            outputHandles={outputHandles}
            icon={formIcon}
        />
    );
}
