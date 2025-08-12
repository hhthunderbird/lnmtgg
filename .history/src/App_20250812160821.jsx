import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Editor } from '@tinymce/tinymce-react';

// --- Componentes de estilo permanecem os mesmos ---
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
  max-width: 600px;
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
  margin-bottom: 1rem;
`;

const TextKeyItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--output-bg, white);
  border: 1px solid var(--border-color, #e8eaed);
  border-radius: 8px;
`;

const TextKeyLabel = styled.span`
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  background: var(--primary-color, #1a73e8);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  min-width: 120px;
  text-align: center;
`;

const TextKeyInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--border-color, #e8eaed);
  border-radius: 4px;
  font-size: 1rem;
  background: var(--input-bg, white);
  color: var(--text-primary, #202124);

  &:focus {
    outline: none;
    border-color: var(--primary-color, #1a73e8);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
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

const NoKeysMessage = styled.p`
  text-align: center;
  color: var(--text-secondary, #5f6368);
  font-style: italic;
  padding: 2rem;
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
  min-width: 100%; 
`;

const RightColumn = styled.div`
  flex: 1;
  position: sticky;
  top: 1rem;
  min-width: 10%;
`;


const Automate = () => {
  const [content, setContent] = useState('');
  const [htmlOutput, setHtmlOutput] = useState('');
  const [textOutput, setTextOutput] = useState('');
  const [textKeys, setTextKeys] = useState([]);
  const [replacedContent, setReplacedContent] = useState('');

  // ✅ ALTERADO: Expressão regular para encontrar ||key-name||
  const extractTextKeys = (text) => {
    // A regex /\|\|(.+?)\|\|/g encontra texto entre ||...||
    // \|\|: Procura pelos caracteres literais `||`. O `|` é escapado com `\`
    // (.+?): Captura qualquer caractere (`.`) uma ou mais vezes (`+`) de forma não-gulosa (`?`)
    const regex = /\|\|(.+?)\|\|/g;
    const keys = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      if (!keys.includes(match[1])) {
        keys.push(match[1]);
      }
    }
    return keys;
  };
  
  useEffect(() => {
    const extractedKeys = extractTextKeys(content);
    
    setTextKeys(prevKeys => {
      const existingKeyMap = new Map(prevKeys.map(k => [k.key, k.value]));
      return extractedKeys.map(key => ({
        key,
        value: existingKeyMap.get(key) || '',
      }));
    });

    let result = content;
    textKeys.forEach(({ key, value }) => {
      if (value.trim()) {
        // ✅ ALTERADO: Regex para substituir o padrão ||key-name||
        // Note que `|` precisa ser escapado duas vezes `\\|\\|` dentro de new RegExp
        const regex = new RegExp(`\\|\\|${key}\\|\\|`, 'g');
        result = result.replace(regex, value);
      }
    });
    setReplacedContent(result);

  }, [content, textKeys]);


  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  const handleTextKeyChange = (key, value) => {
    setTextKeys(prev =>
      prev.map(tk => (tk.key === key ? { ...tk, value } : tk))
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

  const clearContent = () => {
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
      <Description>
        {/* ✅ ALTERADO: Texto de exemplo atualizado */}
        Crie modelos usando chaves de texto como `||exemplo||` e preencha os valores para gerar conteúdo personalizado instantaneamente.
      </Description>

      <MainLayout>
        <LeftColumn>
        <InfoSection>
            <InfoTitle>ℹ️ Como Usar</InfoTitle>
            <InfoText>
              {/* ✅ ALTERADO: Texto de exemplo atualizado */}
              <strong>1. Crie o Modelo:</strong> Digite no editor e use o novo padrão para placeholders, como `||nome||` ou `||produto||`.
            </InfoText>
            <InfoText>
              <strong>2. Preencha os Valores:</strong> As chaves aparecerão aqui. Preencha os campos para cada uma delas.
            </InfoText>
            <InfoText>
              <strong>3. Visualize e Exporte:</strong> A pré-visualização é atualizada em tempo real. Ao terminar, clique para obter e copiar seu conteúdo final.
            </InfoText>
          </InfoSection>
          <EditorContainer>
            <EditorTitle>📝 Editor Principal</EditorTitle>
            <Editor
              tinymceScriptSrc='/tinymce/tinymce.min.js'
              licenseKey='gpl'
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
            <PreviewTitle>
              👁️ Pré-visualização em Tempo Real
            </PreviewTitle>
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
              <SecondaryButton onClick={clearContent} disabled={!content.trim()}>
                🗑️ Limpar Tudo
              </SecondaryButton>
            </ButtonGroup>

          {htmlOutput && (
            <OutputSection>
              <OutputTitle>🔍 Resultado em HTML:</OutputTitle>
              <OutputContent>{htmlOutput}</OutputContent>
              <ButtonGroup>
                <SuccessButton onClick={() => copyToClipboard(htmlOutput)}>
                  📋 Copiar HTML
                </SuccessButton>
              </ButtonGroup>
            </OutputSection>
          )}

          {textOutput && (
            <OutputSection>
              <OutputTitle>📝 Resultado em Texto Puro:</OutputTitle>
              <OutputContent>{textOutput}</OutputContent>
              <ButtonGroup>
                <SuccessButton onClick={() => copyToClipboard(textOutput)}>
                  📋 Copiar Texto
                </SuccessButton>
              </ButtonGroup>
            </OutputSection>
          )}

        </LeftColumn>

        <RightColumn>
          
            <TextKeysSection>
              <TextKeysTitle>🔑 Chaves de Texto Encontradas</TextKeysTitle>
              {textKeys.length > 0 ? (
                <TextKeysList>
                  {textKeys.map(({ key, value }) => (
                    <TextKeyItem key={key}>
                       {/* ✅ ALTERADO: Rótulo da chave atualizado */}
                      <TextKeyLabel>{`||${key}||`}</TextKeyLabel>
                      <TextKeyInput
                        type="text"
                        value={value}
                        onChange={(e) => handleTextKeyChange(key, e.target.value)}
                        placeholder={`Valor para ${key}`}
                      />
                    </TextKeyItem>
                  ))}
                </TextKeysList>
              ) : (
                <NoKeysMessage>
                  {/* ✅ ALTERADO: Texto de exemplo atualizado */}
                  Nenhuma chave encontrada. Use o padrão `||chave||` no editor.
                </NoKeysMessage>
              )}
            </TextKeysSection>
          
        </RightColumn>
      </MainLayout>

    </Container>
  );
};

export default Automate;