# URL Encoder Guide

## What is URL Encoding?

URL encoding is a method to convert special characters and non-ASCII characters into a format that can be transmitted over the Internet. It replaces unsafe ASCII characters with a "%" followed by two hexadecimal digits.

## How to Use the URL Encoder

1. Enter your text in the input field
2. Click "Encode" to convert the text to URL-encoded format
3. Click "Decode" to convert URL-encoded text back to its original form
4. Use the "Copy" button to copy the result to your clipboard

## Common Use Cases

- Encoding URLs with special characters
- Encoding form data for HTTP requests
- Encoding query parameters
- Encoding email addresses in URLs
- Encoding file paths in URLs

## Examples

Original: `Hello World!`
Encoded: `Hello%20World%21`

Original: `https://example.com/path?name=John Doe`
Encoded: `https%3A%2F%2Fexample.com%2Fpath%3Fname%3DJohn%20Doe`

## Best Practices

1. Always encode URLs before using them in web applications
2. Encode query parameters separately
3. Use proper encoding for different parts of the URL
4. Test encoded URLs in your browser to ensure they work correctly 