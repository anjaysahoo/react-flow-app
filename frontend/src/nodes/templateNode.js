import React, { useState } from 'react';
import {useStore} from "../store";
import {Handle, Position} from "reactflow";
import {extractVariables, isValidVariableName} from "../utils/valid-variable-helper.util";
import validateTextUtil from "../utils/validate-text.util";


const TemplateNode = ({ label, id, config, inputHandles=[], outputHandles=[] }) => {
    const [handles, setHandles] = useState({});
    const [textAreaHeight, setTextAreaHeight] = useState(0);
    const [errors, setErrors] = useState({});
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

    const handleTextChange = (e, fieldName, rules) => {
        handleChange(e, fieldName);

        const error = validateTextUtil(e.target.value, rules);
        setErrors({
            ...errors,
            [fieldName]: error,
        });
    }
    const handleTextareaChange = (e, fieldName) => {
        const textarea = e.target;
        textarea.style.height = 'auto'; // Reset the height
        textarea.style.height = `${textarea.scrollHeight}px`; // Set it to the scroll height
        setTextAreaHeight(textarea.scrollHeight);

        handleChange(e, fieldName);

        updateHandle(textarea.value);
    };

    const updateHandle = (value) => {
        const newHandles = extractVariables(value).reduce((acc, variable) => {
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
    }

    const updateNodeField = useStore((state) => state.updateNodeField);

    const renderField = (field) => {

        const rules = field.validation || {};

        switch (field.type) {
            case 'text':
                return (
                    <div key={field.name}>
                        <label>{field.label}</label>
                        <input
                            type="text"
                            value={formValues[field.name]}
                            onChange={(e) => handleTextChange(e, field.name, rules)}
                        />
                        {errors[field.name] && <span style={{ color: 'red' }}>{errors[field.name]}</span>}
                    </div>
                );
            case 'textArea':
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

    return(
        <div style={{width: 200, height: 80, border: '1px solid black'}}>
            <div>
                <span>{label}</span>
            </div>
            <form>{config.map(renderField)}</form>
            {inputHandles.map((inputHandle, index) => (
                <Handle
                    key={index}
                    type="target"
                    position={Position.Left}
                    id={`${id}-${inputHandle.type}`}
                    style={{top: `${(index + 1) * 50 / inputHandles.length}%`}}
                />
            ))}
            {outputHandles.map((outputHandle, index) => (
                <Handle
                    key={index}
                    type="source"
                    position={Position.Right}
                    id={`${id}-${outputHandle.type}`}
                    style={{top: `${(index + 1) * 50 / outputHandles.length}%`}}
                />
            ))}
        </div>
    )
}

export default TemplateNode;
