import { expect, test } from '@playwright/test'

const routes = [
  { path: '/', name: 'home' },
  { path: '/auth', name: 'auth' },
  { path: '/preview/huddle', name: 'preview-huddle' },
]

for (const route of routes) {
  test(`${route.name} presents the screen-first frame cleanly on desktop`, async ({ page }, testInfo) => {
    await page.goto(route.path)

    const frame = page.getByTestId('phone-frame')
    await expect(frame).toBeVisible()

    const frameBox = await frame.boundingBox()
    expect(frameBox).not.toBeNull()
    expect(frameBox!.width).toBeGreaterThan(380)
    expect(frameBox!.width).toBeLessThan(450)
    expect(frameBox!.height).toBeGreaterThan(800)

    await frame.screenshot({ path: testInfo.outputPath(`${route.name}-phone-frame.png`) })
  })
}
