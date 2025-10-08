'use server';
/**
 * @fileOverview Converts text to speech using a TTS model.
 *
 * - generateAudioFromText - A function that handles text-to-speech conversion.
 * - GenerateAudioFromTextInput - The input type for the function.
 * - GenerateAudioFromTextOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import wav from 'wav';
import { googleAI } from '@genkit-ai/google-genai';

const GenerateAudioFromTextInputSchema = z.string();
export type GenerateAudioFromTextInput = z.infer<
  typeof GenerateAudioFromTextInputSchema
>;

const GenerateAudioFromTextOutputSchema = z.object({
  audio: z.string().describe('Base64 encoded WAV audio data URI.'),
});
export type GenerateAudioFromTextOutput = z.infer<
  typeof GenerateAudioFromTextOutputSchema
>;

export async function generateAudioFromText(
  input: GenerateAudioFromTextInput
): Promise<GenerateAudioFromTextOutput> {
  return generateAudioFromTextFlow(input);
}

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: Buffer[] = [];
    writer.on('error', reject);
    writer.on('data', (d) => {
      bufs.push(d);
    });
    writer.on('end', () => {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const generateAudioFromTextFlow = ai.defineFlow(
  {
    name: 'generateAudioFromTextFlow',
    inputSchema: GenerateAudioFromTextInputSchema,
    outputSchema: GenerateAudioFromTextOutputSchema,
  },
  async (query) => {
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: query,
    });
    if (!media) {
      throw new Error('no media returned');
    }
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    return {
      audio: 'data:audio/wav;base64,' + (await toWav(audioBuffer)),
    };
  }
);
