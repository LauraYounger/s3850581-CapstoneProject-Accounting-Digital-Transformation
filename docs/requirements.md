# Requirements Specification: Team Page & Login Styling

## Document Control
* **Project Name:** Accounting and Digital Transformation – Team 85 (Team Byte Size)
* **Author / BA:** My Huynh Ngoc Giang
* **Date:** Monday, 3 August 2026
* **Repository Path:** `docs/requirements.md`

---

## Executive Summary
This document defines the functional and non-functional requirements for restyling the existing Login page and creating a new Team Page for Team 85.

---

## Team Page Requirements

### Page Header Details
The Team Page must display global project metadata:
* **Team Name:** Team 85 (Team Byte Size)
* **Project Name:** Accounting and Digital Transformation

### Member Profile Fields
The page must render individual profile cards for all **5 team members** containing:
* **Name:** Full display name of the team member.
* **Photo / Headshot:** Profile image asset.
* **Role:** Assigned job title or designation.
* **About-Us Blurb:** Introductory biography or blurb.

### Layout & Edge Case Handling
* **Placeholder Avatar:** If a team member lacks a photo/headshot, the UI must display a standardized placeholder avatar.
* **Long Blurb Expansion:** Two team members have longer blurbs. Long text must truncate cleanly with an "Expand" button/toggle to show the full length on demand without breaking card alignment.

---

## Login Page & Flow Requirements

### Styling Scope
* Scope is strictly limited to UI/UX and visual styling (Bootstrap styling, colors, layout, and branding matching UX designs).

### System Logic Integrity
* **Zero Auth Changes:** No changes to backend authentication logic, credential validation, session persistence, or token handling.
* **Authentication Redirect:**
  * **Successful Login:** Redirects the user directly to the Team Page (`/team`) instead of the main dashboard.
  * **Unsuccessful Login:** Must not redirect to the Team Page or dashboard; must remain on `/login` and display an error state.
  * **Route Guarding:** Unauthenticated users attempting direct access to `/team` must be blocked and redirected back to `/login`.