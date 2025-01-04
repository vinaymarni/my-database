import React, { useState, useEffect, useRef } from 'react';
import { Editor, useMonaco } from '@monaco-editor/react';
import './sqlCompiler.css';

const SqlCompiler = () => {
  const [code, setCode] = useState('SELECT * FROM users;');
  const [errors, setErrors] = useState([]);
  const [hoverError, setHoverError] = useState(null);
  const monaco = useMonaco();
  const editorRef = useRef(null);

  useEffect(() => {
    if (!monaco) return;
  }, [monaco]);

  const handleRunCode = () => {
    console.log(code);
  };

  const handleEditorDidChangeModelContent = (editor) => {
    const model = editor.getModel();
    if (model) {
      const markers = monaco.editor.getModelMarkers({ model });
      setErrors(markers); // Set errors to the state
    }
  };

  const handleEditorMount = (editor) => {
    editorRef.current = editor; 
    // Subscribe to the model content change event to check for syntax errors
    editor.onDidChangeModelContent((event) => {
      handleEditorDidChangeModelContent(editor);
    });

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
                setHoverError(String(marker.message || 'Unknown error'));
              } else {
                setHoverError(null); 
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
        onChange={(value) => setCode(value)}
        onMount={handleEditorMount} 
        className='EditorPad'
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
