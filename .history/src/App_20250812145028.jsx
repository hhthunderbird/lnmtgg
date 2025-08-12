import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Editor } from '@tinymce/tinymce-react';
import SEO from '../components/SEO';

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
  margin-bottom: 2rem;
  width: 100%;
`;

// The generic type `<{ hasContent: boolean }>` is removed for JS
const PreviewContainer = styled.div`
  background: var(--card-bg, #f8f9fa);
  border: 1px solid var(--border-color, #e8eaed);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
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
  margin-bottom: 2rem;
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

// The `: React.FC` type annotation is removed
const Automate = () => {
  const [content, setContent] = useState('');
  const [htmlOutput, setHtmlOutput] = useState('');
  const [textOutput, setTextOutput] = useState('');
  // The `<TextKey[]>` generic is removed
  const [textKeys, setTextKeys] = useState([]);
  const [replacedContent, setReplacedContent] = useState('');

  // Type annotations for parameters and return values are removed
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
    const keys = extractTextKeys(content);
    const currentKeys = textKeys.map(tk => tk.key);

    keys.forEach(key => {
      if (!currentKeys.includes(key)) {
        setTextKeys(prev => [...prev, { key, value: '' }]);
      }
    });

    const removedKeys = currentKeys.filter(key => !keys.includes(key));
    if (removedKeys.length > 0) {
      setTextKeys(prev => prev.filter(tk => keys.includes(tk.key)));
      setReplacedContent('');
      setHtmlOutput('');
      setTextOutput('');
    }

    if (textKeys.length > 0) {
      let result = content;
      textKeys.forEach(({ key, value }) => {
        if (value.trim()) {
          const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
          result = result.replace(regex, value);
        }
      });
      setReplacedContent(result);
    }
  }, [content, textKeys]);

  const handleEditorChange = (content) => {
    setContent(content);
  };

  const handleTextKeyChange = (key, value) => {
    setTextKeys(prev =>
      prev.map(tk => tk.key === key ? { ...tk, value } : tk)
    );

    let result = content;
    const updatedKeys = textKeys.map(tk => tk.key === key ? { ...tk, value } : tk);
    updatedKeys.forEach(({ key: k, value: v }) => {
      if (v.trim()) {
        const regex = new RegExp(`\\{\\{${k}\\}\\}`, 'g');
        result = result.replace(regex, v);
      }
    });
    setReplacedContent(result);
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

      <EditorContainer>
        <EditorTitle>📝 Rich Text Editor</EditorTitle>
        <Editor
          apiKey="mnjhi36ekztuuutcu6xr1eqhgmsb7pbc4ifzzm4mrb781i46"
          value={content}
          onEditorChange={handleEditorChange}
          init={{
            height: 400,
            menubar: true,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
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
          {replacedContent && <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #5f6368)', fontWeight: 'normal' }}>
            (Real-time updates as you type)
          </span>}
        </PreviewTitle>
        <Editor
          tinymceScriptSrc='/tinymce/tinymce.min.js'
          licenseKey='gpl'
          value={replacedContent || content}
          onEditorChange={() => {}}
          readonly={true}
          init={{
            height: 300,
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: false,
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; background-color: #f8f9fa; }',
            status: false
          }}
        />
      </PreviewContainer>

      {textKeys.length > 0 && (
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
      )}

      {textKeys.length === 0 && content && (
        <TextKeysSection>
          <TextKeysTitle>🔑 Text Keys</TextKeysTitle>
          <NoKeysMessage>
            No text keys found. Use the pattern {'{{key}}'} in your text to create replaceable placeholders.
          </NoKeysMessage>
        </TextKeysSection>
      )}

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

      <InfoSection>
        <InfoTitle>ℹ️ How to Use Text Key Replacement</InfoTitle>
        <InfoText>
          <strong>Text Keys:</strong> Use the pattern {'{{key}}'} in your text to create replaceable placeholders.
          For example: "Hello {'{{name}}'}, welcome to {'{{company}}'}!"
        </InfoText>
        <InfoText>
          <strong>Workflow:</strong> Type your template with text keys → Fill in the values →
          See live preview in real-time → Get your final content automatically.
        </InfoText>
        <InfoText>
          <strong>Live Preview:</strong> The preview editor shows your content with all text keys replaced in real-time.
          It's read-only and updates automatically as you type in the input fields above.
        </InfoText>
        <InfoText>
          <strong>Key Management:</strong> Remove text keys by deleting them directly from the editor.
          The interface automatically detects changes and updates the key list.
        </InfoText>
        <InfoText>
          <strong>Use cases:</strong> Email templates, document generation, personalized content,
          automated messaging, and any repetitive text that needs customization.
        </InfoText>
      </InfoSection>
    </Container>
  );
};

export default Automate;
/*
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './App.css';

export default function App() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editor
        tinymceScriptSrc='/tinymce/tinymce.min.js'
        licenseKey='gpl'
        onInit={(_evt, editor) => editorRef.current = editor}
        initialValue='<p>This is the initial content of the editor.</p>'
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
}
  */