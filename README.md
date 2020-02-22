_A simple simulation of flocking emojis created with create-react-app and react hooks, no physics libraries included._

I will demo it on YouTube soon. In the meantime you can clone the repo and check it out yourself.

This inspiration for this project came from Professor Shiffman, who is the author Nature of Code and the Coding Train YouTube channel. He has [a popular flocking simulation](https://www.youtube.com/watch?v=mhjuuHl6qHM) video where he uses P5.js to create the simulation in an OOP manner.

I wanted to create the same thing, but with emojis, and more functional programming oriented without any libraries. In the process of creating this, I got to research and review a lot of vector math I hadn't been exposed to since High School, as React obviously doesn't come with any vector math or physics helpers. I also got some good practice with React.

Additionally, the useAnimationFrame hook that is used in this project [was not created by me](https://codepen.io/HunorMarton/pen/zYONexq), but I am using it in accordance with the license, which you can find in the hook file itself. The hook is meant to be a simple wrapper around the requestanimationframe javascript method.

I'm not vouching for this project as being super performant or even on the same quality level as Mr. Shiffman's, but it was a fun learning project nonetheless. Feel free to modify it or use it in your own projects.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
