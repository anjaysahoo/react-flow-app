import React, { useState } from 'react';
import {useStore} from "../store";
import {Handle, Position} from "reactflow";

const isValidVariableName = (name) => {
    return /^[a-zA-Z_$][a-zA-Z_$0-9]*$/.test(name);
};

const extractVariables = (text) => {
    const regex = /{{\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\s*}}/g;
    const variables = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
        variables.push(match[1]);
    }
    return variables;
};

const TemplateNode = ({ id, config }) => {
    const [handles, setHandles] = useState({});
    const [textAreaHeight, setTextAreaHeight] = useState(0);
    const [formValues, setFormValues] = useState(() =>
        config.reduce((acc, field) => {
            acc[field.name] = field.value || '';
            return acc;
        }, {})
    );

    const handleChange = (e, fieldName) => {
        const newValues = {
            ...formValues,
            [fieldName]: e.target.value,
        };
        setFormValues(newValues);
        updateNodeField(id, fieldName, e.target.value)
    };

    const handleTextareaChange = (e, fieldName) => {
        const textarea = e.target;
        textarea.style.height = 'auto'; // Reset the height
        textarea.style.height = `${textarea.scrollHeight}px`; // Set it to the scroll height
        setTextAreaHeight(textarea.scrollHeight);

        handleChange(e, fieldName);

        const newHandles = extractVariables(textarea.value).reduce((acc, variable) => {
            if (isValidVariableName(variable)) {
                acc[variable] = true;
            }
            return acc;
        }, {});

        setHandles((prevHandles) => {
            const updatedHandles = { ...prevHandles };
            Object.keys(prevHandles).forEach((key) => {
                if (!newHandles[key]) {
                    delete updatedHandles[key];
                }
            });
            Object.keys(newHandles).forEach((key) => {
                if (!prevHandles[key]) {
                    updatedHandles[key] = true;
                }
            });
            return updatedHandles;
        });
    };

    const updateNodeField = useStore((state) => state.updateNodeField);

    const renderField = (field) => {
        switch (field.type) {
            case 'text':
                return (
                    <div key={field.name}>
                        <label>{field.label}</label>
                        <textarea
                            value={formValues[field.name]}
                            onChange={(e) => handleTextareaChange(e, field.name)}
                            style={{ width: '90%', overflow: 'auto', resize: 'none', maxHeight: '300px' }}
                        />
                        {Object.keys(handles).map((variable, index) => (
                            <Handle
                                key={variable}
                                type="source"
                                position={Position.Left}
                                id={`${field.name}-${variable}`}
                                style={{ top: `${(textAreaHeight / (Object.keys(handles).length + 1)) * (index + 1)}px` }}
                            />
                        ))}
                    </div>
                );
            case 'select':
                return (
                    <div key={field.name}>
                        <label>{field.label}
                        <select
                            value={formValues[field.name]}
                            onChange={(e) => handleChange(e, field.name)}
                        >
                            {field.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        </label>
                    </div>
                );
            case 'radio':
                return (
                    <div key={field.name}>
                        <label>{field.label}</label>
                        {field.options.map((option) => (
                            <label key={option.value}>
                                <input
                                    type="radio"
                                    name={field.name}
                                    value={option.value}
                                    checked={formValues[field.name] === option.value}
                                    onChange={(e) => handleChange(e, field.name)}
                                />
                                {option.label}
                            </label>
                        ))}
                    </div>
                );
            default:
                return (
                    <div key={field.name}>
                        <div>
                            <span>{formValues[field.name]}</span>
                        </div>
                    </div>
                );
        }
    };

    return <form>{config.map(renderField)}</form>;
};

export default TemplateNode;
