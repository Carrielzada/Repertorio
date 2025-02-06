import { useState } from 'react';
import Paragraph from './Paragraph';
import SaveButtons from './saveButtons';
import { jsPDF } from 'jspdf'; // Importando jsPDF

const DraftEditor = () => {
  const [paragraphs, setParagraphs] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [saveMessage, setSaveMessage] = useState('');

  const handleAddParagraph = () => {
    if (!currentInput.trim()) {
      alert('Por favor, insira um texto válido.');
      return;
    }

    if (editingId) {
      setParagraphs(paragraphs.map(p => 
        p.id === editingId ? { ...p, text: currentInput } : p
      ));
      setEditingId(null);
    } else {
      setParagraphs([
        ...paragraphs,
        { id: Date.now(), text: currentInput }
      ]);
    }
    setCurrentInput('');
  };

  const handleEdit = (id) => {
    const paragraph = paragraphs.find(p => p.id === id);
    if (paragraph) {
      setCurrentInput(paragraph.text);
      setEditingId(id);
    }
  };

  const handleDelete = (id) => {
    setParagraphs(paragraphs.filter(p => p.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setCurrentInput('');
    }
  };

  const handleSaveDraft = () => {
    const timestamp = new Date().toISOString();
    const draft = {
      id: timestamp,
      paragraphs,
      lastSaved: timestamp
    };
    console.log('Draft saved:', draft);
    setSaveMessage('Rascunho salvo com sucesso!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleExportToPDF = () => {
    const doc = new jsPDF();

 // Configurações do PDF
 doc.setFontSize(12);
 doc.setFont('helvetica', 'normal');
 let y = 20;
 const margin = 10;
 const lineHeight = 10;
 const pageHeight = doc.internal.pageSize.height;
 const paragraphIndent = 15;

 // Função para adicionar parágrafos justificados
 const addParagraph = (text) => {
   const maxWidth = doc.internal.pageSize.width - 2 * margin - paragraphIndent;

   // Quebra o texto
   const lines = doc.splitTextToSize(text, maxWidth);

   lines.forEach((line, lineIndex) => {
     if (y + lineHeight > pageHeight - margin) {
       doc.addPage();
       y = margin;
     }

     // Aplica recuo na primeira linha do parágrafo
     const x = margin + (lineIndex === 0 ? paragraphIndent : 0);

     // Justifica todas as linhas, exceto a última do parágrafo
     const isLastLine = lineIndex === lines.length - 1;
     const alignment = isLastLine ? 'left' : 'justify';

     doc.text(line, x, y, {
       maxWidth: maxWidth + (lineIndex === 0 ? paragraphIndent : 0), 
       align: alignment
     });

     y += lineHeight;
   });

   y += lineHeight;
 };

 paragraphs.forEach((paragraph) => {
   addParagraph(paragraph.text);
 });

 doc.save('redacao_enem.pdf');
};

  return (
    <div className="editor-container">
      <textarea
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
        placeholder="Digite seu parágrafo aqui..."
        className="textarea"
      />
      
      <div className="button-group">
        <button
          onClick={handleAddParagraph}
          className="button button-primary"
        >
          {editingId ? 'Atualizar Parágrafo' : 'Adicionar Parágrafo'}
        </button>
        <SaveButtons saveDraft={handleSaveDraft} exportToPDF={handleExportToPDF} />
      </div>

      {saveMessage && <div className="save-message">{saveMessage}</div>}

      <div className="paragraphs-container">
        {paragraphs.length === 0 ? (
          <div className="empty-state">
            <p>Comece adicionando seu primeiro parágrafo!</p>
          </div>
        ) : (
          paragraphs.map(p => (
            <Paragraph 
              key={p.id} 
              id={p.id} 
              text={p.text}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DraftEditor;