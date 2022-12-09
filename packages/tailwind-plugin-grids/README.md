# `tailwind-plugin-grids`

Tailwindcss Plugin that adds support for the `grid` and `grid-area` properties.

## Installation

First, install the plugin with your favorite package manager:

```shell
# With PNPM
pnpm add -D tailwind-plugin-grids

# or Yarn
yarn add -D tailwind-plugin-grids

# or NPM
npm install -D tailwind-plugin-grids
```

Next, add the plugin to your Tailwind configuration:

```javascript
// tailwind.config.js or tailwind.config.cjs

/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...
  plugins: [require('tailwind-plugin-grids')],
}
```

## Configuration

### Grids

You can define your preset grids under the `grid` key in your theme config:

```javascript
// tailwind.config.js or tailwind.config.cjs

/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require('tailwind-plugin-grids')],
  theme: {
    grid: {
      'single-cell': 'main 1fr / 1fr',
      'auto-fluid': '"auto fluid" 1fr / auto minmax(0, 1fr)'
    }
  }
}
```

In your html, you can use the `grid-*` class to access them:

```html
<div class="grid grid-single-cell">
    <!-- ... -->
</div>
```

The plugin also supports arbitrary grids:

```html
<div class="grid grid-['left_right'_1fr_/_1fr_1fr]">
    <!-- ... -->
</div>
```

**Note**: remember to use `_` underscores where you would use spaces in CSS.

### Grid Areas

You can define your preset grid areas under the `gridArea` key in your theme config:

```javascript
// tailwind.config.js or tailwind.config.cjs

/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require('tailwind-plugin-grids')],
  theme: {
    gridArea: {
      main: 'main',
      auto: 'auto',
      fluid: 'fluid',
    }
  }
}
```

In your html, you can use the `grid-area-*` class to access them:

```html
<div class="grid-area-main">
    <!-- ... -->
</div>
```

The plugin also supports arbitrary grids:

```html
<div class="grid-area-[left]">
    <!-- ... -->
</div>
```

**Note**: remember to use `_` underscores where you would use spaces in CSS.