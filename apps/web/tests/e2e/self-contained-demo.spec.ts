import { expect, test } from '@playwright/test'

const parentRoutes = [
  { path: '/demo', heading: "This Week's Huddle" },
  { path: '/demo/actions', heading: 'What your family needs to do' },
  { path: '/demo/schedule', heading: 'Upcoming logistics' },
  { path: '/demo/volunteers', heading: 'Volunteer opportunities' },
  { path: '/demo/more', heading: 'Demo menu' },
  { path: '/demo/team', heading: 'Football program hub' },
  { path: '/demo/messages', heading: 'Announcements and alerts' },
  { path: '/demo/registration', heading: 'Ready-to-play checklist' },
  { path: '/demo/game-day', heading: 'Woodinville vs Bothell Cougars' },
  { path: '/demo/documents', heading: 'Forms and references' },
  { path: '/demo/emergency', heading: 'Safety guidance' },
  { path: '/demo/resources', heading: 'Program resource hubs' },
]

const adminRoutes = [
  { path: '/demo/admin', heading: 'Self-Contained Admin Demo' },
  { path: '/demo/admin/team', heading: 'Team Setup' },
  { path: '/demo/admin/families', heading: 'Families' },
  { path: '/demo/admin/messages', heading: 'Messages' },
  { path: '/demo/admin/game-day', heading: 'Game Day' },
  { path: '/demo/admin/actions', heading: 'Action Manager' },
  { path: '/demo/admin/calendar', heading: 'Calendar Manager' },
  { path: '/demo/admin/volunteers', heading: 'Volunteer Manager' },
]

test.describe('self-contained demo', () => {
  test('parent walkthrough routes render inside the phone frame without horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 430, height: 900 })

    for (const route of parentRoutes) {
      await page.goto(route.path)
      await expect(page.getByTestId('phone-frame')).toBeVisible()
      await expect(page.getByText(route.heading).first()).toBeVisible()

      const hasHorizontalOverflow = await page.evaluate(() => document.body.scrollWidth > window.innerWidth + 1)
      expect(hasHorizontalOverflow, `${route.path} should not horizontally overflow`).toBe(false)
    }
  })

  test('coach admin walkthrough stays in admin routes', async ({ page }) => {
    for (const route of adminRoutes) {
      await page.goto(route.path)
      await expect(page.getByRole('heading', { name: route.heading }).first()).toBeVisible()
    }

    await page.goto('/demo/admin')

    await page.getByRole('link', { name: /^Actions$/ }).click()
    await expect(page).toHaveURL(/\/demo\/admin\/actions$/)

    await page.goto('/demo/admin')
    await page.getByRole('link', { name: /^Calendar$/ }).click()
    await expect(page).toHaveURL(/\/demo\/admin\/calendar$/)

    await page.goto('/demo/admin')
    await page.getByRole('link', { name: /^Volunteer$/ }).click()
    await expect(page).toHaveURL(/\/demo\/admin\/volunteers$/)
  })

  test('coach can publish a simulated huddle update that appears for the parent demo', async ({ page }) => {
    await page.goto('/demo/admin')

    await page.getByLabel('Huddle title').fill('Locked demo coach update')
    await page.getByLabel('Summary').fill('This update was published from the coach demo and is visible to the parent demo.')
    await page.getByRole('button', { name: 'Publish to parent demo' }).click()
    await page.getByRole('link', { name: 'View parent demo' }).click()

    await expect(page).toHaveURL(/\/demo$/)
    await expect(page.getByText('Published in demo')).toBeVisible()
    await expect(page.getByText('Locked demo coach update')).toBeVisible()
    await expect(page.getByText('This update was published from the coach demo')).toBeVisible()
  })
})
