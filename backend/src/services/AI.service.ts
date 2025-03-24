import { error } from 'console';
import 'dotenv/config';
export const fetchToHuggingFace = async (prompt: string) => {
  const input = `Hey there! You are a blog writer. Write a blog post based on this prompt: ${prompt}\n\nPrompt:`;
  try {
    const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: input,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Hugging Face error:', errorData.error || errorData.detail);
      throw new Error('Hugging Face error: ' + (errorData.error || errorData.detail));
    }
    const data = await response.json();
    console.log(data);
    const content = data?.[0]?.generated_text as string;
    if (content.startsWith(input)) {
      return content.substring(input.length);
    } else {
      return content;
    }
  } catch (err) {
    console.error(err);
    throw error;
  }


}