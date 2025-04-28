// 'use client';

// import React, { useEffect, useState } from 'react';
// import {
//   Container, Typography, Box, List, ListItem, ListItemText, Button, CircularProgress, IconButton
// } from '@mui/material';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';

// export default function SelfCarePage() {
//   const [data, setData] = useState(null);
//   const [plan, setPlan] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     async function fetchPlan() {
//       try {
//         const stored = localStorage.getItem('moodData');
//         if (!stored) {
//           router.push('/moodCheckIn');
//           return;
//         }

//         const parsed = JSON.parse(stored);
//         if (!parsed?.energy || !parsed?.time || !parsed?.feeling) {
//           throw new Error("Incomplete moodData");
//         }

//         setData(parsed);

//         // Ask AI to generate personalized self-care plan
//         const aiPrompt = `
// Given this information:
// - Feeling: "${parsed.feeling}"
// - Energy level: "${parsed.energy}"
// - Time available: ${parsed.time} minutes

// Create a short self-care plan personalized to the user's situation. 
// Suggest 2-4 activities they could do right now.

// Important rules:
// - Output must be a strict JSON array of activities.
// Example:
// ["🧘 5 mins deep breathing", "🎵 Listen to a calming playlist", "✍️ Journal your thoughts"]
// - No extra text, no explanations, no markdown, no formatting. Only pure JSON array.
// `;

// const response = await axios.post('/api/ask', { userInput: aiPrompt });

// let aiPlan;
// try {
//   const parsedResponse = JSON.parse(response.data.aiResponse);

//   if (Array.isArray(parsedResponse)) {
//     // Old style (direct array)
//     aiPlan = parsedResponse;
//   } else if (parsedResponse.activities && Array.isArray(parsedResponse.activities)) {
//     // New style (inside object)
//     aiPlan = parsedResponse.activities;
//   } else {
//     throw new Error('AI response does not contain activities array.');
//   }
// } catch (err) {
//   console.error('Failed to parse AI plan response:', response.data.aiResponse);
//   aiPlan = [
//     "🧘 5 mins deep breathing", 
//     "🌿 Step outside for fresh air", 
//     "🎵 Listen to a calming playlist"
//   ]; // fallback plan
// }

// setPlan(aiPlan);
// setLoading(false);


//       } catch (err) {
//         console.error("Error loading moodData:", err);
//         router.push('/moodCheckIn');
//       }
//     }

//     fetchPlan();
//   }, [router]);

//   const handleFinish = () => {
//     router.push('/dashboard');
//   };

//   const handleBack = () => {
//     router.back();
//   };

//   if (loading) {
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
//           Your Personalized Self-Care Plan 💖
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
  Container, Typography, Box, List, ListItem, ListItemText, Button, CircularProgress, IconButton, Paper
} from '@mui/material';
import { useTheme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function SelfCarePage() {
  const theme = useTheme();
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
            aiPlan = parsedResponse;
          } else if (parsedResponse.activities && Array.isArray(parsedResponse.activities)) {
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
          ];
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
      <Container
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #fceabb 0%, #f8b500 100%)'
        }}
      >
        <CircularProgress />
      </Container>
    );
  }
  return (
    <Container sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <IconButton onClick={handleBack} sx={{ alignSelf: 'flex-start', mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>
  
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography variant="h4" fontWeight="bold">
          Your Personalized Self-Care Plan 💖
        </Typography>
      </Box>
  
      <Typography
        variant="subtitle1"
        sx={{
          mt: 2,
          mb: 6,
          fontWeight: 'bold',
          fontStyle: 'italic',
          textAlign: 'center',
          maxWidth: 500, // optional to limit text width
        }}
      >
        "Self-care is not selfish. You cannot pour from an empty cup."
      </Typography>
  
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4,
          width: '100%',
          maxWidth: 500, // 👈 smaller paper width
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #202020, #2a2a2a)'
            : 'linear-gradient(135deg, #FFF1F0, #FFE6E1)',
        }}
      >
        <List>
          {plan.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={item}
                primaryTypographyProps={{ fontSize: '1.2rem' }}
              />
            </ListItem>
          ))}
        </List>
  
        <Button
          variant="contained"
          onClick={handleFinish}
          fullWidth
          sx={{ mt: 4, py: 1.5, fontWeight: 'bold', borderRadius: 4 }}
        >
          Done
        </Button>
      </Paper>
  
    </Container>
  );
  
}

