# ShelterConnect

Disaster Relief Platform for connecting Evacuees and Volunteers to Shelters

## Directory Structure

```
shelterconnect/
├── app/                 # Main application code, React components and pages
├── components/         # Reusable UI components (Material UI)
├── lib/               # Utility functions and libraries
├── prisma/            # Database schema (Prisma ORM)
├── public/            # Static assets (images, fonts, icons)
├── stories/           # Storybook stories for UI component testing
├── types/             # TypeScript type definitions
├── utils/             # Utility functions and helpers
└── .storybook/        # Storybook configuration files
```

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
