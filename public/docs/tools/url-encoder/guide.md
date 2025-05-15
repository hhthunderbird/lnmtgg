# URL Encoder Guide

## What is URL Encoding?

URL encoding is a method to convert special characters and non-ASCII characters into a format that can be safely transmitted over the internet. It replaces unsafe characters with a percent sign (%) followed by two hexadecimal digits.

## How to Use the URL Encoder

1. Enter your text in the input field
2. Click "Encode" to convert the text to URL-encoded format
3. Click "Decode" to convert URL-encoded text back to its original form
4. Use "Copy" to copy the result to your clipboard
5. Use "Clear" to reset the input field

## Common Use Cases

- Encoding URLs with special characters
- Encoding form data for HTTP requests
- Encoding query parameters
- Encoding file names in URLs
- Encoding international characters (Unicode)

## Examples

Original Text | Encoded Text
-------------|-------------
Hello World! | Hello%20World%21
https://example.com/path?q=test | https%3A%2F%2Fexample.com%2Fpath%3Fq%3Dtest
Café & Restaurant | Caf%C3%A9%20%26%20Restaurant

## Tips

- Always encode URLs before using them in web applications
- Remember to encode both the URL and any query parameters
- Use the decoder to check if a URL is properly encoded
- Be careful with double encoding (encoding an already encoded URL) 