# Inter-React-ive Oscillator

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

First attempt at a react component using webAudioAPI to create an interactive Oscillator react component.

This project uses [pnpm](https://pnpm.io/) for package management.
* To install this globally run `npm i -g pnpm`

## Examples
### Sandbox
Try it out using [this Sandbox](https://codesandbox.io/p/github/jordyjwilliams/inter-reactive-oscillator/main/)
### Singular `InteractiveOscilator`
![Single Oscillator](./screenshots/osc.png)
### Default `App.js`
![Triple Oscillator](./screenshots/tri_osc.png)
### Example Spectrogram
![recording](./screenshots/output_spect.png)

## Available Scripts

In the project directory, you can run:

### `pnpm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

By default 3 nested interactive oscillator objects will be generated in columns.

### `pnpm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

**Not currently working**

### `pnpm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Notes
* This is still very much in a demo state
* Quick proof of concept/tutorial/teaching aid for myself.

## TODO
### UI
* add CSS / make this look nice
* osc/scope to view created waveform in realtime

### Audio
* Global play/pause --> [in progress](https://github.com/jordyjwilliams/inter-reactive-oscillator/tree/global_play_pause)
* Gain sliders for each osc

### Testing
* add/fix tests
