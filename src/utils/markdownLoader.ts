import { marked } from 'marked';

export const loadMarkdown = async (path: string): Promise<string> => {
  try {
    const response = await fetch(path);
    const text = await response.text();
    return marked(text);
  } catch (error) {
    console.error('Error loading markdown:', error);
    return '<p>Error loading content. Please try again later.</p>';
  }
}; 