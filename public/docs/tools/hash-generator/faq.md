# Hash Generator FAQ

## What is a hash function?

A hash function is a mathematical function that:
- Takes input data of any size
- Produces a fixed-size output (hash)
- Is deterministic (same input always produces same output)
- Is one-way (cannot be reversed)
- Has a low probability of collisions

## What are the differences between the hash algorithms?

- MD5 (128-bit):
  - Fastest but least secure
  - 32 characters long
  - Not recommended for security

- SHA-1 (160-bit):
  - Faster than SHA-256
  - 40 characters long
  - Not recommended for security

- SHA-256 (256-bit):
  - More secure than MD5 and SHA-1
  - 64 characters long
  - Recommended for most uses

- SHA-512 (512-bit):
  - Most secure option
  - 128 characters long
  - Best for high-security applications

## What is a collision?

A collision occurs when two different inputs produce the same hash output. While theoretically possible, good hash functions make collisions extremely unlikely.

## Why are MD5 and SHA-1 considered insecure?

MD5 and SHA-1 are considered insecure because:
1. Collisions have been found
2. They are vulnerable to brute-force attacks
3. They are too fast, making them susceptible to rainbow table attacks
4. They don't provide sufficient security for modern applications

## What is a salt?

A salt is random data added to the input before hashing to:
- Make the same input produce different hashes
- Prevent rainbow table attacks
- Increase security of stored passwords

## How do I verify a hash?

To verify a hash:
1. Generate a hash of the original data
2. Compare it with the stored hash
3. If they match, the data is unchanged

## What is a rainbow table?

A rainbow table is a precomputed table of hashes for common inputs. They are used to:
- Quickly crack hashed passwords
- Find collisions
- Reverse hashes

## When should I use each hash algorithm?

- MD5: Only for non-security purposes like file deduplication
- SHA-1: Legacy systems or non-security applications
- SHA-256: General-purpose security applications
- SHA-512: High-security applications or when future-proofing

## How do I handle large files?

For large files:
1. Read the file in chunks
2. Hash each chunk
3. Combine the hashes
4. Or use a streaming hash function

## What are the best practices for using hashes?

1. Use strong algorithms (SHA-256 or SHA-512)
2. Always use a salt for passwords
3. Keep the original data secure
4. Verify hashes using the same algorithm
5. Consider using specialized password hashing algorithms 