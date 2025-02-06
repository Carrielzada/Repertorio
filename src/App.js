import React from 'react';
import DraftEditor from './components/DraftEditor';
import "./styles.css"

function App() {
  return (
    <div className="app-container">
      <h1 className="editor-header">Editor de Rascunho</h1>
      <DraftEditor />
    </div>
  );
}

export default App;