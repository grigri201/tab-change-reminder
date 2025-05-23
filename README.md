# ChatGPT Watchdog

ChatGPT Watchdog is a simple browser extension that plays a short sound when ChatGPT has finished generating a response. It injects a content script into `chatgpt.com` that watches the page and notifies you once the "Stop generating" button disappears.

## Features

- Detects when ChatGPT finishes answering
- Plays an audible notification
- Popup page to toggle the reminder on or off
- Built with React, TypeScript and Vite

## Directory structure

- `pages/content` – content script executed on `chatgpt.com`
- `pages/popup` – popup UI for enabling or disabling the reminder
- `chrome-extension` – shared code and build configuration

## Getting started

1. Install [pnpm](https://pnpm.io/) and ensure Node.js `>=22.12.0`.
2. Run `pnpm install` to install dependencies.
3. Start development with `pnpm dev`.
4. Load the extension from the generated `dist` folder via `chrome://extensions`.

For a production build, run `pnpm build`.

## License

[MIT](LICENSE)
