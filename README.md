# Inter-React-ive Oscillator

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

First attempt at a react component using webAudioAPI to create an interactive Oscillator react component.

This project uses [pnpm](https://pnpm.io/) for package management.
* To install this globally run `npm i -g pnpm`

## Screenshots
### Singular `InteractiveOscillator`
![Single Oscillator](./screenshots/osc.png)
### Default `App.js`
![Triple Oscillator](./screenshots/tri_osc.png)
### Example Spectrogram
![recording](./screenshots/output_spect.png)


## Sandbox (Easiest way to get an idea of the project)
* Try out the `inter-reactive-oscillator` is to try it in [this Sandbox](https://codesandbox.io/p/github/jordyjwilliams/inter-reactive-oscillator/main/)

## Available `pnpm` Scripts
For development and building:
* `pnpm start`: runs default app in development mode. Server will be started at http://localhost:3000.
    * By default 3 nested interactive oscillator objects will be generated in columns.
* `pnpm test`: launches the test runner *TODO*
* `pnpm run build`: Builds the app for production to a `build` directory.
    * Bundles React in production mode
    * Optimizes for the best performance.
    * Build minified, filenames include hashes.

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
