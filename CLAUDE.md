# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Aaradhna Ice Dish & Gola** — a vanilla JS, no-build-step point-of-sale system for a food stall. It is deployed as a static site (Vercel) backed by Firebase Realtime Database. There are no npm packages, no bundler, no TypeScript, and no framework.

## Running Locally

Open any `.html` file directly in a browser, or serve with any static file server:

```bash
npx serve .          # or python3 -m http.server 3000
```

For kiosk-printing mode on macOS (bypasses print dialog):

```bash
./direct-print.command    # opens localhost:3000 in Chrome/Edge with --kiosk-printing
```

## Deployment

Push to `main` on GitHub; Vercel auto-deploys. No build step — `vercel.json` is intentionally minimal (`buildCommand: ""`).

## Architecture

The app is a set of self-contained HTML + JS screens that all share `firebase-config.js` as the only dependency between them. There is no module system — each page has its own global scope.

### Screens

| File | Purpose |
|---|---|
| `index.html` / `app.js` | Primary billing terminal — create/edit orders, manage token queue, daily report |
| `prep.html` / `prep.js` | Prep team view — card per open order, tap to advance status |
| `kitchen.html` / `kitchen.js` | Kitchen display — read-only board showing Preparing and Ready orders |
| `owner.html` / `owner.js` | Owner analytics — item sales, payment breakdown, customer list |
| `menu.html` / `menu.js` | Admin menu editor — add/remove items and flavours |

### Firebase Data Structure (`aaradhana/`)

```
aaradhana/
  date          string  — YYYY-MM-DD of the current billing day
  nextToken     number  — auto-increment token counter (resets on Close Day)
  nextBill      number  — auto-increment bill counter (never resets)
  bills/        object  — today's bills keyed by bill.id (UUID)
  history/      object  — past days keyed by date, each containing bills object
  menu/         object  — menu items keyed by item.id (slug)
  flavours/     object  — { sweet: [...], khataMitha: [...] }
```

Firebase stores `bills` and `history` as objects (keyed by UUID), not arrays. `parseFirebaseData()` in `app.js` converts them to arrays on load. Always call `saveData()` which converts arrays back to objects before writing.

### Order Lifecycle

```
Pending → Preparing → Ready → Delivered
                            ↘ Cancelled (at any stage)
```

Status transitions in `app.js` write the full document via `saveData()`. The prep screen and individual status button handlers write only the status field directly (`db.ref("aaradhana/bills/${id}/status").set(status)`) for efficiency.

### Real-time Sync

Every screen attaches a Firebase `on("value", ...)` listener to the `aaradhana` node (or `aaradhana/bills` for kitchen/prep). All screens update live without page refresh.

### Cart Model

Each cart line item gets a unique `lineId` (`menuId-timestamp-random`) so the same menu item can appear multiple times with different flavours. The line `id` is ephemeral (not saved to Firebase); `menuId` is the stable menu item identifier.

## Key Patterns

- **No sanitization library** — `escapeHtml()` and `escapeAttr()` are hand-rolled in every JS file. Use them whenever inserting user-supplied text into innerHTML.
- **State is in `state` object** (`app.js`) — `state.cart`, `state.data`, `state.paymentMode`, `state.lastBill`, `state.editingBillId`.
- **Bill ID** format: `AID-YYYY-MM-DD-NNNN` (display only); internal ID is a UUID.
- **Token** format: zero-padded 3-digit number (`001`–`999`), resets daily on "Close Day".
- **Phone normalization**: 10-digit numbers get `91` prepended for WhatsApp deep links.
- **Day close**: moves today's bills to `history[date]`, resets `nextToken` to 1, preserves `nextBill`.
