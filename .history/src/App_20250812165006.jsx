import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Editor } from '@tinymce/tinymce-react';
import { Rnd } from 'react-rnd';

// --- Componentes de estilo ---
const Container = styled.div`
  width: 100%;
  margin: 0;
  padding: 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: var(--primary-color, #1a73e8);
  margin-bottom: 1rem;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary, #5f6368);
  text-align: center;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  width: 80%;
  max-width: 1400px; /* Boa prática para evitar que fique largo demais em telas gigantes */
  margin-left: auto;
  margin-right: auto;
  `;
  
  const DraggablePanel = styled.div`
  // ... outros estilos
  display: flex;
  flex-direction: column; /* Organiza os filhos em coluna */
  height: 100%;           /* Ocupa 100% da altura do container <Rnd> */
`;

const PanelContent = styled.div`
  // ... outros estilos
  flex-grow: 1;         /* Permite que esta área cresça e ocupe o espaço disponível */
  overflow-y: auto;     /* Adiciona barra de rolagem se o conteúdo transbordar */
`;

const PanelHeader = styled.div`
  padding: 0.75rem 1rem;
  background-color: var(--primary-color, #1a73e8);
  color: white;
  font-weight: 500;
  cursor: grab;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:active {
    cursor: grabbing;
  }
`;

const PanelToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
`;


const EditorContainer = styled.div`
  background: var(--card-bg, #f8f9fa);
  border: 1px solid var(--border-color, #e8eaed);
  border-radius: 12px;
  padding: 1.5rem;
  width: 100%;
`;

const PreviewContainer = styled.div`
  background: var(--card-bg, #f8f9fa);
  border: 1px solid var(--border-color, #e8eaed);
  border-radius: 12px;
  padding: 1.5rem;
  width: 100%;
  opacity: ${props => props.hasContent ? '1' : '0.6'};
  transition: opacity 0.3s ease;
`;

const EditorTitle = styled.h2`
  font-size: 1.5rem;
  color: var(--text-primary, #202124);
  margin-bottom: 1rem;
`;

const PreviewTitle = styled.h2`
  font-size: 1.5rem;
  color: var(--text-primary, #202124);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TextKeysSection = styled.div`
  background: var(--card-bg, #f8f9fa);
  border: 1px solid var(--border-color, #e8eaed);
  border-radius: 12px;
  padding: 1.5rem;
  width: 100%;
`;

const TextKeysTitle = styled.h3`
  font-size: 1.3rem;
  color: var(--text-primary, #202124);
  margin-bottom: 1rem;
`;

const TextKeysList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const TextKeyItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TextKeyInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--border-color, #e8eaed);
  border-radius: 4px;
  font-size: 1rem;
  background: var(--input-bg, white);
  color: var(--text-primary, #202124);
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;

  &:focus {
    outline: none;
    border-color: var(--primary-color, #1a73e8);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: var(--primary-color, #1a73e8);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: var(--primary-hover, #1557b0);
  }

  &:disabled {
    background: var(--disabled-color, #ccc);
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled(Button)`
  background: var(--secondary-color, #5f6368);

  &:hover {
    background: var(--secondary-hover, #4a4d51);
  }
`;

const RemoveButton = styled.button`
  padding: 0.5rem;
  background-color: #fce8e6;
  color: #c5221f;
  border: 1px solid #fce8e6;
  border-radius: 50%;
  cursor: pointer;
  font-weight: bold;
  width: 32px;
  height: 32px;
  line-height: 1;
  
  &:hover {
    background-color: #f9ddda;
    border-color: #f9ddda;
  }
`;


const Automate = () => {
  const [content, setContent] = useState('');
  const [textKeys, setTextKeys] = useState(() => {
    try {
      const savedKeys = localStorage.getItem('textKeys');
      if (savedKeys && JSON.parse(savedKeys).length > 0) {
        return JSON.parse(savedKeys);
      }
    } catch (error) { console.error(error); }
    return [{ id: 1, key: 'exemplo', value: 'mundo' }];
  });
  const [replacedContent, setReplacedContent] = useState('');
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);

  useEffect(() => {
    localStorage.setItem('textKeys', JSON.stringify(textKeys));
  }, [textKeys]);
  
  useEffect(() => {
    let result = content;
    textKeys.forEach(({ key, value }) => {
      if (key.trim()) {
        const regex = new RegExp(`\\|\\|${key.trim()}\\|\\|`, 'g');
        result = result.replace(regex, value);
      }
    });
    setReplacedContent(result);
  }, [content, textKeys]);

  const handleEditorChange = (newContent) => setContent(newContent);
  const handleAddNewKey = () => setTextKeys(prev => [...prev, { id: Date.now(), key: '', value: '' }]);
  const handleRemoveKey = (id) => setTextKeys(prev => prev.filter(k => k.id !== id));
  const handleTextKeyChange = (id, field, value) => setTextKeys(prev => prev.map(k => k.id === id ? { ...k, [field]: value } : k));
  const clearAll = () => { setContent(''); setTextKeys([]); };

  return (
    <Container>
      <Title>🤖 Ferramenta de Automação de Texto</Title>
      <Description>
        Use o painel de chaves flutuante para gerenciar suas variáveis. Depois, use `||nome-da-chave||` no editor.
      </Description>
      
      <Rnd
        style={{ zIndex: 10000 }}
        default={{
          x: window.innerWidth - 470,
          y: 150,
          width: 450,
          height: 500,
        }}
        minWidth={300}
        minHeight={isPanelCollapsed ? 55 : 300}
        maxHeight={"80vh"}
        bounds="window"
        dragHandleClassName="panel-header"
        className="rnd-container"
      >
        <DraggablePanel>
          <PanelHeader className="panel-header">
            <span>🔑 Gerenciador de Chaves</span>
            <PanelToggleButton onClick={() => setIsPanelCollapsed(!isPanelCollapsed)}>
              {isPanelCollapsed ? '⊕' : '−'}
            </PanelToggleButton>
          </PanelHeader>

          {!isPanelCollapsed && (
            <PanelContent>
              <Button onClick={handleAddNewKey} style={{width: '100%'}}>+ Adicionar Nova Chave</Button>
              <TextKeysList>
                {textKeys.map(({ id, key, value }) => (
                  <TextKeyItem key={id}>
                    <TextKeyInput
                      type="text"
                      value={key}
                      onChange={(e) => handleTextKeyChange(id, 'key', e.target.value)}
                      placeholder="nome-da-chave"
                    />
                    <TextKeyInput
                      type="text"
                      value={value}
                      onChange={(e) => handleTextKeyChange(id, 'value', e.target.value)}
                      placeholder="Valor"
                    />
                    <RemoveButton onClick={() => handleRemoveKey(id)}>×</RemoveButton>
                  </TextKeyItem>
                ))}
              </TextKeysList>
            </PanelContent>
          )}
        </DraggablePanel>
      </Rnd>

      <MainContent>
        <EditorContainer>
          <EditorTitle>📝 Editor Principal</EditorTitle>
          <Editor
            tinymceScriptSrc='/tinymce/tinymce.min.js'
          licenseKey='gpl'
            value={content}
            onEditorChange={handleEditorChange}
            init={{
              height: 500,
              menubar: true,
              plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount',
              toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
            }}
          />
        </EditorContainer>
        <PreviewContainer hasContent={!!(replacedContent || content)}>
           <PreviewTitle>👁️ Pré-visualização em Tempo Real</PreviewTitle>
           <Editor
              tinymceScriptSrc='/tinymce/tinymce.min.js'
          licenseKey='gpl'
              disabled={true}
              value={replacedContent || content}
              init={{ height: 300, menubar: false, toolbar: false, statusbar: false }}
           />
        </PreviewContainer>
        <ButtonGroup>
            <Button onClick={() => { /* lógica getHtmlContent */ }} disabled={!content.trim()}>📄 Obter HTML</Button>
            <Button onClick={() => { /* lógica getTextContent */ }} disabled={!content.trim()}>📝 Obter Texto Puro</Button>
            <SecondaryButton onClick={clearAll}>🗑️ Limpar Tudo</SecondaryButton>
        </ButtonGroup>
      </MainContent>

    </Container>
  );
};

export default Automate;