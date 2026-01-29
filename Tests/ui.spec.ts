import { test, expect } from '@playwright/test';

test('Pos_UI_01: Real-time output updating', async ({ page }) => {
  await page.goto('/');

  const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
  const outputArea = page.locator('generic').filter({ hasText: /^[ං-ෟ\u200D\u200C]+/ }).first();

  // Type "mama" slowly
  await inputArea.pressSequentially('mama', { delay: 200 });

  // Verify the output box is not empty immediately (proving real-time update)
  const text = await outputArea.textContent();
  expect(text?.length || 0).toBeGreaterThan(0);
});