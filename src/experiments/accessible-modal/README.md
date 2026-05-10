# Modal — Accessibility Implementation

## 1. ARIA attributes
- `role="dialog"` + `aria-modal="true"` on the overlay
- `aria-labelledby` pointing to the title element
- `aria-describedby` pointing to the content element

## 2. Focus management
- Auto-focus the close (X) button on mount via `useRef` + `.focus()`
- Capture `document.activeElement` before opening (stored in a ref)
- Restore focus to the trigger element on unmount via the `useEffect` cleanup

## 3. Keyboard handling
- `keydown` listener for Escape to call `onCancel`

## 4. Focus trapping
- On Tab/Shift+Tab, query focusable elements inside `.modal` (`button, [tabindex]:not([tabindex="-1"])`)
- Wrap focus: Tab on last → first, Shift+Tab on first → last
- `event.preventDefault()` stops the browser from moving focus outside

## 5. Close on overlay click
- `onClick` on the overlay div
- Only call `onCancel` when `e.target === overlayRef.current` (click landed on the backdrop, not the modal content)
