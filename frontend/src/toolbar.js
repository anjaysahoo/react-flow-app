// toolbar.js

import { DraggableNode } from './draggableNode';
import classes from './toolbar.module.css';
import {formIcon, inputIcon, llmIcon, outputIcon, textIcon} from "./utils/app-icon.util";

export const PipelineToolbar = () => {

    return (
        <div className={classes["tool-bar"]}>
                <DraggableNode type='customInput' label='Input' icon={inputIcon} />
                <DraggableNode type='llm' label='LLM' icon={llmIcon} />
                <DraggableNode type='customOutput' label='Output' icon={outputIcon} />
                <DraggableNode type='text' label='Text' icon={textIcon} />
                <DraggableNode type='form' label='Form' icon={formIcon} />
        </div>
    );
};
