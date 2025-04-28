// import { NextResponse } from 'next/server';
// import axios from 'axios';

// export async function POST(req) {
//   const { userInput } = await req.json();

//   try {
//     const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
//       model: 'llama3-8b-8192',
//       messages: [
//         { role: 'user', content: userInput }
//       ],
//       temperature: 0.5,
//     }, {
//       headers: {
//         'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
//         'Content-Type': 'application/json',
//       }
//     });

//     const aiMessage = response.data.choices[0].message.content;
//     return NextResponse.json({ aiResponse: aiMessage });
//   } catch (error) {
//     console.error('GROQ API Error:', error.response?.data || error.message);
//     return NextResponse.json({ error: 'Failed to fetch AI response' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
  const { userInput } = await req.json();

  // Prepare strict prompt
  const formattedPrompt = `
You are an AI assistant.
Given the following feeling text: "${userInput}" 
- Summarize the feeling into exactly 3 short keywords (1 word each).
- Write a comforting motivational quote (1-2 short sentences).

Return the result in STRICT JSON format ONLY, like:
{
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "quote": "Your quote here."
}

Important rules:
- Do NOT add any text before or after the JSON.
- No explanations.
- No markdown formatting.
Only output pure, raw JSON.
`;

  try {
    const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: 'llama3-8b-8192', // 🛠 updated working model
      messages: [
        { role: 'user', content: formattedPrompt }
      ],
      temperature: 0.5,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      }
    });

    const aiMessage = response.data.choices[0].message.content;
    return NextResponse.json({ aiResponse: aiMessage });
  } catch (error) {
    console.error('GROQ API Error:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to fetch AI response' }, { status: 500 });
  }
}

