# Woodinville Brand Reference

Reference for matching Gridiron Connect to the public Woodinville Football site.

Primary source:
- https://www.woodinvillefootball.com/

Public brand assets observed from the live site:
- Primary `W` logo: https://images.squarespace-cdn.com/content/v1/5c721a23348cd924480428cd/30d8ca15-7bab-4070-87bf-7341312e4b6f/W.png
- WHS Football logo: http://static1.squarespace.com/static/5c721a23348cd924480428cd/t/5ec2d313066037489e0c991f/1742579649888/WHS+Football+logo.png?format=1500w
- 44 Strong graphic: https://images.squarespace-cdn.com/content/v1/5c721a23348cd924480428cd/1551477891403-OI8KT5RPMS0YI0MXQO7S/44strong-grey.png

Fonts loaded by the public site:
- `Oswald`
- `Alice`
- `Abel`

## Brand Read

The public site feels:
- Bold, school-program-first, and logo-led
- Clean white and gray with strong green accents
- Headline-heavy rather than app-minimal
- Athletic without looking like generic pro-sports software

Gridiron Connect should match that tone while becoming more operational and mobile-friendly.

## Recommended Tokens

These are the app tokens we should standardize around for the rebuild.

```css
:root {
  --color-brand-green-950: #052e1b;
  --color-brand-green-900: #064725;
  --color-brand-green-800: #075c31;
  --color-brand-green-700: #08743d;
  --color-brand-green-600: #0a8a49;
  --color-brand-green-500: #18a65b;
  --color-brand-green-100: #dff4e8;
  --color-brand-green-50: #f0fbf5;

  --color-brand-navy-900: #1e3a8a;
  --color-brand-navy-700: #1d4ed8;
  --color-brand-navy-100: #dbeafe;

  --color-brand-gold-500: #d6a820;
  --color-brand-gold-100: #fbf0c9;

  --color-ink-950: #111827;
  --color-ink-800: #1f2937;
  --color-ink-700: #374151;
  --color-ink-600: #4b5563;
  --color-ink-500: #6b7280;
  --color-ink-300: #d1d5db;
  --color-ink-200: #e5e7eb;
  --color-ink-100: #f3f4f6;
  --color-ink-50: #f9fafb;

  --color-white: #ffffff;
  --color-danger-600: #dc2626;
  --color-danger-100: #fee2e2;
}
```

## Typography

Use the live-site fonts with clearer product roles:

- `Oswald` for app identity, major page titles, and key athletic callouts
- `Abel` for navigation, buttons, labels, and compact operational metadata
- `Alice` sparingly for editorial or ceremonial content such as highlights or legacy sections

Recommended mapping:

```text
font-display: Oswald
font-sans: Abel
font-editorial: Alice
```

Rules:
- Avoid using `Alice` for dense UI or forms
- Keep operational surfaces readable first
- Let `Oswald` carry brand voice, not every heading

## Logo Guidance

Use:
- `W.png` as the default in-app identity mark
- WHS Football logo for auth, splash, and higher-brand screens
- 44 Strong only as supporting artwork, not the primary app mark

Rules:
- Do not invent alternate logo colors
- Keep enough whitespace around the `W`
- Prefer flat placement on white, green, or very light neutral backgrounds

## Icon Style

Current Lucide icons are acceptable for product UI.

Stylistic target:
- Thin-to-regular stroke
- Clean and modern
- Functional, not mascot-themed

Do not try to make app icons mimic the wing artwork from the public site.

## Spacing and Shape

The public site uses generous whitespace and simple block structure. For the app:

- Base spacing: 4px scale
- App padding: 16px mobile, 24px desktop
- Row height minimum: 64px
- Button radius: 6px
- Card radius: 8px
- Prefer borders over shadows

## Background and Imagery

The public site uses:
- White and light gray foundations
- Large photography and logo moments
- Minimal decorative gradients

For the app:
- Use white and `ink-50` as primary backgrounds
- Reserve full-bleed imagery for auth, onboarding, or high-level hero moments
- Keep day-to-day screens flatter and more operational

## Practical Translation For Gridiron Connect

Match stylistically by doing this:
- Use the same font family stack as the public site
- Keep Woodinville green as the dominant interaction color
- Introduce navy as a secondary accent, especially for logo-adjacent treatments
- Use gold for deadlines and special emphasis, not as a large background color
- Keep dense parent/admin surfaces clean, white, and scannable

Avoid this:
- Generic SaaS blues and purples
- Heavy gradients or glossy sports-dashboard effects
- Overusing decorative football imagery in operational screens
- Replacing the public-site brand voice with minimalist startup styling
