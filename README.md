# Courtyard Game World

Implement the uploaded courtyard artwork as the visual environment of a 2D game scene using Phaser 3.

Technical requirements:

Load the artwork as a dedicated environment layer inside the game canvas, not as a CSS background.

Preserve the original image quality, aspect ratio, and perspective.

Implement responsive scaling and positioning for different mobile screen sizes.

Use a consistent world coordinate system independent of screen resolution.

Define a playable area and boundaries within the courtyard.

Reserve the floor area for future character positioning and movement.

Prepare depth sorting so future characters can appear naturally at different distances.

Support character scaling based on their position to simulate perspective.

Keep the camera and viewport architecture ready for future movement and zoom.

Allow future character sprites, shadows, animations, and interactive objects to be rendered above the environment layer.

Optimize rendering for mobile browsers.

For now, display only the empty courtyard. Do not add characters, furniture, UI, or multiplayer features.

Important: The artwork should remain unchanged. Build the technical environment around it so it can serve as the foundation of a future interactive social world.



This is just a construction site, no databases or anything.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a2567a7d-3650-4a40-89ba-8618ed719dc5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
