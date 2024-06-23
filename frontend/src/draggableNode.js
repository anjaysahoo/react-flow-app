// draggableNode.js

import Icon from "./lib/icon";
import React from "react";
import {inputIcon} from "./utils/app-icon.util";
import classes from "./draggableNode.module.css";

export const DraggableNode = ({ type, label, icon }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={classes["draggable-node"]}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        draggable
      >
          <Icon d={icon} color={'#7d838e' }  size={"1em"}/>
          <span style={{ color: '#7d838e', fontSize: '0.8em',  }}>{label}</span>
      </div>
    );
  };
