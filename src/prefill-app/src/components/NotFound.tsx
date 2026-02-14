import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const [floatOffset, setFloatOffset] = useState(0);

  // Floating animation
  useEffect(() => {
    let frame: number;
    let start: number;
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      setFloatOffset(Math.sin(elapsed / 1000) * 10);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: 'Manrope, sans-serif',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background decorative circles */}
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(61,164,103,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-80px',
          left: '-80px',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(61,164,103,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Scattered pill decorations */}
      {[
        { top: '12%', left: '8%', rotate: '30deg', opacity: 0.12 },
        { top: '20%', right: '10%', rotate: '-20deg', opacity: 0.1 },
        { bottom: '25%', left: '6%', rotate: '60deg', opacity: 0.08 },
        { bottom: '15%', right: '8%', rotate: '-45deg', opacity: 0.1 },
        { top: '45%', left: '3%', rotate: '15deg', opacity: 0.07 },
        { top: '35%', right: '4%', rotate: '-60deg', opacity: 0.09 },
      ].map((style, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: '36px',
            height: '14px',
            borderRadius: '999px',
            backgroundColor: '#3da467',
            opacity: style.opacity,
            transform: `rotate(${style.rotate})`,
            top: style.top,
            left: style.left,
            right: style.right,
            bottom: style.bottom,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Avatar */}
      <div
        style={{
          transform: `translateY(${floatOffset}px)`,
          transition: 'transform 0.05s linear',
          marginBottom: '2.5rem',
        }}
      >
        <svg
          width="180"
          height="200"
          viewBox="0 0 180 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shadow */}
          <ellipse
            cx="90"
            cy="195"
            rx="45"
            ry="6"
            fill="#3da467"
            opacity="0.12"
          />

          {/* Body */}
          <rect x="55" y="118" width="70" height="65" rx="20" fill="#3da467" />

          {/* Lab coat / white shirt detail */}
          <rect
            x="68"
            y="118"
            width="44"
            height="65"
            rx="10"
            fill="white"
            opacity="0.15"
          />

          {/* Arms */}
          <rect x="28" y="122" width="30" height="16" rx="8" fill="#3da467" />
          <rect x="122" y="122" width="30" height="16" rx="8" fill="#3da467" />

          {/* Left hand holding a pill */}
          <circle cx="24" cy="147" r="10" fill="#2d8a55" />
          <rect
            x="18"
            y="144"
            width="12"
            height="6"
            rx="3"
            fill="white"
            opacity="0.7"
          />

          {/* Right hand with question mark */}
          <circle cx="156" cy="147" r="10" fill="#2d8a55" />
          <text x="152" y="152" fontSize="12" fill="white" fontWeight="bold">
            ?
          </text>

          {/* Neck */}
          <rect x="80" y="108" width="20" height="14" rx="5" fill="#f0c9a0" />

          {/* Head */}
          <circle cx="90" cy="88" r="38" fill="#f5d5b0" />

          {/* Head top / hair */}
          <ellipse cx="90" cy="54" rx="30" ry="14" fill="#2d2d2d" />
          <rect x="60" y="54" width="60" height="10" rx="0" fill="#2d2d2d" />

          {/* Ears */}
          <ellipse cx="52" cy="88" rx="7" ry="9" fill="#f0c9a0" />
          <ellipse cx="128" cy="88" rx="7" ry="9" fill="#f0c9a0" />
          <ellipse cx="52" cy="88" rx="4" ry="6" fill="#e8b090" />
          <ellipse cx="128" cy="88" rx="4" ry="6" fill="#e8b090" />

          {/* Eyes */}
          {/* Left eye white */}
          <ellipse cx="75" cy="85" rx="10" ry="11" fill="white" />
          {/* Left pupil */}
          <circle cx="75" cy="85" r="5" fill="#1a1a1a" />
          <circle cx="77" cy="83" r="1.5" fill="white" />
          {/* Left eye outline */}
          <ellipse
            cx="75"
            cy="85"
            rx="10"
            ry="11"
            fill="none"
            stroke="#d4a870"
            strokeWidth="1"
          />

          {/* Right eye white */}
          <ellipse cx="105" cy="85" rx="10" ry="11" fill="white" />
          {/* Right pupil */}
          <circle cx="105" cy="85" r="5" fill="#1a1a1a" />
          <circle cx="107" cy="83" r="1.5" fill="white" />
          {/* Right eye outline */}
          <ellipse
            cx="105"
            cy="85"
            rx="10"
            ry="11"
            fill="none"
            stroke="#d4a870"
            strokeWidth="1"
          />

          {/* Eyebrows - raised/confused */}
          <path
            d="M63 70 Q75 64 85 68"
            stroke="#2d2d2d"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M95 68 Q105 64 117 70"
            stroke="#2d2d2d"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Nose */}
          <ellipse cx="90" cy="95" rx="4" ry="3" fill="#e8b090" />

          {/* Mouth - confused/sad */}
          <path
            d="M79 106 Q90 101 101 106"
            stroke="#c08060"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Stethoscope */}
          <path
            d="M72 130 Q65 145 70 155 Q75 165 85 163"
            stroke="#1a1a1a"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="85" cy="163" r="5" fill="#1a1a1a" />
          <circle cx="85" cy="163" r="3" fill="#3da467" />

          {/* Name badge */}
          <rect
            x="78"
            y="138"
            width="24"
            height="16"
            rx="3"
            fill="white"
            opacity="0.9"
          />
          <rect
            x="81"
            y="141"
            width="18"
            height="2"
            rx="1"
            fill="#3da467"
            opacity="0.7"
          />
          <rect
            x="83"
            y="145"
            width="14"
            height="2"
            rx="1"
            fill="#999"
            opacity="0.5"
          />
          <rect
            x="85"
            y="149"
            width="10"
            height="2"
            rx="1"
            fill="#999"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* 404 Text */}
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h1
          style={{
            fontFamily: 'Familjen Grotesk, sans-serif',
            fontSize: 'clamp(72px, 15vw, 120px)',
            fontWeight: 700,
            color: '#3da467',
            lineHeight: 1,
            margin: 0,
            letterSpacing: '-4px',
          }}
        >
          404
        </h1>
      </div>

      {/* Message */}
      <h2
        style={{
          fontFamily: 'Familjen Grotesk, sans-serif',
          fontSize: 'clamp(20px, 4vw, 28px)',
          fontWeight: 700,
          color: '#2b2b2b',
          margin: '0 0 0.75rem 0',
          textAlign: 'center',
        }}
      >
        Oops! Page not found
      </h2>

      <p
        style={{
          fontFamily: 'Manrope, sans-serif',
          fontSize: '16px',
          color: '#575757',
          fontWeight: 400,
          lineHeight: 1.6,
          textAlign: 'center',
          maxWidth: '380px',
          margin: '0 0 2.5rem 0',
        }}
      >
        This is not the web page you are looking for.
      </p>

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <button
          onClick={() => navigate('/products/refill')}
          style={{
            backgroundColor: '#3da467',
            color: 'white',
            border: 'none',
            borderRadius: '999px',
            padding: '12px 28px',
            fontSize: '16px',
            fontFamily: 'Manrope, sans-serif',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = '#2e8a39')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = '#3da467')
          }
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Go to Homepage
        </button>

        <button
          onClick={() => navigate('/products/refill/survey')}
          style={{
            backgroundColor: 'white',
            color: '#3da467',
            border: '2px solid #3da467',
            borderRadius: '999px',
            padding: '12px 28px',
            fontSize: '16px',
            fontFamily: 'Manrope, sans-serif',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f0faf4';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Go Back
        </button>
      </div>

      {/* Bottom hint */}
      <p
        style={{
          position: 'absolute',
          bottom: '24px',
          fontFamily: 'Manrope, sans-serif',
          fontSize: '13px',
          color: '#bbbbbb',
          fontWeight: 400,
        }}
      >
        OneHealth · Refill
      </p>
    </div>
  );
};

export default NotFound;
