# Datastore Does Not Support DynamoDB Version Control Pattern

I want to implement the DynamoDB number based versioning pattern with DataStore. There have been various github issues
on this already:
- https://github.com/aws-amplify/amplify-js/issues/7950
- https://github.com/aws-amplify/amplify-js/issues/8810

This reproducer demonstrates that DataStore cannot support more than one instance of `@model` with the same `id`, but 
this is precisely how one implements the DynamoDB number based versioning pattern.

My suspicion is that the bug is somewhere inside the indexeddb storage adapter which assumes that a model's primary
key is only defined by `model.id`.

## Usage

Start the application with `npm start` and then create `Tasks` with the different strategies to see the results. Code for the different strategies available in `src/saveStrategies`. 

There is code that can be uncommented in `App.tsx` to connect to a backend, but the same behavior is seen online and offline.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
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
