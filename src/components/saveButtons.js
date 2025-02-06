export default function SaveButtons({ saveDraft, exportToPDF }) {
  return (
    <div className="save-buttons">
      <button onClick={saveDraft} className="button button-primary">
        Salvar Rascunho
      </button>
      <button onClick={exportToPDF} className="button export-button">
        Exportar para PDF
      </button>
    </div>
  );
}