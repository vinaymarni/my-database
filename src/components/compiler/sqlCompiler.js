import React, { useState, useEffect, useRef } from 'react';
import { Editor, useMonaco } from '@monaco-editor/react';
import './sqlCompiler.css';

const SqlCompiler = () => {
  const [code, setCode] = useState('SELECT * FROM users;');
  const [errors, setErrors] = useState([]);
  const [hoverError, setHoverError] = useState(null); // To store the error being hovered over
  const monaco = useMonaco(); // Get Monaco instance
  const editorRef = useRef(null); // Store the editor instance

  useEffect(() => {
    if (!monaco) return; // Ensure Monaco is loaded before doing anything
  }, [monaco]); // This effect runs only when Monaco is loaded

  const handleRunCode = () => {
    alert('SQL Code Executed:\n' + code);
  };

  const handleEditorDidChangeModelContent = (editor) => {
    const model = editor.getModel();
    if (model) {
      const markers = monaco.editor.getModelMarkers({ model });
      setErrors(markers); // Set errors to the state
    }
  };

  const handleEditorMount = (editor) => {
    editorRef.current = editor; // Save the editor instance
    // Subscribe to the model content change event to check for syntax errors
    editor.onDidChangeModelContent((event) => {
      handleEditorDidChangeModelContent(editor); // Call the function here to handle the content change
    });

    // Add hover event to display error message on hover
    editor.onMouseMove((event) => {
      if (editor) {
        try {
          const model = editor.getModel();
          if (model) {
            const hover = editor.getPosition();
            if (hover) {
              const markers = monaco.editor.getModelMarkers({ model });
              const marker = markers.find(
                (m) =>
                  m.startLineNumber === hover.lineNumber &&
                  m.startColumn === hover.column
              );

              if (marker) {
                // Safely handle the message to ensure it's a string
                setHoverError(String(marker.message || 'Unknown error')); // Use String() to convert to a string if necessary
              } else {
                setHoverError(null); // Reset when not hovering over an error
              }
            }
          }
        } catch (error) {
          console.error('Error in onMouseMove event handler:', error);
        }
      }
    });
  };

  if (!monaco) {
    // Monaco is not yet loaded, we can display a loading spinner or message
    return <div>Loading Monaco Editor...</div>;
  }

  return (
    <div className='SqlCompilerPad'>
      <div className='SqlCompilerToolBar'>
        <button className='SqlCompilerRunBtn' onClick={handleRunCode}>
          Run
        </button>
      </div>
      <Editor
        height="300px"
        language="sql"
        value={code}
        onChange={(value) => setCode(value)} // Update code state when editor content changes
        onMount={handleEditorMount} // Initialize the editor
      
      />
      {hoverError && (
        <div
          style={{
            position: 'absolute',
            backgroundColor: '#fff',
            padding: '5px',
            border: '1px solid #ccc',
            borderRadius: '3px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            zIndex: '9999',
            top: '80px', // Adjust the positioning of the hover tooltip
            left: '20px',
          }}
        >
          <strong>Error:</strong> {hoverError}
        </div>
      )}
      {errors && errors.length > 0 && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          <h4>Syntax Errors:</h4>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>
                {error.message} at line {error.startLineNumber}, column {error.startColumn}
              </li>
            ))}
          </ul>
        </div>
      )}
      
    </div>
  );
};

export default SqlCompiler;
