# Login and Team Page Requirements

## Overview
This feature consists of a restyled login page and a new team page. The login page is an existing page that will only be restyled, while the team page is a new page in the application. The team page allows users to view the team members and their roles within project group number 85. Each team member will have a profile picture, name, role and a blurb. Users are redirected to the team page after a successful valid login and is unaccessible without a valid login. 

## functional Requirements

### Login page

- The existing authentication flow must remain untouched and working.
- Users must be able to login with their credentials using the existing login methods.
- The login page must redirect the logged in user to the team page only if the login is successful.
- Existing authentication validation and error handling must remain intact and working.
- The login page must be restyled to match the new design specifications that have been agreed upon by the design team and approved.

### Team page

- A team page is available at the route `/team`.
- The team page is only accessible to logged in users. If a user is not logged in, they should be redirected to the login page.
- The team page must display each member of project group number 85 with the following information:
  - Profile picture
  - Name
  - Role
  - Blurb (a short description)
  - The page must be styled according to the new design specifications that have been agreed upon by the design team and approved and follow the login page styling.
  - the page must be accessible after successful login authentication has been completed.

  ## Non-functional Requirements

  - The built feature must use the existing authentication flow and must not break any existing functionality.
  - The built feature must use the existing Next.js boilerplate.
  - The feature must follow the existing code style and design conventions used in the project.
  - All tests including Typescript, linting, production build tests, and unit tests must pass successfully.
  - When production build is run, the feature must not break the production build and must pass all production build tests.

  ## Acceptance Criteria

  The feature is considered complete when the following acceptance criteria are met:

  - The login page and team page styling matched the agreed design specifications approved by the design team.
  - Authentication flow is not broken or altered in any way and remains functional.
  - Successful login redirects the user to the team page.
  - The team page is only accessible to logged in users and redirects unauthenticated users to the login page.
  - The team page displays all members of project group number 85 with their profile picture, name, role, and blurb.
  - All tests pass successfully, including Typescript, linting, production build tests, and unit tests.
  - The production build passes all tests and does not break any existing functionality.
  - The feature follows the existing code style and design conventions used in the project.
  - Deployment and live URL of the feature in the production environment is successful and functions correctly in the production environment without any issues or errors.