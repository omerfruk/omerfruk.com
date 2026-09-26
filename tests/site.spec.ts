import { expect, test } from '@playwright/test';

test.describe('English page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has exactly one H1, and the name is in the masthead and title', async ({ page }) => {
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText('I build backend systems');

    // İsim H1'de değil; künyede, sayfa başlığında ve JSON-LD'de geçiyor.
    await expect(page.getByRole('banner')).toContainText('Ömer Faruk Taşdemir');
    await expect(page).toHaveTitle(/Ömer Faruk Taşdemir/);
    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
    expect(JSON.parse(jsonLd ?? '{}').name).toBe('Ömer Faruk Taşdemir');
  });

  test('declares language, canonical and both hreflang alternates', async ({ page }) => {
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://omerfruk.com/',
    );
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute(
      'href',
      'https://omerfruk.com/tr/',
    );
  });

  test('every section is reachable from the nav', async ({ page, isMobile }) => {
    if (isMobile) await page.getByRole('button', { name: 'Open menu' }).click();
    for (const id of ['work', 'skills', 'experience', 'contact']) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
  });

  test('filtering narrows the project list and All restores it', async ({ page }) => {
    const cards = page.locator('[data-testid="project-list"] > li');
    const total = await cards.count();
    expect(total).toBeGreaterThan(4);

    await page.getByRole('button', { name: 'Data & ML' }).click();
    await expect(cards).toHaveCount(1);
    await expect(page.getByRole('heading', { name: 'X-Ray Landmark Detection' })).toBeVisible();

    await page.getByRole('button', { name: 'All', exact: true }).click();
    await expect(cards).toHaveCount(total);
  });

  test('public projects link out, private ones do not', async ({ page }) => {
    const publicCard = page.locator('#work a[href*="AwqatSalah-Cookbook"]');
    await expect(publicCard).toHaveAttribute('target', '_blank');
    await expect(publicCard).toHaveAttribute('rel', /noopener/);

    // Kapalı depo kartı bağlantı değildir ve "Private repository" ile işaretlenir.
    const privateRow = page
      .locator('[data-testid="project-list"] > li')
      .filter({ has: page.getByRole('heading', { name: 'KARE Rehber' }) });
    await expect(privateRow.locator('a')).toHaveCount(0);
  });

  test('the contact address is a mailto link', async ({ page }) => {
    await expect(page.locator('#contact a[href^="mailto:"]').first()).toBeVisible();
  });

  /**
   * PROFILE.md'deki kamuya açık konumlandırma kuralı: bu adlar sayfada geçmez.
   * Kural bir metin düzenlemesinde sessizce bozulmasın diye teste bağlandı.
   */
  test('never names the stacks kept out of public positioning', async ({ page }) => {
    const text = (await page.locator('body').innerText()).toLowerCase();
    expect(text).not.toContain('php');
    expect(text).not.toContain('laravel');
  });
});

test.describe('Turkish page', () => {
  test('is served at /tr/ with Turkish content and lang attribute', async ({ page }) => {
    await page.goto('/tr/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Güvenilir backend sistemleri kuruyorum.',
    );
    await expect(page.getByRole('heading', { name: 'Çalıştığım yerler.' })).toBeVisible();
  });

  test('the language switch moves between the two pages', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Türkçe' }).first().click();
    await expect(page).toHaveURL(/\/tr\/$/);

    await page.getByRole('link', { name: 'English' }).first().click();
    await expect(page).toHaveURL(/omerfruk|localhost:\d+\/$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });
});

test.describe('Prerendered output', () => {
  test('shows content with JavaScript disabled', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('I build backend systems');
    await expect(page.getByRole('heading', { name: 'AwqatSalah Cookbook' })).toBeVisible();
    await context.close();
  });
});
