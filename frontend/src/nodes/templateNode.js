import React, { useState } from 'react';
import {useStore} from "../store";

const TemplateNode = ({ id, config }) => {
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

    const updateNodeField = useStore((state) => state.updateNodeField);

    const renderField = (field) => {
        switch (field.type) {
            case 'text':
                return (
                    <div key={field.name}>
                        <label>{field.label}
                        <input
                            type="text"
                            value={formValues[field.name]}
                            onChange={(e) => handleChange(e, field.name)}
                        />
                        </label>
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
