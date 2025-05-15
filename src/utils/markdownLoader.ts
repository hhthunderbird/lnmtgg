import { marked } from 'marked';

export const loadMarkdown = async (path: string): Promise<string> => {
  try {
    // Remove the leading slash to make it relative to the public directory
    const relativePath = path.startsWith('/') ? path.slice(1) : path;
    const response = await fetch(relativePath);
    if (!response.ok) {
      throw new Error(`Failed to load markdown: ${response.statusText}`);
    }
    const text = await response.text();
    return marked(text);
  } catch (error) {
    console.error('Error loading markdown:', error);
    return '<p>Error loading content. Please try again later.</p>';
  }
}; 