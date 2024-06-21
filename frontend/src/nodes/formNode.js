import TemplateNode from "./templateNode";
import {Handle, Position} from "reactflow";

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

    return (
        <div style={{width: 200, height: 80, border: '1px solid black'}}>
            <div>
                <span>Form</span>
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
