// 'use client';

// import React, { useEffect, useState } from 'react';
// import {
//   Box, Container, Typography, Button, Chip, CircularProgress, useTheme
// } from '@mui/material';
// import { useRouter } from 'next/navigation';

// export default function MoodboardPage() {
//   const [data, setData] = useState(null);
//   const router = useRouter();
//   const theme = useTheme();

//   useEffect(() => {
//     const stored = localStorage.getItem('moodData');
//     if (stored) {
//       setData(JSON.parse(stored));
//     }
//   }, []);

//   const handleContinue = () => {
//     router.push('/selfcare');
//   };

//   const handleBack = () => {
//     router.push('/moodCheckIn');
//   };

//   if (!data) return (
//     <Container sx={{ py: 6 }}>
//       <CircularProgress />
//     </Container>
//   );

//   return (
//     <Container sx={{ py: 6 }}>
//       <Button onClick={handleBack} sx={{ mb: 2 }}>
//         ← Back
//       </Button>

//       <Typography variant="h4" gutterBottom>
//         Your Moodboard
//       </Typography>

      // <Box
      //   sx={{
      //     height: 200,
      //     borderRadius: 3,
      //     background: `linear-gradient(135deg, #fcd5ce, #fae1dd)`,
      //     display: 'flex',
      //     alignItems: 'center',
      //     justifyContent: 'center',
      //     mb: 4,
      //   }}
//       >
//         <Typography variant="h6" sx={{ color: '#6D6875', textAlign: 'center', px: 2 }}>
//           {data.quote}
//         </Typography>
//       </Box>

//       <Box sx={{ mb: 3 }}>
//         <Typography variant="subtitle1" gutterBottom>
//           AI-Detected Keywords:
//         </Typography>
//         {data.keywords?.map((word, i) => (
//           <Chip key={i} label={word} sx={{ m: 0.5 }} />
//         ))}
//       </Box>

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


'use client';

import React, { useEffect, useState } from 'react';
import {
  Box, Container, Typography, Button, Chip, CircularProgress, useTheme
} from '@mui/material';
import { useRouter } from 'next/navigation';

// 🎨 Map mood keywords to aesthetic images
const MOOD_IMAGES = {
  happy: '/images/happy.jpg',
  sad: '/images/sad.jpg',
  anxious: '/images/anxious.jpg',
  hopeful: '/images/hopeful.jpg',
  calm: '/images/calm.jpg',
  stressed: '/images/stressed.jpg',
  default: '/images/default.jpg'
};

// ✨ Extra uplifting quotes
const EXTRA_QUOTES = [
  "You are stronger than you think.",
  "Let today be the start of something new.",
  "Peace begins with a smile.",
  "Storms make trees take deeper roots.",
  "Healing takes time — and that's okay.",
  "Your potential is endless."
];

export default function MoodboardPage() {
  const [data, setData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(MOOD_IMAGES.default);
  const [extraQuote, setExtraQuote] = useState('');
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    const stored = localStorage.getItem('moodData');
    if (stored) {
      const parsedData = JSON.parse(stored);
      setData(parsedData);

      // Choose an image based on detected keywords
      const primaryKeyword = parsedData.keywords?.[0]?.toLowerCase();
      const matchedImage = MOOD_IMAGES[primaryKeyword] || MOOD_IMAGES.default;
      setSelectedImage(matchedImage);

      // Random extra uplifting quote
      const randomExtra = EXTRA_QUOTES[Math.floor(Math.random() * EXTRA_QUOTES.length)];
      setExtraQuote(randomExtra);
    }
  }, []);

  const handleContinue = () => {
    router.push('/selfcare');
  };

  const handleBack = () => {
    router.push('/moodCheckIn');
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

      {/* 🎨 Mood Background Card */}
      {/* <Box
        sx={{
          height: 250,
          borderRadius: 3,
          backgroundImage: `url(${selectedImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 4,
          p: 2
        }} */}
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
        <Typography variant="h6" sx={{ color: 'white', textAlign: 'center', textShadow: '0px 0px 8px rgba(0,0,0,0.8)' }}>
          {data.quote}
        </Typography>
      </Box>

      {/* 🧠 AI Keywords */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          AI-Detected Keywords:
        </Typography>
        {data.keywords?.map((word, i) => (
          <Chip key={i} label={word} sx={{ m: 0.5 }} />
        ))}
      </Box>

      {/* ✨ Extra Random Quote */}
      <Box
        sx={{
          fontSize: '1.25rem',
          textAlign: 'center',
          mb: 4,
          fontStyle: 'italic',
          color: theme.palette.text.secondary
        }}
      >
        "{extraQuote}"
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
