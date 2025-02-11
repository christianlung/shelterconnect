# ShelterConnect

Disaster Relief Platform for connecting Evacuees and Volunteers to Shelters

## To run locally

### Setting up

Create a `.env.local` file in the root directory with the following values (get them from our "Secrets" google doc):

```
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1I...
DATABASE_URL="mongodb://..."
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
