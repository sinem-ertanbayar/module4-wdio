# Test Automation Framework - Practice Software Testing

A layered test automation framework built with WebdriverIO and Cucumber for testing [Practice Software Testing](https://practicesoftwaretesting.com) website.

## 📁 Project Structure

The framework follows a **layered architecture** with clear separation of concerns:

```
├── src/
│   ├── core/                    # CORE LAYER - Project-independent utilities
│   │   ├── Browser.js           # Browser interaction utilities
│   │   ├── Element.js           # Element interaction utilities
│   │   ├── WaitHelper.js        # Wait/sync utilities
│   │   ├── Logger.js            # Logging utilities
│   │   └── index.js             # Core exports
│   │
│   ├── business/                # BUSINESS LAYER - Application-specific logic
│   │   ├── pages/               # Page Objects
│   │   │   ├── BasePage.js      # Base page class
│   │   │   ├── HomePage.js      # Home/product listing page
│   │   │   ├── LoginPage.js     # Login page
│   │   │   ├── RegisterPage.js  # Registration page
│   │   │   ├── ProfilePage.js   # User profile page
│   │   │   ├── ProductPage.js   # Product details page
│   │   │   ├── CheckoutPage.js  # Checkout process page
│   │   │   ├── FavoritesPage.js # Favorites page
│   │   │   └── index.js         # Page exports
│   │   └── index.js             # Business layer exports
│   │
│   └── tests/                   # TESTS LAYER - Test specifications
│       ├── features/            # Cucumber feature files
│       │   └── toolshop.feature # Test scenarios in Gherkin
│       ├── step-definitions/    # Step implementations
│       │   └── steps.js         # Cucumber step definitions
│       └── data/                # Test data
│           ├── testData.js      # Centralized test data
│           └── index.js         # Data exports
│
├── wdio.conf.js                 # Main WDIO configuration
├── wdio.chrome.conf.js          # Chrome-specific config
├── wdio.firefox.conf.js         # Firefox-specific config
└── package.json                 # Dependencies and scripts
```

## 🏗️ Architecture Layers

### 1. Core Layer (`src/core/`)
Project-independent, reusable utilities that can be used in any WebdriverIO project:
- **Browser.js**: Navigation, screenshots, window management
- **Element.js**: Click, setValue, getText, select operations
- **WaitHelper.js**: Explicit waits for elements, URLs, conditions
- **Logger.js**: Structured logging for test reporting

### 2. Business Layer (`src/business/`)
Application-specific logic following the **Page Object Pattern**:
- Each page has its own class with locators and actions
- `BasePage` provides common functionality for all pages
- Pages use Core layer utilities for element interactions

### 3. Tests Layer (`src/tests/`)
Test specifications and configurations:
- **Feature files**: BDD scenarios in Gherkin syntax
- **Step definitions**: Cucumber step implementations
- **Test data**: Centralized, reusable test data

## 🎯 Design Principles Applied

- **DRY (Don't Repeat Yourself)**: Common functionality extracted to Core and BasePage
- **KISS (Keep It Simple, Stupid)**: Simple, focused classes with single responsibility
- **YAGNI (You Aren't Gonna Need It)**: Only implemented necessary features
- **Page Object Pattern**: Encapsulated page interactions
- **Single Responsibility**: Each class has one clear purpose
- **Composition over Inheritance**: Core utilities used via composition

## 🚀 Running Tests

```bash
# Install dependencies
npm install

# Run all tests (Chrome + Firefox)
npm run test

# Run tests on Chrome only
npm run test:chrome

# Run tests on Firefox only
npm run test:firefox

# Run all browsers sequentially
npm run test:all
```

## 📋 Test Scenarios

1. **User Registration** - Sign up with valid information
2. **Login Validation** - Error handling for invalid credentials
3. **Profile Update** - Edit and save profile information
4. **Product Checkout** - Complete purchase flow
5. **Favorites** - Add products to favorites
6. **Product Search** - Search functionality
7. **Language Switch** - Change application language
8. **Filter & Sort** - Category filtering and price sorting

## 🛠️ Technologies

- **WebdriverIO 9** - Test automation framework
- **Cucumber** - BDD test framework
- **JavaScript (ES6+)** - Programming language
- **Chrome & Firefox** - Supported browsers
