import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Editor } from '@tinymce/tinymce-react';
import { Rnd } from 'react-rnd';
import { useUsageTracker } from './useUsageTracker'; // ✅ Importando o hook

// --- Styled Components (sem alterações) ---
const PreviewContentArea = styled.div`
  background-color: #f8f9fa;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  border: 1px solid #e8eaed;
  min-height: 300px;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.6;
  color: #202124;
  h1, h2, h3, h4, h5, h6 { margin-top: 1.5em; margin-bottom: 0.5em; }
  p { margin: 0 0 1em 0; }
  ul, ol { padding-left: 30px; margin-bottom: 1em; }
  li { margin-bottom: 0.5em; }
  a { color: #1a73e8; text-decoration: underline; }
  strong { font-weight: bold; }
  em { font-style: italic; }
  blockquote { border-left: 3px solid #ccc; padding-left: 1rem; margin-left: 0; font-style: italic; }
`;
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
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
`;
const DraggablePanel = styled.div`
  background: var(--card-bg, #f8f9fa);
  border: 1px solid var(--border-color, #e8eaed);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
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
const PanelContent = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
  flex-grow: 1; 
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
  opacity: ${props => props.$hasContent ? '1' : '0.6'};
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

function decodeHtmlEntities(text) {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
}

const Automate = () => {
  const [content, setContent] = useState('');
  const [textKeys, setTextKeys] = useState(() => {
    try {
      const savedKeys = localStorage.getItem('textKeys');
      return savedKeys ? JSON.parse(savedKeys) : [{ id: 1, key: 'exemplo', value: 'mundo' }];
    } catch (error) { return [{ id: 1, key: 'exemplo', value: 'mundo' }]; }
  });
  const [replacedContent, setReplacedContent] = useState('');
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [panelSize, setPanelSize] = useState({ width: 450, height: 500 });
  const [lastPanelHeight, setLastPanelHeight] = useState(500);

  // ✅ Utilizando o hook de rastreamento de uso
  const { remainingUses, isLimitReached, trackUsage } = useUsageTracker();

  useEffect(() => {
    localStorage.setItem('textKeys', JSON.stringify(textKeys));
  }, [textKeys]);
  
  useEffect(() => {
    const decodedContent = decodeHtmlEntities(content);
    const normalizedContent = decodedContent.normalize('NFC');
    let result = normalizedContent;

    textKeys.forEach(({ key, value }) => {
      const trimmedKey = key.trim();
      if (trimmedKey) {
        const normalizedKey = trimmedKey.normalize('NFC');
        const searchString = `[[${normalizedKey}]]`;
        result = result.split(searchString).join(value);
      }
    });
    
    setReplacedContent(result);
  }, [content, textKeys]);

  const handleEditorChange = (newContent) => setContent(newContent);
  const handleAddNewKey = () => setTextKeys(prev => [...prev, { id: Date.now(), key: '', value: '' }]);
  const handleRemoveKey = (id) => setTextKeys(prev => prev.filter(k => k.id !== id));
  const handleTextKeyChange = (id, field, value) => setTextKeys(prev => prev.map(k => k.id === id ? { ...k, [field]: value } : k));
  const clearAll = () => { setContent(''); setTextKeys([]); };

  const togglePanelCollapse = () => {
    if (isPanelCollapsed) {
      setPanelSize(prevSize => ({ ...prevSize, height: lastPanelHeight }));
    } else {
      setLastPanelHeight(panelSize.height);
      setPanelSize(prevSize => ({ ...prevSize, height: 55 }));
    }
    setIsPanelCollapsed(!isPanelCollapsed);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Conteúdo copiado para a área de transferência!');
    }).catch(err => {
      console.error('Falha ao copiar texto: ', err);
    });
  };

  const handleGetPlainText = () => {
    // ✅ Verificação de limite de uso
    if (!trackUsage()) {
        alert(`Você atingiu seu limite de 5 usos gratuitos por hora. Tente novamente mais tarde!`);
        return;
    }
    const textToProcess = replacedContent || content;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = textToProcess;
    const plainText = tempDiv.textContent || tempDiv.innerText || '';
    copyToClipboard(plainText);
  };

  const handleGetHtml = () => {
    // ✅ Verificação de limite de uso
    if (!trackUsage()) {
        alert(`Você atingiu seu limite de 5 usos gratuitos por hora. Tente novamente mais tarde!`);
        return;
    }
    const htmlToCopy = replacedContent || content;
    copyToClipboard(htmlToCopy);
  }

  return (
    <Container>
      <Title>🤖 Ferramenta de Automação de Texto</Title>
      <Description>
        Use o painel de chaves flutuante para gerenciar suas variáveis. Depois, use `[[nome-da-chave]]` no editor.
      </Description>
      
      {/* ✅ Exibindo os usos restantes para o usuário */}
      <div style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.1rem', color: isLimitReached ? 'red' : 'inherit' }}>
        <p>Usos gratuitos restantes nesta hora: <strong>{remainingUses}</strong></p>
      </div>

      <Rnd
        style={{ zIndex: 10000 }}
        size={panelSize}
        onResizeStop={(e, direction, ref, delta, position) => {
          setPanelSize({
            width: parseInt(ref.style.width, 10),
            height: parseInt(ref.style.height, 10),
          });
        }}
        position={{ x: window.innerWidth - (panelSize.width || 450) - 20, y: 150 }}
        minWidth={300}
        minHeight={55}
        maxHeight={"80vh"}
        bounds="window"
        dragHandleClassName="panel-header"
        cancel=".panel-content-area"
      >
        <DraggablePanel>
          <PanelHeader className="panel-header">
            <span>🔑 Gerenciador de Chaves</span>
            <PanelToggleButton onClick={togglePanelCollapse}>
              {isPanelCollapsed ? '⊕' : '−'}
            </PanelToggleButton>
          </PanelHeader>

          {!isPanelCollapsed && (
            <PanelContent className="panel-content-area">
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
            // ✅ CORRIGIDO: Usando apiKey para estabilidade
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
        
        <PreviewContainer $hasContent={!!(replacedContent || content)} disabled={isLimitReached}>
           <PreviewTitle>👁️ Pré-visualização em Tempo Real (Sem Custo)</PreviewTitle>
           <PreviewContentArea 
             dangerouslySetInnerHTML={{ __html: replacedContent || content }} 
           />
        </PreviewContainer>

        <ButtonGroup>
            {/* Adicionado botão para copiar HTML e desabilitado quando o limite é atingido */}
            <Button onClick={handleGetPlainText} disabled={!content.trim() || isLimitReached}>📝 Copiar Texto</Button>
            <SecondaryButton onClick={clearAll}>🗑️ Limpar Tudo</SecondaryButton>
        </ButtonGroup>
      </MainContent>
    </Container>
  );
};

export default Automate;