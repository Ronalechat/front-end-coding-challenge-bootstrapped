# Propeller Front End Coding Challenge

## Background

Commonly large datasets like maps (2D or 3D) are broken down into chunks with varying levels of detail. You will already be familiar with this concept in e.g. Google Maps, where you can zoom out to see the whole world in low detail. Zoom in and you can see your house. [This blog post](https://macwright.org/2012/05/15/how-web-maps-work.html) provides a good overview.

## The Challenge

We've tiled a high res image into a set of tiles in the 'tiled' folder found in `public/tile-assets` (un-tiled.jpg is just for reference). The task is to create a front-end application that displays the tiles in the style of a 2D map view. We have bootstrapped the application for you (with create-react-app) which provides some basic functionallity such as zooming on scroll and basic panning.

Please avoid using existing mapping frameworks such as Leaflet, Mapbox etc. The app should be self contained and simple for us to build and run (e.g. provide npm install/build/start).

## Tasks

- Fix the bug preventing panning from being in a natural direction
- Allow zooming using +/- buttons.
- Implement zooming that holds the center of the viewport the same. The point on the image at the center of the viewport should be maintained when zooming in and out, just like the functionallity in Google Maps.
- Implement smooth scrolling so instead of snapping between zoom levels provide a gradual transition

## Considerations

- Consider how your app is built.
- Consider coding style (e.g. robustness and maintainability).
- Block in some simple tests.
- Any other extensions you think would demonstrate your ninja coding skills and how you will be an awesome addition to the Propeller team.

That is a long list of things, and we are aware of the fact that your time is limited. Therefore, please let us know some of the tradeoffs that you have made, what you have focussed on and what you have ignored for now.

## Post challenge notes

I tried doing this challenge in the vanilla TS way, to see what I could achieve out of the box, and also staying healthily in the constraints setout of not using external packages to achieve the goal.

The first task was easy, as I've played enough video games to know what inverted controls feels like. I simply swapped the '-' values to '+' when it came to panning.

I then added keydown listeners, and a basic button component in order to satisfy the second task. I had to extrapolate the existing zoom state changes in order to make this work, as well as rejig some of the conditional requirements of the state change(s).

The latter 2 tasks were much more challenging, I feel like I achieved them both, but perhaps not to the level I would like;
The smooth scrolling was achieved by delaying the re-render with an additional state of "toggle", combined with a setTimeout, some CSS keyframe animations, and conditional class assignment (based on the toggle state). There is still a flicker in the re-render, that may be able to be solved with a useLayoutEffect and some grit, but I had to time box this to be reasonable - so not today :'(

Zooming and holding the center of the viewport was also quite challenging. This took a bit of study to learn how we calculate relative centers for viewports, image offsets, and scaling. Phew! Once I had garnered a basic understanding, I tried using what what was already there. The ultimate solution does feel a bit hacky for my taste, but I think the solution does address the task. This is achieved my altering the origin with the existing viewport values, and an understanding that the scaling of the images is doubled or halved for zoom in and out respectively. Perhaps breaking the values down further, could introduce a greater level of accuracy, but once again - time boxed out of respect for the challenge.

As far as tests go, I added in some rudementary type tests, basic stuff I would want to know from the get go, til I started breaking in other ways... So I can write more tests for those said other ways.
