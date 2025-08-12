import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Editor } from '@tinymce/tinymce-react';

// --- Componentes de estilo (com adição do RemoveButton) ---
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

const SuccessButton = styled(Button)`
  background: var(--success-color, #34a853);

  &:hover {
    background: var(--success-hover, #2d8e47);
  }
`;

// ✅ ALTERADO: Botão específico para remover chaves
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

const OutputSection = styled.div`
  background: var(--output-bg, white);
  border: 1px solid var(--border-color, #e8eaed);
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
  width: 100%;
`;

const OutputTitle = styled.h3`
  font-size: 1.3rem;
  color: var(--text-primary, #202124);
  margin-bottom: 1rem;
`;

const OutputContent = styled.div`
  background: var(--card-bg, #f8f9fa);
  border: 1px solid var(--border-color, #e8eaed);
  border-radius: 6px;
  padding: 1rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  color: var(--text-primary, #202124);
  white-space: pre-wrap;
  word-break: break-word;
  max-height: 300px;
  overflow-y: auto;
`;

const InfoSection = styled.div`
  background: var(--info-bg, #e8f0fe);
  border: 1px solid var(--info-border, #dadce0);
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1.5rem;
  width: 100%;
`;

const InfoTitle = styled.h3`
  font-size: 1.2rem;
  color: var(--info-text, #1a73e8);
  margin-bottom: 1rem;
`;

const InfoText = styled.p`
  color: var(--text-secondary, #5f6368);
  line-height: 1.6;
  margin-bottom: 0.5rem;
`;

const MainLayout = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const LeftColumn = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 0; 
`;

const RightColumn = styled.div`
  flex: 1;
  position: sticky;
  top: 1rem;
  min-width: 0;
`;


const Automate = () => {
  const [content, setContent] = useState('');
  const [htmlOutput, setHtmlOutput] = useState('');
  const [textOutput, setTextOutput] = useState('');
  // ✅ ALTERADO: O estado agora controla objetos com id, key e value
  const [textKeys, setTextKeys] = useState([{ id: 1, key: 'exemplo', value: 'mundo' }]);
  const [replacedContent, setReplacedContent] = useState('');

  // ✅ REMOVIDO: A função `extractTextKeys` não é mais necessária.

  // ✅ ALTERADO: O useEffect agora é mais simples.
  // Ele apenas recalcula o conteúdo quando o texto do editor ou a lista de chaves muda.
  useEffect(() => {
    let result = content;
    textKeys.forEach(({ key, value }) => {
      // A substituição só acontece se a chave tiver um nome
      if (key.trim()) {
        const regex = new RegExp(`\\|\\|${key}\\|\\|`, 'g');
        result = result.replace(regex, value);
      }
    });
    setReplacedContent(result);
  }, [content, textKeys]);


  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  // ✅ NOVO: Função para adicionar uma nova chave vazia à lista
  const handleAddNewKey = () => {
    setTextKeys(prevKeys => [
      ...prevKeys,
      { id: Date.now(), key: '', value: '' } // Usa timestamp como ID único
    ]);
  };
  
  // ✅ NOVO: Função para remover uma chave pelo seu ID
  const handleRemoveKey = (idToRemove) => {
    setTextKeys(prevKeys => prevKeys.filter(key => key.id !== idToRemove));
  };

  // ✅ ALTERADO: Função para atualizar o nome ou o valor de uma chave
  const handleTextKeyChange = (id, field, newValue) => {
    setTextKeys(prevKeys => 
      prevKeys.map(key => 
        key.id === id ? { ...key, [field]: newValue } : key
      )
    );
  };

  const getHtmlContent = () => {
    setHtmlOutput(replacedContent || content);
  };

  const getTextContent = () => {
    const textToProcess = replacedContent || content;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = textToProcess;
    setTextOutput(tempDiv.textContent || tempDiv.innerText || '');
  };

  const clearAll = () => {
    setContent('');
    setHtmlOutput('');
    setTextOutput('');
    setTextKeys([]);
    setReplacedContent('');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Conteúdo copiado para a área de transferência!');
    });
  };

  return (
    <Container>
      <Title>🤖 Ferramenta de Automação de Texto</Title>
      {/* ✅ ALTERADO: Descrição reflete o novo fluxo de trabalho */}
      <Description>
        Adicione suas chaves de texto no painel à direita, defina seus valores e depois use o padrão `||nome-da-chave||` no editor para criar conteúdo personalizado.
      </Description>

      <MainLayout>
        <LeftColumn>
          <EditorContainer>
            <EditorTitle>📝 Editor Principal</EditorTitle>
            <Editor
              apiKey="SUA_CHAVE_API_AQUI"
              value={content}
              onEditorChange={handleEditorChange}
              init={{
                height: 400,
                menubar: true,
                plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount',
                toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
              }}
            />
          </EditorContainer>

          <PreviewContainer hasContent={!!(replacedContent || content)}>
            <PreviewTitle>👁️ Pré-visualização em Tempo Real</PreviewTitle>
            <Editor
              tinymceScriptSrc='/tinymce/tinymce.min.js'
              licenseKey='gpl'
              value={replacedContent || content}
              disabled={true}
              init={{
                height: 300,
                menubar: false,
                toolbar: false,
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; background-color: #f8f9fa; }',
                statusbar: false
              }}
            />
          </PreviewContainer>

           <ButtonGroup>
              <Button onClick={getHtmlContent} disabled={!content.trim()}>
                📄 Obter HTML
              </Button>
              <Button onClick={getTextContent} disabled={!content.trim()}>
                📝 Obter Texto Puro
              </Button>
              <SecondaryButton onClick={clearAll}>
                🗑️ Limpar Tudo
              </SecondaryButton>
            </ButtonGroup>

          {htmlOutput && ( <OutputSection>...</OutputSection> )}
          {textOutput && ( <OutputSection>...</OutputSection> )}
        </LeftColumn>

        <RightColumn>
          <TextKeysSection>
            <TextKeysTitle>🔑 Gerenciador de Chaves</TextKeysTitle>
            <Button onClick={handleAddNewKey} style={{width: '100%'}}>+ Adicionar Nova Chave</Button>

            <TextKeysList>
              {textKeys.map(({ id, key, value }) => (
                // ✅ ALTERADO: Layout para cada item da chave
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
          </TextKeysSection>

           <InfoSection>
            {/* ✅ ALTERADO: Instruções refletem o novo fluxo */}
            <InfoTitle>ℹ️ Como Usar</InfoTitle>
            <InfoText>
              <strong>1. Adicione Chaves:</strong> Clique em "Adicionar Nova Chave" para criar um par de chave/valor.
            </InfoText>
            <InfoText>
              <strong>2. Defina os Nomes e Valores:</strong> No primeiro campo, dê um nome para sua chave (ex: `cliente`). No segundo, o valor que ela terá (ex: `Maria`).
            </InfoText>
            <InfoText>
              <strong>3. Use no Editor:</strong> Escreva seu texto no editor principal e insira suas chaves usando o formato `||nome-da-chave||`. Exemplo: `Olá, ||cliente||!`
            </InfoText>
            <InfoText>
              <strong>4. Visualize e Exporte:</strong> A pré-visualização mostrará o resultado final. Use os botões para obter o código HTML ou texto puro.
            </InfoText>
          </InfoSection>
        </RightColumn>
      </MainLayout>
    </Container>
  );
};

export default Automate;