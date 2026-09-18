import { stdin as input, stdout as output } from 'node:process';
import { createInterface } from 'node:readline/promises';
import {
  completion,
  LLAMA_3_2_1B_INST_Q4_0,
  loadModel,
  unloadModel,
} from '@qvac/sdk';

const rl = createInterface({ input, output });
let modelId;

try {
  console.log('\nOffline Study Explainer');
  console.log('Runs QVAC inference on this computer. No API key is used.\n');
  console.log('Preparing the local model (the first run downloads it)...');

  modelId = await loadModel({
    modelSrc: LLAMA_3_2_1B_INST_Q4_0,
    onProgress: (progress) => {
      const percent = Math.round(progress.percentage);
      process.stdout.write(`\rModel download: ${percent}%`);
      if (percent >= 100) process.stdout.write('\n');
    },
  });

  const topic = await rl.question('\nWhat would you like explained? ');
  if (!topic.trim()) throw new Error('Please enter a topic and run the app again.');

  const history = [
    {
      role: 'user',
      content: `Explain "${topic}" to a beginner in 4 short bullet points. Use simple language.`,
    },
  ];

  console.log('\nLocal AI answer:\n');
  const result = completion({ modelId, history, stream: true });
  for await (const token of result.tokenStream) process.stdout.write(token);
  console.log('\n\nDone — this answer was generated on-device with QVAC.');
} catch (error) {
  console.error('\nApp error:', error.message ?? error);
  process.exitCode = 1;
} finally {
  rl.close();
  if (modelId) await unloadModel({ modelId, autoClose: true });
}
