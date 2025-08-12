import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Editor } from '@tinymce/tinymce-react';
import SEO from '../components/SEO';

// --- (All existing styled-components from Container to NoKeysMessage remain the same) ---
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
  margin-top: 2rem;
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
  margin-top: 2rem;
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


// ✅ NEW STYLED COMPONENTS FOR LAYOUT
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
  min-width: 0; // Prevents flexbox overflow issues
`;

const RightColumn = styled.div`
  flex: 1;
  position: sticky;
  top: 1rem;
  min-width: 0; // Prevents flexbox overflow issues
`;


const Automate = () => {
  // --- (All state and functions remain the same) ---
  const [content, setContent] = useState('');
  const [htmlOutput, setHtmlOutput] = useState('');
  const [textOutput, setTextOutput] = useState('');
  const [textKeys, setTextKeys] = useState([]);
  const [replacedContent, setReplacedContent] = useState('');

  const extractTextKeys = (text) => {
    const regex = /\{\{([^}]+)\}\}/g;
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
    const currentTextKeys = textKeys.map(k => ({...k})); // use latest state
    currentTextKeys.forEach(({ key, value }) => {
      if (value.trim()) {
        const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
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
      console.log('Content copied to clipboard');
    });
  };

  return (
    <Container>
      <SEO
        title="Rich Text Editor with Text Key Replacement - Toolzilla"
        description="Powerful rich text editor with text key replacement functionality. Create templates and replace placeholders with custom content."
        keywords="rich text editor, text editor, content editor, TinyMCE, text key replacement, template editor"
      />

      <Title>🤖 Automation Tools</Title>
      <Description>
        Powerful automation tools to streamline your workflow. Create templates with text keys
        and replace them with custom content automatically.
      </Description>

      {/* ✅ MODIFIED JSX STRUCTURE FOR 2-COLUMN LAYOUT */}
      <MainLayout>
        <LeftColumn>
          <EditorContainer>
            <EditorTitle>📝 Rich Text Editor</EditorTitle>
            <Editor
              apiKey="YOUR_API_KEY" // Remember to use your actual API key
              value={content}
              onEditorChange={handleEditorChange}
              init={{
                height: 400,
                menubar: true,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
              }}
            />
            <ButtonGroup>
              <Button onClick={getHtmlContent} disabled={!content.trim()}>
                📄 Get HTML
              </Button>
              <Button onClick={getTextContent} disabled={!content.trim()}>
                📝 Get Plain Text
              </Button>
              <SecondaryButton onClick={clearContent}>
                🗑️ Clear All
              </SecondaryButton>
            </ButtonGroup>
          </EditorContainer>

          <PreviewContainer hasContent={!!replacedContent}>
            <PreviewTitle>
              👁️ Live Preview Editor
            </PreviewTitle>
            <Editor
              apiKey="YOUR_API_KEY"
              value={replacedContent || content}
              disabled={true}
              init={{
                height: 300,
                menubar: false,
                toolbar: false,
                plugins: 'preview',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; background-color: #f8f9fa; }',
                statusbar: false
              }}
            />
          </PreviewContainer>

          {htmlOutput && (
            <OutputSection>
              <OutputTitle>🔍 HTML Output:</OutputTitle>
              <OutputContent>{htmlOutput}</OutputContent>
              <ButtonGroup>
                <SuccessButton onClick={() => copyToClipboard(htmlOutput)}>
                  📋 Copy HTML
                </SuccessButton>
              </ButtonGroup>
            </OutputSection>
          )}

          {textOutput && (
            <OutputSection>
              <OutputTitle>📝 Plain Text Output:</OutputTitle>
              <OutputContent>{textOutput}</OutputContent>
              <ButtonGroup>
                <SuccessButton onClick={() => copyToClipboard(textOutput)}>
                  📋 Copy Text
                </SuccessButton>
              </ButtonGroup>
            </OutputSection>
          )}
        </LeftColumn>

        <RightColumn>
          {textKeys.length > 0 ? (
            <TextKeysSection>
              <TextKeysTitle>🔑 Text Keys Found: {textKeys.length}</TextKeysTitle>
              <TextKeysList>
                {textKeys.map(({ key, value }) => (
                  <TextKeyItem key={key}>
                    <TextKeyLabel>{`{{${key}}}`}</TextKeyLabel>
                    <TextKeyInput
                      type="text"
                      value={value}
                      onChange={(e) => handleTextKeyChange(key, e.target.value)}
                      placeholder={`Enter value for ${key}`}
                    />
                  </TextKeyItem>
                ))}
              </TextKeysList>
            </TextKeysSection>
          ) : (
            <TextKeysSection>
              <TextKeysTitle>🔑 Text Keys</TextKeysTitle>
              <NoKeysMessage>
                No text keys found. Use the pattern {'{{key}}'} in your text to create replaceable placeholders.
              </NoKeysMessage>
            </TextKeysSection>
          )}

           <InfoSection>
            <InfoTitle>ℹ️ How to Use</InfoTitle>
            <InfoText>
              <strong>1. Create Template:</strong> Type your content in the editor and use double curly braces for placeholders, like `{{name}}` or `{{product_name}}`.
            </InfoText>
            <InfoText>
              <strong>2. Fill Values:</strong> The keys will appear automatically on the right. Fill in the desired value for each key.
            </InfoText>
            <InfoText>
              <strong>3. Preview & Export:</strong> The "Live Preview" editor updates in real-time. When you're done, click "Get HTML" or "Get Plain Text" to export your final content.
            </InfoText>
          </InfoSection>
        </RightColumn>
      </MainLayout>

    </Container>
  );
};

export default Automate;