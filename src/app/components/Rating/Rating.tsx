// From Material UI - Rating
import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

// Props is created to lift the state up to the Parent component (RecommendPage)
interface RatingComponentProps {
    value: number | null;
    onChange: (event: React.SyntheticEvent, newValue: number | null) => void;
}

const labels: { [index: string]: string } = {
  0.5: 'Useless',
  1: 'Useless',
  1.5: 'Poor',
  2: 'Poor',
  2.5: 'Ok',
  3: 'Ok',
  3.5: 'Good',
  4: 'Good',
  4.5: 'Excellent',
  5: 'Excellent',
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function RatingComponent({ value, onChange }: RatingComponentProps) {
  const [hover, setHover] = useState(-1);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={onChange}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        sx={{ fontSize: '3rem' }} 
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ mt: 0.5 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}
