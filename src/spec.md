# Specification

## Summary
**Goal:** Build a single-page Valentine surprise prompt that asks “Will you be my Valentine?”, uses an evasive “No” button, and reveals a “Good choice” meme image after clicking “Yes”, all in a pink/white romantic theme.

**Planned changes:**
- Create a single-page UI with the question text and exactly two visible controls: “Yes” and “No”.
- Implement an evasive “No” button that moves away on desktop pointer approach and on touch press/tap attempts (iPad), staying within the viewport and avoiding overlap with the question and “Yes”.
- On “Yes” click/tap, transition the view to display a static meme image containing the exact text “Good choice”.
- Apply a consistent romantic pink/white visual theme with simple charming styling (rounded corners, gentle spacing/shadows).
- Add required generated images as static assets under `frontend/public/assets/generated` and reference them via static paths (no backend fetch).

**User-visible outcome:** On iPad Chrome or desktop, the user sees a Valentine question with “Yes” and a playful “No” that dodges interaction; selecting “Yes” shows a “Good choice” meme image.
