# Test Execution Report: Flow & Edge Cases

## 1. Overview
* **Tester / Role:** Laura Younger (Dev 1)
* **Execution Dates:** August – September 2026
* **Live Deployed URL:** `https://s3850581-capstone-project-accountin.vercel.app`
* **Repository Path:** `docs/test-report-flow.md`

---

## 2. Test Execution Summary

| Test Case | Automation Script | Target Route | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Valid Login Redirect** | `tests/flow.spec.js` | `/login` $\rightarrow$ `/team` | Valid credentials redirect user to Team Page. | **PASS** |
| **Invalid Login Guard** | `tests/edge.spec.js` | `/login` | Failed login displays error message; no redirect occurs. | **PASS** |
| **Route Security** | `tests/edge.spec.js` | `/team` | Unauthenticated direct access redirects to `/login`. | **PASS** |
| **Missing Photo Fallback** | `tests/edge.spec.js` | `/team` | Temporary placeholder avatar displays seamlessly. | **PASS** |
| **Long Blurb Expand** | `tests/edge.spec.js` | `/team` | Expand button toggles full blurb text length. | **PASS** |

---

## 3. Verification & Deployment Status
All core paths and edge cases pass automated testing via Playwright. Deployment on Vercel is live, verified, and functioning without errors.