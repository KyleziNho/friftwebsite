import React from 'react';
import Spline from '@splinetool/react-spline';

const SplineBackground: React.FC = () => {
  return (
    <Spline
      scene="https://prod.spline.design/ganPjgkrwc7sFsCo/scene.splinecode"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default SplineBackground;