# ShelterConnect

Disaster Relief Platform for connecting Evacuees and Volunteers to Shelters

## Directory Structure
app/: Contains the main application code for the platform, including React components and pages.

components/: Contains reusable UI components for the platform (made with Material UI components).

lib/: Includes utility functions and libraries used across the project.

prisma/: Manages database schema and migrations using Prisma ORM.

public/: Stores static assets such as images, fonts, and icons.

stories/: Houses Storybook stories for UI component testing.

types/: Contains TypeScript type definitions for the project.

.storybook/: Configuration files for Storybook, a tool for developing UI components in isolation.


## To run locally

### Setting up

Create a `.env.local` file in the root directory with the following values (get them from our "Secrets" google doc):

```
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1I...

DATABASE_URL="mongodb://..."

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/role-selection
```

Run the setup command to install dependencies and generate the Prisma client:

```
npm run setup
```

Install dependencies using:

```
npm install
```

### Storybook testing

We can use Storybook to test individual components without running the entire app:

```
npm run storybook
```

### Running locally

```
npm run dev
```
