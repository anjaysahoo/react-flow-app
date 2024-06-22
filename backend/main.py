from fastapi import FastAPI, Form
from typing import List, Dict
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with your frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (adjust as needed)
    allow_headers=["*"],  # Allow all headers (adjust as needed)
)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
def parse_pipeline(nodes: List[Dict], edges: List[Dict]):
    num_nodes = len(nodes)
    num_edges = len(edges)
    dag_status = is_dag(nodes, edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': dag_status,
    }



def is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    """
    Checks if the given nodes and edges form a Directed Acyclic Graph (DAG).

    This is a simplified implementation that assumes unique node IDs.
    """
    # Build a graph adjacency list
    graph = {node['id']: [] for node in nodes}
    for edge in edges:
        graph[edge['source']].append(edge['target'])

    def has_cycle(node, visited, visiting):
        visited.add(node)
        visiting.add(node)
        for neighbor in graph[node]:
            if neighbor in visiting:
                return True
            if neighbor not in visited and has_cycle(neighbor, visited, visiting):
                return True
        visiting.remove(node)
        return False

    # Check for cycles in the graph
    visited = set()
    for node in graph:
        if node not in visited:
            if has_cycle(node, visited, set()):
                return False
    return True
