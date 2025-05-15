# Text Case Converter FAQ

## What is the difference between camelCase and PascalCase?

- camelCase: The first word starts with a lowercase letter, and subsequent words start with uppercase letters (e.g., `firstName`, `userProfile`)
- PascalCase: All words start with uppercase letters (e.g., `FirstName`, `UserProfile`)

## When should I use snake_case?

snake_case is commonly used in:
- Python variable and function names
- Database column names
- Configuration files
- File names in some systems
- Ruby variable names

## What is the difference between kebab-case and snake_case?

- kebab-case uses hyphens (-) as separators (e.g., `user-profile`)
- snake_case uses underscores (_) as separators (e.g., `user_profile`)

## How does the Title Case conversion work?

Title Case conversion:
1. Capitalizes the first letter of each word
2. Keeps articles (a, an, the) lowercase unless they're the first word
3. Keeps prepositions lowercase unless they're the first word
4. Keeps conjunctions lowercase unless they're the first word

## What happens to special characters during conversion?

Special characters (numbers, symbols, etc.):
- Are preserved in their original position
- Don't affect the case conversion of surrounding letters
- Are treated as word separators in some cases

## How do I handle acronyms in case conversion?

The tool preserves acronyms in their original form. For example:
- "HTML" stays as "HTML" in Title Case
- "CSS" stays as "CSS" in camelCase
- "API" stays as "API" in PascalCase

## What are the best practices for case conversion?

1. Be consistent within your project
2. Follow language-specific conventions
3. Consider readability
4. Use appropriate case for the context
5. Document your case conventions

## How do I handle multi-line text?

The tool:
- Preserves line breaks
- Applies case conversion to each line independently
- Maintains the original text structure
- Preserves indentation 