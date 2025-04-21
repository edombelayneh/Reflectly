// 'use client'

// import React, { useEffect, useState } from 'react';
// import {
//   Box, Container, Typography, Button, Chip, CircularProgress, useTheme
// } from '@mui/material';
// import { useRouter } from 'next/navigation';

// const QUOTES = [
//   "Feelings are just visitors. Let them come and go.",
//   "It’s okay to feel everything.",
//   "Your emotions are valid.",
//   "This too shall pass."
// ];

// export default function MoodboardPage() {
//   const [data, setData] = useState(null);
//   const [keywords, setKeywords] = useState([]);
//   const [quote, setQuote] = useState('');
//   const router = useRouter();
//   const theme = useTheme();

//   useEffect(() => {
//     const stored = localStorage.getItem('moodData');
//     if (stored) {
//       const parsed = JSON.parse(stored);
//       setData(parsed);

//       // basic keyword extraction
//       const words = parsed.feeling
//         .split(/\s+/)
//         .filter(w => w.length > 3 && !['but', 'and', 'the', 'just'].includes(w.toLowerCase()));
//       const topWords = words.slice(0, 3);
//       setKeywords(topWords);

//       const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
//       setQuote(randomQuote);
//     }
//   }, []);

//   const handleContinue = () => {
//     router.push('/selfcare');
//   };

//   if (!data) return (
//     <Container sx={{ py: 6 }}>
//       <CircularProgress />
//     </Container>
//   );

//   return (
//     <Container sx={{ py: 6 }}>
//       <Typography variant="h4" gutterBottom>
//         Your Moodboard
//       </Typography>

//       {/* Moodboard Background */}
//       <Box
//         sx={{
//           height: 200,
//           borderRadius: 3,
//           background: `linear-gradient(135deg, #fcd5ce, #fae1dd)`,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           mb: 4,
//         }}
//       >
//         <Typography variant="h6" sx={{ color: '#6D6875' }}>
//           {quote}
//         </Typography>
//       </Box>

//       {/* Keywords */}
//       <Box sx={{ mb: 3 }}>
//         <Typography variant="subtitle1" gutterBottom>
//           Detected Keywords:
//         </Typography>
//         {keywords.map((word, i) => (
//           <Chip key={i} label={word} sx={{ m: 0.5 }} />
//         ))}
//       </Box>

//       {/* Emoji Instead of External GIF */}
//       <Box
//         sx={{
//           fontSize: '4rem',
//           textAlign: 'center',
//           mb: 3,
//         }}
//       >
//         🌊
//       </Box>

//       <Button
//         variant="contained"
//         onClick={handleContinue}
//         sx={{ borderRadius: 4 }}
//       >
//         Continue to Self-Care Plan
//       </Button>
//     </Container>
//   );
// }


'use client'

import React, { useEffect, useState } from 'react';
import {
  Box, Container, Typography, Button, Chip, CircularProgress, useTheme
} from '@mui/material';
import { useRouter } from 'next/navigation';

const QUOTES = [
  "Feelings are just visitors. Let them come and go.",
  "It’s okay to feel everything.",
  "Your emotions are valid.",
  "This too shall pass."
];

export default function MoodboardPage() {
  const [data, setData] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [quote, setQuote] = useState('');
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    const stored = localStorage.getItem('moodData');
    if (stored) {
      const parsed = JSON.parse(stored);
      setData(parsed);

      const words = parsed.feeling
        .split(/\s+/)
        .filter(w => w.length > 3 && !['but', 'and', 'the', 'just'].includes(w.toLowerCase()));
      const topWords = words.slice(0, 3);
      setKeywords(topWords);

      const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
      setQuote(randomQuote);
    }
  }, []);

  const handleContinue = () => {
    router.push('/selfcare');
  };

  const handleBack = () => {
    router.push('/moodCheckIn'); // adjust this if your previous route is different
  };

  if (!data) return (
    <Container sx={{ py: 6 }}>
      <CircularProgress />
    </Container>
  );

  return (
    <Container sx={{ py: 6 }}>
      <Button onClick={handleBack} sx={{ mb: 2 }}>
        ← Back
      </Button>

      <Typography variant="h4" gutterBottom>
        Your Moodboard
      </Typography>

      <Box
        sx={{
          height: 200,
          borderRadius: 3,
          background: `linear-gradient(135deg, #fcd5ce, #fae1dd)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 4,
        }}
      >
        <Typography variant="h6" sx={{ color: '#6D6875' }}>
          {quote}
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Detected Keywords:
        </Typography>
        {keywords.map((word, i) => (
          <Chip key={i} label={word} sx={{ m: 0.5 }} />
        ))}
      </Box>

      <Box
        sx={{
          fontSize: '4rem',
          textAlign: 'center',
          mb: 3,
        }}
      >
        🌊
      </Box>

      <Button
        variant="contained"
        onClick={handleContinue}
        sx={{ borderRadius: 4 }}
      >
        Continue to Self-Care Plan
      </Button>
    </Container>
  );
}
