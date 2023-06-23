<h1 align="center">
  <a href="https://bodhivb.github.io/pixel-schedule/"><img src="https://bodhivb.github.io/pixel-schedule/assets/outdoors/tree.png" alt="Pixel Schedule - page"></a>
  <br>
  Pixel Schedule
  <br>
</h1>

<h4 align="center">An interactive SintLucas pixel schedule.</h4>

<div align="center">
  <a href="https://github.com/bodhivb/pixel-schedule">
    <img src="https://img.shields.io/github/package-json/v/Bodhivb/pixel-schedule?style=flat-square" alt="Github version">
  </a>

  <a href="https://github.com/bodhivb/pixel-schedule/actions/workflows/deploy.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/Bodhivb/pixel-schedule/deploy.yml?branch=production&style=flat-square" alt="Discord Server">
  </a>

  <a href="https://bodhivb.github.io/pixel-schedule">
    <img src="https://img.shields.io/website?down_message=offline&style=flat-square&up_message=online&url=https%3A%2F%2Fbodhivb.github.io%2Fpixel-schedule%2F" alt="Website">
  </a>
</div>

# Overview

Pixel Schedule is an interactive gamification platform for school schedule. Here you can see where each teacher is and which lesson is being taught in the classroom. It is linked to the Magister app and keeps us informed of changes through fun interactive effects and notifications.

# Access schedule data

To handle the school schedule data, we've created a small temporary workaround that connects our webapp directly to the Xedule API.
For a temporarily bypass of the standard cross-origin security, use the following command in CMD:

    start chrome.exe --user-data-dir="c:/temp/chrome" --disable-web-security https://bodhivb.github.io/pixel-schedule/ --kiosk

Caution: don't disable web security on other sites without understanding their source code, as it can expose you to security risks.

# For developers

The webapp is written in TypeScript using [PixiJS](https://github.com/pixijs/pixijs) v7. When building the project, TypeScript files are compiles to JavaScript and all code is bundled into one minified file using [Webpack](https://github.com/webpack/webpack).

If you have any questions? Feel free to contact me via Discord [Bodhi#0001](https://discord.com/users/151423248020537345).
Your feedbacks are welcome! :)
