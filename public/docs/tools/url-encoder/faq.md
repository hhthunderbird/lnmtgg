# URL Encoder FAQ

## What characters need to be URL encoded?

Characters that need to be URL encoded include:
- Spaces (encoded as %20)
- Special characters like !, @, #, $, %, ^, &, *, (, ), +, =, {, }, [, ], |, \, :, ;, ", ', <, >, ?, /, ~, `
- Non-ASCII characters (Unicode)
- Control characters

## Why do we need URL encoding?

URL encoding is necessary because:
1. URLs can only contain a specific set of characters (ASCII)
2. Some characters have special meanings in URLs
3. It ensures safe transmission of data over the internet
4. It prevents issues with different character encodings

## What's the difference between encodeURI and encodeURIComponent?

- `encodeURI`: Encodes a complete URL but preserves certain characters like /, ?, :, @, &, =, +, $, #, and ,
- `encodeURIComponent`: Encodes all special characters, including those preserved by encodeURI

## How do I handle international characters?

International characters (non-ASCII) are automatically encoded using UTF-8 encoding. For example:
- é becomes %C3%A9
- 漢字 becomes %E6%BC%A2%E5%AD%97

## What happens if I encode an already encoded URL?

Encoding an already encoded URL will result in double encoding, which is usually not what you want. For example:
- Original: Hello World!
- First encode: Hello%20World%21
- Second encode: Hello%2520World%2521

## How do I decode a URL-encoded string?

You can use the "Decode" function in the tool to convert URL-encoded text back to its original form. This is useful for:
- Reading encoded URLs
- Debugging URL issues
- Converting encoded data back to human-readable format

## Are there any security considerations?

Yes, when working with URL encoding:
1. Always validate input before encoding
2. Be careful with user-provided URLs
3. Consider using a whitelist of allowed characters
4. Be aware of potential encoding/decoding attacks
5. Use HTTPS for sensitive data transmission 