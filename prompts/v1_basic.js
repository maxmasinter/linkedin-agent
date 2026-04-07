require('dotenv').config();
const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// PROMPT TEMPLATE 1: Lesson Learned Post
const prompt1 = `
ROLE: You are a LinkedIn content expert who writes engaging, human posts.

TASK: Write a LinkedIn post about a professional lesson learned.
The lesson is: "Starting small is better than waiting for the perfect moment."

FORMAT:
- Start with a short punchy hook (one line)
- 3-4 short paragraphs, max 2 sentences each
- End with a question to spark comments
- Total length: 150-200 words
- No hashtags
`;

// PROMPT TEMPLATE 2: Tips Post
const prompt2 = `
ROLE: You are a LinkedIn content expert who writes engaging, human posts.

TASK: Write a LinkedIn post sharing 3 practical tips about productivity.

FORMAT:
- Start with a bold claim or surprising statement
- List exactly 3 tips, each on its own line with a number
- One sentence explanation for each tip
- End with a one-line takeaway
- Total length: 150-200 words
- No hashtags
`;

// PROMPT TEMPLATE 3: Story Post
const prompt3 = `
ROLE: You are a LinkedIn content expert who writes engaging, human posts.

TASK: Write a LinkedIn post that tells a short story about overcoming a challenge at work.

FORMAT:
- Open with the moment of struggle (one line)
- Build the story in 2-3 short paragraphs
- End with what you learned
- Last line should be a reflection or question
- Total length: 150-200 words
- No hashtags
`;

// Run all 3 prompts and print results
async function main() {
  const prompts = [
    { name: 'TEMPLATE 1: Lesson Learned', prompt: prompt1 },
    { name: 'TEMPLATE 2: Tips Post', prompt: prompt2 },
    { name: 'TEMPLATE 3: Story Post', prompt: prompt3 },
  ];

  for (const item of prompts) {
    console.log('\n' + '='.repeat(50));
    console.log(item.name);
    console.log('='.repeat(50));

    const message = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 1024,
      messages: [
        { role: 'user', content: item.prompt }
      ],
    });

    console.log(message.content[0].text);
  }
}

main();