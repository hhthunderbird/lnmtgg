# JSON Formatter FAQ

## General Questions

### What is JSON?
JSON (JavaScript Object Notation) is a lightweight data interchange format that's easy for humans to read and write and easy for machines to parse and generate.

### Why should I format my JSON?
Formatted JSON is easier to read and debug. It helps identify syntax errors and makes the structure of your data more clear.

### Is my data safe?
Yes! All processing is done in your browser. Your JSON data is never sent to our servers or stored anywhere.

## Technical Questions

### What is the maximum size of JSON I can format?
The tool can handle JSON files up to 10MB in size. For larger files, we recommend using a desktop application.

### Does the tool support JSON5?
Currently, the tool only supports standard JSON format. JSON5 features like comments and trailing commas are not supported.

### Can I format multiple JSON objects at once?
Yes, you can format multiple JSON objects as long as they are properly separated and the total size is within limits.

### What happens if my JSON is invalid?
The tool will display an error message indicating the line number and nature of the error. You can then fix the error and try again.

## Usage Questions

### How do I copy the formatted JSON?
You can use the "Copy" button or press Ctrl+C (Cmd+C on Mac) to copy the formatted JSON to your clipboard.

### Can I download the formatted JSON?
Yes, use the "Download" button to save the formatted JSON as a .json file.

### What keyboard shortcuts are available?
- Ctrl+Enter: Format JSON
- Ctrl+Shift+M: Minify JSON
- Ctrl+C: Copy to clipboard
- Ctrl+S: Download JSON

### How do I clear the input/output?
Use the "Clear" button or refresh the page to start fresh.

## Troubleshooting

### The tool is not formatting my JSON
- Check if your JSON is valid
- Make sure you're using standard JSON syntax
- Try copying and pasting the JSON again
- Clear your browser cache

### I'm getting an error message
- Read the error message carefully
- Check the line number mentioned in the error
- Verify that all brackets and braces are properly closed
- Ensure all strings are properly quoted

### The formatted JSON looks wrong
- Check if your JSON is valid
- Verify that the indentation is what you expect
- Try using the "Minify" option to see if that helps
- Make sure there are no hidden characters in your input

## Browser Support

### Which browsers are supported?
The tool works in all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

### Do I need to install anything?
No, the tool runs entirely in your browser. No installation or plugins required.

### Is there a mobile version?
Yes, the tool is fully responsive and works on mobile devices.

## Additional Features

### Can I customize the formatting?
Currently, the tool uses standard formatting rules. Customization options may be added in future updates.

### Is there an API available?
Not yet, but we're working on providing an API for programmatic access.

### Can I use the tool offline?
Yes, you can use the tool offline once the page is loaded. However, you'll need an internet connection to access the tool initially.

## Contact and Support

### How can I report a bug?
Use the "Contact" form on our website to report any issues you encounter.

### Can I suggest new features?
Yes! We welcome feature suggestions. Please use the "Contact" form to submit your ideas.

### Where can I get more help?
- Check our documentation
- Visit our GitHub repository
- Contact our support team
- Join our community forum

## Advanced Usage

### How do I handle large JSON files?
- Break down large files into smaller chunks
- Use the minify feature to reduce file size
- Consider using a desktop application for files over 10MB

### What are common JSON validation errors?
1. **Syntax Errors**
   - Missing commas between properties
   - Unquoted property names
   - Trailing commas in arrays or objects
   - Mismatched brackets or braces

2. **Data Type Errors**
   - Using single quotes instead of double quotes
   - Unescaped special characters
   - Invalid number formats
   - Incorrect boolean values

3. **Structural Errors**
   - Missing closing brackets
   - Incorrect nesting levels
   - Invalid array syntax
   - Malformed object properties

### How do I format JSON with special characters?
- Use proper escaping for special characters
- Double quotes within strings should be escaped with backslash
- Unicode characters are supported
- Control characters should be properly escaped

### What's the difference between minified and formatted JSON?
- **Formatted JSON**
  - Includes proper indentation
  - Has line breaks for readability
  - Easier to read and debug
  - Larger file size

- **Minified JSON**
  - Removes all whitespace
  - No indentation or line breaks
  - Smaller file size
  - Better for transmission

### How do I validate JSON against a schema?
1. Format your JSON first
2. Use a JSON Schema validator
3. Check for required properties
4. Verify data types
5. Ensure proper nesting

### What are best practices for JSON formatting?
1. **Consistency**
   - Use consistent indentation
   - Follow a standard style guide
   - Maintain proper spacing

2. **Validation**
   - Always validate before use
   - Check for common errors
   - Verify data types

3. **Performance**
   - Minify for production
   - Remove unnecessary whitespace
   - Optimize for transmission

4. **Security**
   - Sanitize input data
   - Validate before processing
   - Handle errors gracefully 