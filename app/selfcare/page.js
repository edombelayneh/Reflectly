// 'use client';

// import React, { useEffect, useState } from 'react';
// import {
//   Container, Typography, Box, List, ListItem, ListItemText, Button, CircularProgress, IconButton
// } from '@mui/material';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { useRouter } from 'next/navigation';

// export default function SelfCarePage() {
//   const [data, setData] = useState(null);
//   const [plan, setPlan] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     try {
//       const stored = localStorage.getItem('moodData');
//       if (!stored) {
//         router.push('/moodCheckIn');
//         return;
//       }

//       const parsed = JSON.parse(stored);
//       if (!parsed?.energy || !parsed?.time || !parsed?.feeling) {
//         throw new Error("Incomplete moodData");
//       }

//       setData(parsed);

//       const { energy, time, feeling } = parsed;
//       const keywords = feeling.split(/\s+/).map(w => w.toLowerCase());

//       let suggestions = [];

//       if (energy === 'low') {
//         suggestions = [
//           "🧘 5 mins of deep breathing",
//           "🎵 Listen to a calming playlist",
//           "📓 Journal: 'What emotion do I need to release?'"
//         ];
//       } else if (energy === 'medium') {
//         suggestions = [
//           "🙆‍♂️ Try a 5-minute stretch",
//           "✍️ List 3 things you're grateful for",
//           "🌿 Step outside for fresh air"
//         ];
//       } else {
//         suggestions = [
//           "💃 Do a short dance workout",
//           "🧠 Plan a tiny goal for the week",
//           "🎨 Work on a fun creative project"
//         ];
//       }

//       const maxActivities = time >= 15 ? 3 : 2;
//       setPlan(suggestions.slice(0, maxActivities));

//     } catch (err) {
//       console.error("Error loading moodData:", err);
//       router.push('/mood-checkin');
//     }
//   }, []);

//   const handleFinish = () => {
//     router.push('/dashboard');
//   };

//   const handleBack = () => {
//     router.back();
//   };

//   if (!data) {
//     return (
//       <Container sx={{ py: 6 }}>
//         <CircularProgress />
//       </Container>
//     );
//   }

//   return (
//     <Container sx={{ py: 6 }}>
//       <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//         <IconButton onClick={handleBack} sx={{ mr: 1 }}>
//           <ArrowBackIcon />
//         </IconButton>
//         <Typography variant="h4">
//           Your Self-Care Plan 💖
//         </Typography>
//       </Box>

//       <Box sx={{ my: 4 }}>
//         <List>
//           {plan.map((item, index) => (
//             <ListItem key={index}>
//               <ListItemText primary={item} />
//             </ListItem>
//           ))}
//         </List>
//       </Box>

//       <Button
//         variant="contained"
//         onClick={handleFinish}
//         sx={{ borderRadius: 4 }}
//       >
//         Done
//       </Button>
//     </Container>
//   );
// }

'use client';

import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Box, List, ListItem, ListItemText, Button, CircularProgress, IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function SelfCarePage() {
  const [data, setData] = useState(null);
  const [plan, setPlan] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchPlan() {
      try {
        const stored = localStorage.getItem('moodData');
        if (!stored) {
          router.push('/moodCheckIn');
          return;
        }

        const parsed = JSON.parse(stored);
        if (!parsed?.energy || !parsed?.time || !parsed?.feeling) {
          throw new Error("Incomplete moodData");
        }

        setData(parsed);

        // Ask AI to generate personalized self-care plan
        const aiPrompt = `
Given this information:
- Feeling: "${parsed.feeling}"
- Energy level: "${parsed.energy}"
- Time available: ${parsed.time} minutes

Create a short self-care plan personalized to the user's situation. 
Suggest 2-4 activities they could do right now.

Important rules:
- Output must be a strict JSON array of activities.
Example:
["🧘 5 mins deep breathing", "🎵 Listen to a calming playlist", "✍️ Journal your thoughts"]
- No extra text, no explanations, no markdown, no formatting. Only pure JSON array.
`;

const response = await axios.post('/api/ask', { userInput: aiPrompt });

let aiPlan;
try {
  const parsedResponse = JSON.parse(response.data.aiResponse);

  if (Array.isArray(parsedResponse)) {
    // Old style (direct array)
    aiPlan = parsedResponse;
  } else if (parsedResponse.activities && Array.isArray(parsedResponse.activities)) {
    // New style (inside object)
    aiPlan = parsedResponse.activities;
  } else {
    throw new Error('AI response does not contain activities array.');
  }
} catch (err) {
  console.error('Failed to parse AI plan response:', response.data.aiResponse);
  aiPlan = [
    "🧘 5 mins deep breathing", 
    "🌿 Step outside for fresh air", 
    "🎵 Listen to a calming playlist"
  ]; // fallback plan
}

setPlan(aiPlan);
setLoading(false);


      } catch (err) {
        console.error("Error loading moodData:", err);
        router.push('/moodCheckIn');
      }
    }

    fetchPlan();
  }, [router]);

  const handleFinish = () => {
    router.push('/dashboard');
  };

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <Container sx={{ py: 6 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ py: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={handleBack} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">
          Your Personalized Self-Care Plan 💖
        </Typography>
      </Box>

      <Box sx={{ my: 4 }}>
        <List>
          {plan.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Button
        variant="contained"
        onClick={handleFinish}
        sx={{ borderRadius: 4 }}
      >
        Done
      </Button>
    </Container>
  );
}

