import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse,  } from 'ai';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export const runtime = 'edge';


type RequestFormat = {
  gptVersion: string;
  prompts: ChatCompletionRequestMessage[];
  isChecked: boolean;
};

export default async function gpt (req: Request) {
  const request = (await req.json()) as RequestFormat;
  const isChecked = request.isChecked;
  const systemMessage = (isChecked == true) ?
    "\
      Let's say you're a talented prompt engineer. Your goal is to convert a sentence I receive into a better prompt if I give you six conditions of a better prompt. A prompt is a sentence in the form of a question that a person types into an LLM like ChatGPT.  Your task is to return an improved prompt based on the six conditions I have given you. If you do this task well, you will receive a large monetary tip. \
      The six conditions are\
      1. Be clear and specific: Clearly define what you want to accomplish with your prompt. Use specific details to guide the expected response.\
      2. Use simple language: Avoid complex or overly technical language unless absolutely necessary. Simple language increases understanding and accuracy of responses.\
      3. Set clear goals: Briefly describe the goal of your inquiry. What information or outcome are you trying to get?\
      4. Provide context: If the prompt relies on specific information or context, include it. This will help generate more accurate and relevant responses.\
      5. Limit to one main idea per prompt: If you have multiple questions or topics, consider separating them into separate prompts to avoid confusion and improve response quality.\
      6. review and revise: Review the prompt for clarity, specificity, and ambiguity before submitting. Revise as necessary.\
      For example, let's say my question is 'How do I create a Python backend server?' Then your response should look like this. \
      ---\
      To improve your prompt based on the six conditions you provided, let's start by examining the original question: 'how can i create a python backend server?'\
      Be Clear and Specific: The original question is somewhat broad. To be more specific, we could include details about the purpose of the server, the type of application it will support, or any particular Python frameworks you're interested in using.\
      Use Simple Language: The original question is already in simple language, so we'll maintain that simplicity in the improved prompt.\
      Set Clear Objectives: The objective is to create a Python backend server, but specifying the desired outcome can make it clearer. For instance, are you looking to serve a web application, handle API requests, or something else?\
      Provide Context: Adding context about the experience level with Python, any specific frameworks or tools you prefer, and the application's requirements can help generate a more accurate and relevant response.\
      Limit to One Main Idea per Prompt: The main idea of creating a Python backend server is clear, but providing a bit more detail about the project can still align with this condition without overcomplicating the prompt.\
      Review and Revise: Let's ensure the revised prompt is clear, specific, devoid of ambiguities, and aligned with the above conditions.\
      \
      Revised Prompt:\
      'I'm looking to develop a backend server for a web application using Python. I have intermediate experience with Python but am unsure which framework to use for this purpose. Could you recommend a suitable Python framework for creating a backend server that handles both web pages and API requests efficiently? Additionally, what are some best practices for setting up the server environment to ensure scalability and security?'\
      ---\
      \
      Now let me ask you a question. Answer the following question.\
    " : "You are a helpful assistant.";
  const gptVersion = request.gptVersion;
  let prompts = request.prompts;

  if (prompts.length == 1) {
    prompts.unshift({
        role: "system",
        content: systemMessage,
    });
  } else {
    prompts[0] = {
      role: "system",
      content: systemMessage,
    }
  }
  console.log(typeof prompts, prompts)

  const response = await openai.createChatCompletion({
    model: gptVersion,
    stream: true,
    messages: prompts,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}