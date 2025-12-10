# WDIO E2E Tests - Practice Software Testing

This project contains automated E2E tests for [Practice Software Testing](https://practicesoftwaretesting.com) using WebdriverIO with Cucumber BDD framework.

## Prerequisites

- Node.js (v18 or higher)
- npm
- Chrome and Firefox browsers installed

## Installation

```bash
npm install
```

## Configuration

The `wdio.conf.js` file contains the main configuration including:
- **Multi-browser support**: Chrome, Firefox
- **Headless mode**: Chrome and Firefox run in headless mode
- **Parallel execution**: 2 instances run in parallel
- **Retry mechanism**: Failed tests retry 2 times before marking as failed

## Running Tests

### Run all tests in all browsers (parallel)
```bash
npm test
```

### Run tests in specific browser
```bash
# Chrome only
npm run test:chrome

# Firefox only
npm run test:firefox

### Run with CLI options
```bash
# Run specific feature file
npx wdio run wdio.conf.js --spec ./features/toolshop.feature

# Run with specific tags
npx wdio run wdio.conf.js --cucumberOpts.tagExpression='@smoke'
```

## Test Scenarios

The following 8 test scenarios are implemented:

1. **User Registration** - User successfully registers with valid information
2. **Sign In with Invalid Password** - User cannot sign in with incorrect password
3. **User Profile Update** - User successfully updates profile information
4. **Product Purchase** - User completes checkout from product details page
5. **Favorites** - User adds a product to favorites and views it
6. **Search for Exact Product** - User finds a product by exact name
7. **Language Change** - User switches the application language
8. **Filtering and Sorting** - User filters by category and sorts by price

## Project Structure

```
├── features/
│   ├── toolshop.feature          # Gherkin feature file with all scenarios
│   └── step-definitions/
│       └── steps.js              # Step definitions for all scenarios
├── wdio.conf.js                  # Main WDIO configuration
├── package.json
└── README.md
```

## Key Features

| Feature | Configuration |
|---------|---------------|
| Multi-browser | Chrome, Firefox |
| Headless Mode | Enabled for Chrome and Firefox |
| Parallel Execution | 2 instances (maxInstances: 2) |
| Retry on Failure | 2 retries (cucumberOpts.retry: 2) |
| BDD Framework | Cucumber |
| Reporter | Spec Reporter |

## Notes

- Tests use the existing test account: `customer@practicesoftwaretesting.com`
