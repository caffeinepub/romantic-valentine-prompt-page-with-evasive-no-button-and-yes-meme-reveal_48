import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

export default function App() {
  const [showResult, setShowResult] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isNoButtonPositioned, setIsNoButtonPositioned] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const yesButtonRef = useRef<HTMLButtonElement>(null);

  // Initialize No button position on mount
  useEffect(() => {
    if (!isNoButtonPositioned && containerRef.current && noButtonRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const buttonRect = noButtonRef.current.getBoundingClientRect();
      
      // Center the button initially
      setNoButtonPosition({
        x: (containerRect.width - buttonRect.width) / 2,
        y: 0
      });
      setIsNoButtonPositioned(true);
    }
  }, [isNoButtonPositioned]);

  const moveNoButton = () => {
    if (!containerRef.current || !noButtonRef.current || !yesButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const noButton = noButtonRef.current.getBoundingClientRect();
    const yesButton = yesButtonRef.current.getBoundingClientRect();

    const padding = 20;
    const minDistance = 150; // Minimum distance from Yes button

    let newX, newY;
    let attempts = 0;
    const maxAttempts = 50;

    do {
      // Generate random position within container bounds
      newX = Math.random() * (container.width - noButton.width - padding * 2) + padding;
      newY = Math.random() * (container.height - noButton.height - padding * 2) + padding;

      // Calculate distance from Yes button
      const yesCenterX = yesButton.left - container.left + yesButton.width / 2;
      const yesCenterY = yesButton.top - container.top + yesButton.height / 2;
      const noCenterX = newX + noButton.width / 2;
      const noCenterY = newY + noButton.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(noCenterX - yesCenterX, 2) + Math.pow(noCenterY - yesCenterY, 2)
      );

      if (distance >= minDistance) {
        break;
      }

      attempts++;
    } while (attempts < maxAttempts);

    setNoButtonPosition({ x: newX, y: newY });
  };

  const handleYesClick = () => {
    setShowResult(true);
  };

  if (showResult) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-50 via-white to-rose-50">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url(/assets/generated/hearts-pattern-bg.dim_1920x1080.png)',
            backgroundSize: '400px',
            backgroundRepeat: 'repeat'
          }}
        />
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <div className="mb-8 animate-bounce">
            <Heart className="w-16 h-16 mx-auto text-rose-500 fill-rose-500" />
          </div>
          <img
            src="/assets/generated/good-choice-meme.dim_800x600.png"
            alt="Good choice meme"
            className="w-full max-w-xl mx-auto rounded-3xl shadow-2xl mb-8"
          />
          <h2 className="text-4xl md:text-5xl font-bold text-rose-600 mb-4">
            Perfect! 💕
          </h2>
          <p className="text-xl text-rose-400">
            I knew you'd make the right choice!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'url(/assets/generated/hearts-pattern-bg.dim_1920x1080.png)',
          backgroundSize: '400px',
          backgroundRepeat: 'repeat'
        }}
      />
      
      <div className="relative z-10 w-full max-w-2xl">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-rose-200">
          <div className="text-center mb-12">
            <div className="flex justify-center gap-2 mb-6">
              <Heart className="w-12 h-12 text-rose-500 fill-rose-500 animate-pulse" />
              <Heart className="w-12 h-12 text-pink-400 fill-pink-400 animate-pulse delay-100" />
              <Heart className="w-12 h-12 text-rose-500 fill-rose-500 animate-pulse delay-200" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-rose-600 mb-4 leading-tight">
              Will you be my Valentine?
            </h1>
            
            <p className="text-xl text-rose-400">
              Choose wisely... 💖
            </p>
          </div>

          <div 
            ref={containerRef}
            className="relative min-h-[200px] flex items-center justify-center gap-6"
          >
            <Button
              ref={yesButtonRef}
              onClick={handleYesClick}
              size="lg"
              className="bg-rose-500 hover:bg-rose-600 text-white text-2xl px-12 py-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 font-bold"
            >
              Yes! 💕
            </Button>

            <button
              ref={noButtonRef}
              onPointerEnter={moveNoButton}
              onPointerMove={moveNoButton}
              onTouchStart={(e) => {
                e.preventDefault();
                moveNoButton();
              }}
              onPointerDown={(e) => {
                e.preventDefault();
                moveNoButton();
              }}
              className="absolute bg-gray-300 hover:bg-gray-400 text-gray-700 text-2xl px-12 py-8 rounded-2xl shadow-lg font-bold transition-all duration-200 cursor-pointer touch-none"
              style={{
                left: `${noButtonPosition.x}px`,
                top: `${noButtonPosition.y}px`,
                transition: 'left 0.3s ease-out, top 0.3s ease-out'
              }}
            >
              No
            </button>
          </div>
        </div>

        <footer className="mt-8 text-center text-sm text-rose-400">
          <p>
            Built with <Heart className="inline w-4 h-4 fill-rose-400 text-rose-400" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-rose-600 transition-colors underline"
            >
              caffeine.ai
            </a>
          </p>
          <p className="mt-1">© {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}
