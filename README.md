# Singlish to Sinhala Translator - Test Automation

This repository contains automated tests for the Singlish to Sinhala translation web application using Playwright.

## Project Overview

This test suite validates the functionality of the Swift Translator application (https://www.swifttranslator.com/), specifically testing:
- Simple, compound, and complex sentence translations
- Interrogative and imperative forms
- Negative sentence structures
- Greetings and polite expressions
- Mixed language inputs (English + Singlish)
- Tense variations
- Edge cases and error handling
- Real-time UI updates

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI/CD pipeline configuration
├── Tests/
│   ├── example.spec.js             # Main functional test suite (24 tests)
│   └── ui.spec.ts                  # UI-specific tests
├── test-results/                   # Test execution results
├── playwright.config.js            # Playwright configuration
├── package.json                    # Project dependencies
└── .gitignore                      # Git ignore rules
```

## Prerequisites

- Node.js (LTS version recommended)
- npm (comes with Node.js)
- Git

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rumen_assignment
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

### Run all tests
```bash
npx playwright test
```

### Run tests in headed mode (see browser)
```bash
npx playwright test --headed
```

### Run specific test file
```bash
npx playwright test Tests/example.spec.js
```

### Run tests with UI mode (interactive)
```bash
npx playwright test --ui
```

### Run specific test by name
```bash
npx playwright test -g "Pos_Fun_01"
```

## Test Configuration

The test configuration is defined in [`playwright.config.js`](playwright.config.js):

- **Base URL**: `https://www.swifttranslator.com/`
- **Test Directory**: `./Tests`
- **Headless Mode**: Disabled (to observe typing animations)
- **Trace**: Enabled on first retry
- **Browser**: Chromium (Desktop Chrome)

## Test Categories

### 1. **Functional Tests (Positive)**
- **Simple Sentences** (Tests 01-03): Basic sentence translations
- **Compound Sentences** (Tests 04-05): Multiple clause sentences
- **Complex Sentences** (Tests 06-07): Conditional and causal sentences
- **Interrogative Forms** (Tests 08-09): Questions
- **Imperative Forms** (Tests 10-11): Commands
- **Negative Forms** (Tests 12-13): Negative sentences
- **Greetings** (Tests 14-15): Polite expressions
- **Mixed Language** (Tests 16-18): English + Singlish
- **Tense Variations** (Tests 19-20): Past and future tenses
- **Long Text** (Test 21): Paragraph input (>300 characters)
- **Slang & Informal** (Tests 22-23): Colloquial expressions
- **Punctuation** (Test 24): Special character handling

### 2. **Negative Tests**
- Invalid characters (Neg_Fun_01)
- Empty input (Neg_Fun_02)
- Whitespace-only input (Neg_Fun_03)
- Numbers-only input (Neg_Fun_04)
- Very long single word (Neg_Fun_05)

### 3. **UI Tests**
- Real-time output updating ([`Tests/ui.spec.ts`](Tests/ui.spec.ts))

## CI/CD Integration

This project includes GitHub Actions workflow configuration ([`.github/workflows/playwright.yml`](.github/workflows/playwright.yml)) that:
- Runs on push/pull requests to main/master branches
- Installs dependencies and Playwright browsers
- Executes all tests
- Uploads test reports as artifacts (retained for 30 days)

## Test Results

Test results are stored in the [`test-results/`](test-results/) directory with detailed:
- Screenshots on failure
- Traces for debugging
- Video recordings (when enabled)
- Test execution metadata

## Viewing Reports

After running tests, view the HTML report:
```bash
npx playwright show-report
```

## Key Helper Functions

The test suite includes helper functions in [`Tests/example.spec.js`](Tests/example.spec.js):

- **`getOutputArea(page)`**: Locates the Sinhala output area
- **`waitForTranslation(page)`**: Waits for Sinhala text to appear in the output

## Customization

### Modify Test Timeout
In [`playwright.config.js`](playwright.config.js), add:
```javascript
use: {
  actionTimeout: 10000, // 10 seconds
}
```

### Enable Video Recording
```javascript
use: {
  video: 'on', // or 'retain-on-failure'
}
```

### Change Browser
Add more projects in the configuration:
```javascript
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
]
```

## Troubleshooting

### Tests failing due to timing issues
- Increase `waitForTimeout` values in test cases
- Adjust the `delay` parameter in `pressSequentially()` calls

### Element not found errors
- Verify the application UI hasn't changed
- Update locators in helper functions if needed

### CI/CD failures
- Check that the base URL is accessible
- Verify browser dependencies are installed correctly

## Contributing

1. Create a feature branch
2. Add your tests following the existing naming convention
3. Run tests locally to verify
4. Submit a pull request

## License

ISC
