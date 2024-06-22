import React from 'react';
import { useStore } from './store.js';
import axios from 'axios'; // Import axios for HTTP requests

const API_URL= "http://127.0.0.1:8000";
export function SubmitButton() {
    const { nodes, edges } = useStore();

    // Access node values
    const nodeValues = nodes.map((node) => node.data); // Extract data from each node

    // Access edge values (modify based on your edge structure)
    const edgeValues = edges.map((edge) => ({
        source: edge.source,
        target: edge.target,
        // Add other edge properties you want to access
    }));

    const handleSubmit = async () => {
        try {
            const response = await axios.post(API_URL + '/pipelines/parse', {
                    nodes: nodeValues,
                    edges: edgeValues
            });

            // Display alert on successful response
            alert(`
        Number of Nodes: ${response.data.num_nodes}
        Number of Edges: ${response.data.num_edges}
        Is DAG: ${response.data.is_dag}
      `);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            // Handle errors appropriately (e.g., display error message to user)
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button type="button" onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
}
