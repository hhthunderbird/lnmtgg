import { marked } from 'marked';

export const loadMarkdown = async (path: string): Promise<string> => {
  try {
    // Remove the leading slash to make it relative to the public directory
    const relativePath = path.startsWith('/') ? path.slice(1) : path;
    console.log('Loading markdown from:', relativePath);
    const response = await fetch(relativePath);
    if (!response.ok) {
      console.error('Failed to load markdown:', {
        path: relativePath,
        status: response.status,
        statusText: response.statusText
      });
      throw new Error(`Failed to load markdown: ${response.statusText}`);
    }
    const text = await response.text();
    console.log('Successfully loaded markdown:', {
      path: relativePath,
      contentLength: text.length
    });
    return marked(text);
  } catch (error) {
    console.error('Error loading markdown:', {
      path,
      error: error instanceof Error ? error.message : String(error)
    });
    return '<p>Error loading content. Please try again later.</p>';
  }
}; 