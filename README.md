This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Demo Link

[Deployed on Vercel](https://huddle01-project.vercel.app/)

## Technologies Used

### React

Provides virtual DOM to batch update the DOM.

### TypeScript

To ensure type safety across the codebase. Right now this codebase only has very few reusable types

### Zustand

For simple state management. Helps create custom hooks that manages and updates state by way of setters and getters.
The application currently has two stores.

1. UI Store: This store controls global state for UI elements like Sidebar whose current state needs to be accessible globally to all the other parts of the code.

2. Participants Store: Contains business logic regarding all aspects concerning meeting participants.

### TailwindCSS

Provides utility classes for a wide range of CSS rules.

## Components of the application

- Sidebar:

  - Renders a list of all the users in the meeting along with controls to toggle on/off video and audio for the user as well as remove the user.
  - Provides a button to add new users
  - Provides pagination to access the entire users list

- Meeting Controls:

  - This is a representative component with mock controls for the current user to toggle video and audio.
  - Provides button to open the Sidebar.

- Participants
  - Renders all the participants of the meeting as a grid with a maximum of 49 participant tiles shown at once.
  - Renders different layouts depending on the number of participants and the device size.
  - Shows participants with audio on as highlighted.
  - Shows participants with audio and video on as higher priority.
  - Also renders a tile for the current user.

## Features of the application

- Assigns a priority to all the participants based on whether they have switched on their audio and/or video.
- The highest priority is given to participants that have both audio and video on. These are shown as the first set of participants starting from the top left of the grid layout.
- The second highest priority is given to the participants that have either audio or video on.
- The third highest priority is given to the current user. This tile is always shown on the grid irrespective of whether the user has switched on audio or video. This is representative of how most video conferencing applications show audio and video feedback to the current user.
- If there are still grid spots left (from a maximum of 49) the other participants are shown.
- Whenever there is an update to the application state in the form of a participant switching on or off their video or audio the application tries to make the least amount of changes to the grid. This is so that the participants in the updated list of participants to show as tiles in the grid, that are already placed with the appropriate priority are not unnecessarily shifted. Rather only the position of minimum number of tiles is shifted.
- The application uses media queries to control which grid layout should be shown according to the number of participants in the call and the device size. The current implementation tries to ensure the best possible grid layout depending on the number of participants and device.
