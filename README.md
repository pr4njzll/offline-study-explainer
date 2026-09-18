# Offline Study Explainer

A small command-line study helper that explains a topic in plain language. It runs the AI model on the user's device with Tether's QVAC SDK: no API key and no cloud AI service.

## What it uses

- QVAC SDK: `@qvac/sdk` version `0.19.1`
- QVAC functions: `loadModel` and `completion`
- Model: `LLAMA_3_2_1B_INST_Q4_0`

The model downloads on the first run, then is loaded and used locally by QVAC.

## Requirements

- Node.js 22.17 or newer (install the current LTS release from [nodejs.org](https://nodejs.org/))
- An internet connection for the one-time model download

## Install

```bash
npm install
```

## Run

```bash
npm start
```

Enter a study topic when prompted. For example: `photosynthesis` or `how recursion works`.

The first run can take a while because QVAC downloads the model. Later runs reuse the downloaded model.

## Privacy

The app does not send the prompt to an AI cloud API. QVAC performs the model inference locally on the computer.

## License

MIT. See [LICENSE](LICENSE).
