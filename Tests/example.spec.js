import { test, expect } from '@playwright/test';

test.describe('Option 1: Singlish to Sinhala Functional Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // Helper function to get output area - more reliable approach
  const getOutputArea = (page) => {
    // The output is in a generic element inside the Sinhala section
    return page.locator('generic').filter({ hasText: 'Sinhala' }).locator('..').locator('generic').nth(1);
  };

  // Alternative: Wait for Sinhala text to appear
  const waitForTranslation = async (page) => {
    await page.waitForFunction(() => {
      const elements = document.querySelectorAll('generic');
      for (let el of elements) {
        if (el.textContent && /[ං-ෟ]/.test(el.textContent)) {
          return true;
        }
      }
      return false;
    }, { timeout: 5000 });
  };

  // 1. Simple Sentence Tests
  test('Pos_Fun_01: Simple sentence conversion', async ({ page }) => {
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputArea.fill('mama gedhara yanavaa.');
    
    // Wait for translation to appear
    await waitForTranslation(page);
    await page.waitForTimeout(1000);
    
    const outputArea = getOutputArea(page);
    const outputText = await outputArea.textContent();
    expect(outputText).toContain('මම');
    expect(outputText).toContain('ගෙදර');
  });

  test('Pos_Fun_02: Simple sentence - food request', async ({ page }) => {
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputArea.fill('mata bath oonee.');
    
    await waitForTranslation(page);
    await page.waitForTimeout(1000);
    
    const outputArea = getOutputArea(page);
    const outputText = await outputArea.textContent();
    expect(outputText).toContain('මට');
    expect(outputText).toContain('බත්');
  });

  test('Pos_Fun_03: Simple sentence - going to shop', async ({ page }) => {
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputArea.fill('api paasal yanavaa.');
    
    await waitForTranslation(page);
    await page.waitForTimeout(1000);
    
    const outputArea = getOutputArea(page);
    const outputText = await outputArea.textContent();
    expect(outputText).toContain('අපි');
    expect(outputText).toContain('පාසල්');
  });

  // 2. Compound Sentences
  test('Pos_Fun_04: Compound sentence with comma', async ({ page }) => {
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputArea.fill('mama gedhara yanavaa, haebaeyi vahina nisaa dhaenma yannee naee.');
    
    await waitForTranslation(page);
    await page.waitForTimeout(1500);
    
    const outputArea = getOutputArea(page);
    const outputText = await outputArea.textContent();
    expect(outputText).toContain('මම');
    expect(outputText).toContain('හැබැයි');
    expect(outputText).toContain('නෑ');
  });

  test('Pos_Fun_05: Compound sentence - eating and watching', async ({ page }) => {
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputArea.fill('api kaeema kanna yanavaa saha passe chithrapatayakuth balanavaa.');
    
    await waitForTranslation(page);
    await page.waitForTimeout(1500);
    
    const outputArea = getOutputArea(page);
    const outputText = await outputArea.textContent();
    expect(outputText).toContain('අපි');
    expect(outputText).toContain('කෑම');
  });

  // 3. Complex Sentences
  test('Pos_Fun_06: Complex sentence with condition', async ({ page }) => {
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputArea.fill('oya enavaanam mama balan innavaa.');
    
    await waitForTranslation(page);
    await page.waitForTimeout(1500);
    
    const outputArea = getOutputArea(page);
    const outputText = await outputArea.textContent();
    expect(outputText).toContain('ඔය');
    expect(outputText).toContain('මම');
  });

  test('Pos_Fun_07: Complex sentence - cause and effect', async ({ page }) => {
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputArea.fill('mama sunaQQgu vunee maarga thadhabadhaya nisaa.');
    
    await waitForTranslation(page);
    await page.waitForTimeout(1500);
    
    const outputArea = getOutputArea(page);
    const outputText = await outputArea.textContent();
    expect(outputText).toBeTruthy();
  });

  // 4. Interrogative Forms
  test('Pos_Fun_08: Question - how are you', async ({ page }) => {
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputArea.fill('oyaata kohomadha?');
    
    await waitForTranslation(page);
    await page.waitForTimeout(1500);
    
    const outputArea = getOutputArea(page);
    const outputText = await outputArea.textContent();
    expect(outputText).toContain('ඔයාට');
    expect(outputText).toContain('කොහොමද');
  });

  test('Pos_Fun_09: Question - when coming', async ({ page }) => {
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputArea.fill('oyaa kavadhdha enna hithan inne?');
    
    await waitForTranslation(page);
    await page.waitForTimeout(1500);
    
    const outputArea = getOutputArea(page);
    const outputText = await outputArea.textContent();
    expect(outputText).toBeTruthy();
  });

  // 5. Imperative Forms
  test('Pos_Fun_10: Command - come quickly', async ({ page }) => {
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputArea.fill('vahaama enna.');
    
    await waitForTranslation(page);
    await page.waitForTimeout(1500);
    
    const outputArea = getOutputArea(page);
    const outputText = await outputArea.textContent();
    expect(outputText).toContain('වහාම');
    expect(outputText).toContain('එන්න');
  });

  test('Pos_Fun_11: Command - tell me', async ({ page }) => {
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputArea.fill('mata kiyanna.');
    
    await waitForTranslation(page);
    await page.waitForTimeout(1500);
    
    const outputArea = getOutputArea(page);
    const outputText = await outputArea.textContent();
    expect(outputText).toContain('මට');
    expect(outputText).toContain('කියන්න');
  });

  // 6. Negative Forms
  test('Pos_Fun_12: Negative sentence - will not do', async ({ page }) => {
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputArea.fill('mama ehema karannee naehae.');
    
    await waitForTranslation(page);
    await page.waitForTimeout(1500);
    
    const outputArea = getOutputArea(page);
    const outputText = await outputArea.textContent();
    expect(outputText).toContain('මම');
    expect(outputText).toContain('නැහැ');
  });

  test('Pos_Fun_13: Negative sentence - will not come', async ({ page }) => {
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputArea.fill('api heta ennee naehae.');
    
    await waitForTranslation(page);
    await page.waitForTimeout(1500);
    
    const outputArea = getOutputArea(page);
    const outputText = await outputArea.textContent();
    expect(outputText).toContain('අපි');
    expect(outputText).toContain('නැහැ');
  });

  // 7. Greetings and Polite Forms
  test('Pos_Fun_14: Greeting - good morning', async ({ page }) => {
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputArea.fill('suba udhaeesanak!');
    
    await waitForTranslation(page);
    await page.waitForTimeout(1500);
    
    const outputArea = getOutputArea(page);
    const outputText = await outputArea.textContent();
    expect(outputText).toContain('සුබ');
    expect(outputText).toContain('උදෑසනක්');
  });

  test('Pos_Fun_15: Polite request', async ({ page }) => {
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputArea.fill('karuNaakaralaa mata podi udhavvak karanna puLuvandha?');
    
    await waitForTranslation(page);
    await page.waitForTimeout(1500);
    
    const outputArea = getOutputArea(page);
    const outputText = await outputArea.textContent();
    expect(outputText).toContain('කරුණාකර');
    expect(outputText).toContain('මට');
  });

  // 8. Mixed Language (English + Singlish)
  test('Pos_Fun_16: Mixed language - Zoom meeting', async ({ page }) => {
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputArea.fill('Zoom meeting ekak thiyennee.');
    
    await waitForTranslation(page);
    await page.waitForTimeout(1500);
    
    const outputArea = getOutputArea(page);
    const outputText = await outputArea.textContent();
    expect(outputText).toContain('Zoom');
    expect(outputText).toContain('meeting');
  });

  test('Pos_Fun_17: Mixed language - school and traffic', async ({ page }) => {
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputArea.fill('Lamayi school yannee vaeen ekee.');
    
    await waitForTranslation(page);
    await page.waitForTimeout(1500);
    
    const outputArea = getOutputArea(page);
    const outputText = await outputArea.textContent();
    expect(outputText).toContain('school');
  });

  test('Pos_Fun_18: Mixed language - office late due to traffic', async ({ page }) => {
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputArea.fill('nimaali office enna late vennee traffic nisaa.');
    
    await waitForTranslation(page);
    await page.waitForTimeout(1500);
    
    const outputArea = getOutputArea(page);
    const outputText = await outputArea.textContent();
    expect(outputText).toContain('office');
    expect(outputText).toContain('traffic');
  });

  // 9. Tense Variations
  test('Pos_Fun_19: Past tense - went yesterday', async ({ page }) => {
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputArea.fill('mama iiyee gedhara giyaa.');
    
    await waitForTranslation(page);
    await page.waitForTimeout(1500);
    
    const outputArea = getOutputArea(page);
    const outputText = await outputArea.textContent();
    expect(outputText).toContain('මම');
    expect(outputText).toContain('ගිය');
  });

  test('Pos_Fun_20: Future tense - will come tomorrow', async ({ page }) => {
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputArea.fill('mama heta enavaa.');
    
    await waitForTranslation(page);
    await page.waitForTimeout(1500);
    
    const outputArea = getOutputArea(page);
    const outputText = await outputArea.textContent();
    expect(outputText).toContain('මම');
    expect(outputText).toContain('හෙට');
  });

  // Continue with remaining tests...
  // 10. Long Paragraph Input (>300 chars)
  test('Pos_Fun_21: Long paragraph input', async ({ page }) => {
    const longText = 'dhitvaa suLi kuNaatuva samaGa aethi vuu gQQvathura saha naayayaeem heethuven maarga sQQvarDhana aDhikaariya sathu maarga kotas 430k vinaashayata pathva aethi athara, ehi samastha dhiga pramaaNaya kiloomiitar 300k pamaNa vana bava pravaahana,mahaamaarga saha naagarika sQQvarDhana amaathYA bimal rathnaayaka saDHahan kaLeeya.';
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputArea.fill(longText);
    
    await waitForTranslation(page);
    await page.waitForTimeout(3000);
    
    const outputArea = getOutputArea(page);
    const outputText = await outputArea.textContent();
    expect(outputText).toBeTruthy();
    expect(outputText.length).toBeGreaterThan(100);
  });

  // 11-24: Continue with same pattern...
  test('Pos_Fun_22: Slang - machan', async ({ page }) => {
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputArea.fill('ela machan! supiri!!');
    await waitForTranslation(page);
    await page.waitForTimeout(1500);
    const outputArea = getOutputArea(page);
    const outputText = await outputArea.textContent();
    expect(outputText).toBeTruthy();
  });

  test('Pos_Fun_23: Informal expression - what are you doing now', async ({ page }) => {
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputArea.fill('dhaen ithin monavadha karanne?');
    await waitForTranslation(page);
    await page.waitForTimeout(1500);
    const outputArea = getOutputArea(page);
    const outputText = await outputArea.textContent();
    expect(outputText).toBeTruthy();
  });

  test('Pos_Fun_24: Input with punctuation marks', async ({ page }) => {
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputArea.fill('mama gedhara yanavaa! oyaa enavadha?');
    await waitForTranslation(page);
    await page.waitForTimeout(1500);
    const outputArea = getOutputArea(page);
    const outputText = await outputArea.textContent();
    expect(outputText).toContain('මම');
  });

  // 13. Negative Test Cases
  test('Neg_Fun_01: Invalid characters handling', async ({ page }) => {
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputArea.fill('@@@###$$$');
    await page.waitForTimeout(2000);
    const outputArea = page.locator('generic').filter({ hasText: 'Sinhala' }).locator('..').locator('generic').nth(1);
    const text = await outputArea.textContent();
    // Should either be empty or show an error message
    expect(text?.trim() || '').toBe('');
  });

  test('Neg_Fun_02: Empty input handling', async ({ page }) => {
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputArea.fill('');
    await page.waitForTimeout(1000);
    const outputArea = page.locator('generic').filter({ hasText: 'Sinhala' }).locator('..').locator('generic').nth(1);
    const text = await outputArea.textContent();
    // Empty input should produce empty output
    expect(text?.trim() || '').toBe('');
  });

  test('Neg_Fun_03: Only spaces input', async ({ page }) => {
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputArea.fill('     ');
    await page.waitForTimeout(1000);
    const outputArea = page.locator('generic').filter({ hasText: 'Sinhala' }).locator('..').locator('generic').nth(1);
    const text = await outputArea.textContent();
    // Whitespace-only input should produce empty output
    expect(text?.trim() || '').toBe('');
  });

  test('Neg_Fun_04: Numbers only input', async ({ page }) => {
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputArea.fill('1234567890');
    await page.waitForTimeout(1500);
    const outputArea = page.locator('generic').filter({ hasText: 'Sinhala' }).locator('..').locator('generic').nth(1);
    const text = await outputArea.textContent();
    // Numbers-only should NOT produce Sinhala output (should be empty or just numbers)
    expect(text?.trim() || '').not.toContain('ා');
  });

  test('Neg_Fun_05: Very long single word without spaces', async ({ page }) => {
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputArea.fill('mamagedharayanavaaekaharignanaehaemakaranneepahasunavaedhayatanisaamathehelthehelthehelthehelthehel');
    await page.waitForTimeout(3000);
    const outputArea = page.locator('generic').filter({ hasText: 'Sinhala' }).locator('..').locator('generic').nth(1);
    const text = await outputArea.textContent();
    // Should either be empty or handle it gracefully (but not translate invalid long word)
    expect(text?.trim() || '').toBe('');
  });
});