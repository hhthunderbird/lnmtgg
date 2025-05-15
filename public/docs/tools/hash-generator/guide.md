# Hash Generator Guide

## What is a Hash?

A hash is a fixed-size string of characters generated from input data of any size. Hash functions are one-way functions, meaning you cannot reverse the process to get the original input from the hash.

## How to Use the Hash Generator

1. Enter your text in the input field
2. Select the desired hash algorithm (SHA-256, SHA-384, or SHA-512)
3. Click "Generate Hash" to create the hash
4. Use the "Copy" button to copy the result to your clipboard

## Available Hash Algorithms

- **SHA-256**: Produces a 256-bit (32-byte) hash value
- **SHA-384**: Produces a 384-bit (48-byte) hash value
- **SHA-512**: Produces a 512-bit (64-byte) hash value

## Common Use Cases

- Password hashing
- File integrity verification
- Digital signatures
- Blockchain technology
- Data deduplication
- Checksums

## Examples

Input: `Hello World`
- SHA-256: `a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e`
- SHA-384: `99514329186b2f6ae4a1329e7ee6c610a729636335174ac6b740f9028396fcc803d0e93863a7c3d90f86beee782f4f3f`
- SHA-512: `2c74fd17edafd80e8447b0d46741ee243b7eb74dd2149a0ab1b9246fb30382f27e853d8585719e0e67cbda0daa8f51671064615d645ae27acb15bfb1447f459b`

## Best Practices

1. Choose the appropriate hash algorithm for your use case
2. Never store plain text passwords, always use hashed versions
3. Use salt when hashing passwords for additional security
4. Verify hash integrity when downloading files
5. Keep your hash algorithms up to date 