import { useState, useEffect, useRef } from 'react';
import typingSound from '../assets/typing.mp3';
import AstronautLogo from './AstronautLogo';
import Asteroid from './Asteroid';
import heartSvg from '../assets/heart.svg?raw';


const primaryMessages = [
    `> Log ID: STARSHIP-042 |PAUSE|1000|PAUSE|

    > Date: ${new Date().toLocaleDateString()} |PAUSE|1000|PAUSE|

    > Location: Orbiting GitHub Nebula`,

    `Hi there, I'm Mohammad.|PAUSE|1000|PAUSE|
    Welcome to my digital space.`,

    "I'm a final year Computer Science student at Concordia University.",
    "I hope you enjoy exploring my website. |PAUSE|500|PAUSE|Welcome aboard.|PAUSE|500|PAUSE|\n\n> END_LOG",
];

const secondaryMessages = [
    "It's nice and quiet up here isn't it?",
    "I love stargazing and contemplating the universe.",
    'An old friend once told me |PAUSE|1000|PAUSE|\n"We used to look up at the sky and wonder at our place in the stars.|PAUSE|500|PAUSE|\n Now we just look down and debug"|PAUSE|1000|PAUSE|\n\n...',
    "...",
    "What's that?",
    "No. I didn't steal that from Interstellar",
    "...",
    "If you made it this far, here's a pixel heart for you:",
];


const TypingHeader = ({ onBeginExploring }) => {

    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showArrow, setShowArrow] = useState(false);
    const [audioReady, setAudioReady] = useState(false);
    const [userInteracted, setUserInteracted] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [messageMode, setMessageMode] = useState('primary');
    const [showChoiceButtons, setShowChoiceButtons] = useState(false);
    const [showExploreButton, setShowExploreButton] = useState(false);

    const audioRef = useRef(null);
    const typingIntervalRef = useRef(null);
    const nameHeadingRef = useRef(null);

    // Set up ResizeObserver to track heading width
    useEffect(() => {
        if (!nameHeadingRef.current) return;

        const observer = new ResizeObserver(() => {
            if (nameHeadingRef.current) {
                const width = nameHeadingRef.current.offsetWidth;
                document.documentElement.style.setProperty('--title-width', `${width}px`);
            }
        });

        observer.observe(nameHeadingRef.current);

        // Initial measurement
        const width = nameHeadingRef.current.offsetWidth;
        document.documentElement.style.setProperty('--title-width', `${width}px`);

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        // Initialize audio
        audioRef.current = new Audio(typingSound);
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3;

        // Wait for audio to be ready to play
        const handleCanPlay = () => {
            setAudioReady(true);
        };

        audioRef.current.addEventListener(
            'canplaythrough', handleCanPlay
        );

        // Also try loadeddata as backup
        audioRef.current.addEventListener('loadeddata', () => {
            setAudioReady(true);
        });

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('canplaythrough', handleCanPlay);
                audioRef.current.pause();
                audioRef.current = null;
            }
            if (typingIntervalRef.current) {
                clearInterval(typingIntervalRef.current);
            }
        };
    }, []);

    // Start typing only when audio is ready AND user has interacted
    useEffect(() => {
        if (audioReady && userInteracted &&
            !isTyping && displayedText === '') {
            setIsTyping(true);
        }
    }, [audioReady, isTyping, displayedText, userInteracted]);

    const handleStartClick = () => {
        // For mobile Safari, force audio ready and unlock it
        if (audioRef.current) {
            audioRef.current.load(); // Force load
            audioRef.current.play()
                .then(() => {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                    setAudioReady(true); // Force ready
                    setUserInteracted(true);
                })
                .catch(() => {
                    // Set ready anyway, typing will work silently
                    setAudioReady(true);
                    setUserInteracted(true);
                });
        } else {
            setUserInteracted(true);
        }
    };

    useEffect(() => {
        if (!isTyping) return;

        const currentMessages = messageMode === 'primary' ? primaryMessages : secondaryMessages;
        const currentMessage = currentMessages[currentMessageIndex];

        // Check if message has pauses
        if (currentMessage.includes('|PAUSE|')) {

            // Split by |PAUSE| to get alternating text and duration
            const parts = currentMessage.split('|PAUSE|');

            let textSegments = [];
            let pauseDurations = [];

            for (let i = 0; i < parts.length; i++) {
                if (i % 2 === 0) {
                    // Even indices are text segments
                    textSegments.push(parts[i]);
                } else {
                    // Odd indices are pause durations
                    pauseDurations.push(parseInt(parts[i]));
                }
            }

            let charIndex = 0;
            let segmentIndex = 0;
            let isPaused = false;
            let accumulatedText = '';

            // Start typing sound
            if (audioRef.current && !isMuted && currentMessage !== '...') {
                audioRef.current.currentTime = 0;
                audioRef.current.play()
                    .then(() => { })
                    .catch(() => { });
            }

            const typeNextChar = () => {
                if (isPaused) return;

                if (segmentIndex < textSegments.length) {
                    const currentSegment = textSegments[segmentIndex];

                    if (charIndex < currentSegment.length) {
                        // Type next character from current segment
                        accumulatedText = textSegments.slice(0, segmentIndex).join('') +
                            currentSegment.substring(0, charIndex + 1);
                        setDisplayedText(accumulatedText);
                        charIndex++;
                    } else {
                        // Finished current segment
                        segmentIndex++;
                        charIndex = 0;

                        if (segmentIndex < textSegments.length && segmentIndex - 1 < pauseDurations.length) {
                            // There's a pause before the next segment
                            isPaused = true;

                            // Stop typing sound during pause
                            if (audioRef.current) {
                                audioRef.current.pause();
                                audioRef.current.currentTime = 0;
                            }

                            setTimeout(() => {
                                isPaused = false;

                                // Resume typing sound after pause
                                if (audioRef.current && !isMuted && segmentIndex < textSegments.length) {
                                    audioRef.current.currentTime = 0;
                                    audioRef.current.play().catch(() => { });
                                }
                            }, pauseDurations[segmentIndex - 1]);
                        } else if (segmentIndex >= textSegments.length) {
                            // All segments done
                            if (currentMessages[currentMessageIndex].includes("pixel heart")) {
                                setDisplayedText(accumulatedText + heartSvg);
                            } else {
                                setDisplayedText(accumulatedText);
                            }
                            clearInterval(typingIntervalRef.current);
                            setIsTyping(false);
                            setShowArrow(true);

                            // Stop typing sound
                            if (audioRef.current) {
                                audioRef.current.pause();
                                audioRef.current.currentTime = 0;
                            }
                        }
                    }
                }
            };

            typingIntervalRef.current = setInterval(typeNextChar, 50);
        } else {
            // Simple message without pauses (original logic)
            let charIndex = 0;

            // Start typing sound
            if (audioRef.current && !isMuted && currentMessage !== '...') {
                audioRef.current.currentTime = 0;
                audioRef.current.play()
                    .then(() => { })
                    .catch(() => { });
            }

            typingIntervalRef.current = setInterval(() => {
                if (charIndex < currentMessage.length) {
                    let newText = currentMessage.substring(0, charIndex + 1);
                    setDisplayedText(newText);
                    charIndex++;
                } else {
                    // Finished typing current message
                    if (currentMessage.includes("pixel heart")) {
                        setDisplayedText(currentMessage + heartSvg);
                    }
                    clearInterval(typingIntervalRef.current);
                    setIsTyping(false);
                    setShowArrow(true);

                    // Stop typing sound
                    if (audioRef.current) {
                        audioRef.current.pause();
                        audioRef.current.currentTime = 0;
                    }
                }
            }, 50);
        }

        return () => {
            if (typingIntervalRef.current) {
                clearInterval(typingIntervalRef.current);
            }
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, [currentMessageIndex, isTyping, isMuted, messageMode]);

    const handleArrowClick = () => {
        const currentMessages = messageMode === 'primary' ? primaryMessages : secondaryMessages;
        if (currentMessageIndex < currentMessages.length - 1) {
            setShowArrow(false);
            setDisplayedText('');
            setCurrentMessageIndex(prev => prev + 1);
            setIsTyping(true);
        } else {
            // Last message reached
            setShowArrow(false);

            if (messageMode === 'primary') {
                // Show choice buttons after primary messages
                setShowChoiceButtons(true);
            } else {
                // After secondary messages, show only explore button
                setShowExploreButton(true);
            }
        }
    };

    const handleTellMeMore = () => {
        setShowChoiceButtons(false);
        setMessageMode('secondary');
        setCurrentMessageIndex(0);
        setDisplayedText('');
        setIsTyping(true);
    };

    const handleBeginExploring = () => {
        if (onBeginExploring) {
            onBeginExploring();
        }
        // Scroll to planets section
        const planetsSection = document.getElementById('planets-section');
        if (planetsSection) {
            planetsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="typing-header">
            {/* Mute/Unmute button - top left of header */}
            <button
                onClick={() => {
                    setIsMuted(!isMuted);
                    // If currently playing and we're muting, stop the audio
                    if (!isMuted && audioRef.current && !audioRef.current.paused) {
                        audioRef.current.pause();
                    }
                }}
                className="mute-button group"
                aria-label={isMuted ? "Unmute" : "Mute"}
            >
                {isMuted ? (
                    // Muted icon (speaker with X)
                    <svg className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400 group-hover:text-space-cyan transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                ) : (
                    // Unmuted icon (speaker with waves)
                    <svg className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400 group-hover:text-space-cyan transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                )}
            </button>

            {/* Social Links - top right of header */}
            <div className="social-links">
                {/* LinkedIn */}
                <a
                    href="https://linkedin.com/in/mohammadalshikh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link group"
                    aria-label="LinkedIn"
                >
                    <svg className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400 group-hover:text-space-cyan transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                </a>

                {/* GitHub */}
                <a
                    href="https://github.com/mohammadalshikh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link group"
                    aria-label="GitHub"
                >
                    <svg className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400 group-hover:text-space-cyan transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                </a>
            </div>

            {/* Name Heading */}
            <h1 ref={nameHeadingRef} className="name-heading">
                Mohammad<span className="name-break"> </span>Alshikh
            </h1>

            {/* Asteroid Decoration */}
            <div className="absolute top-[calc(50%-110px)] right-8 sm:top-[calc(50%-110px)] sm:right-28 md:right-36 lg:right-44 z-30">
                <Asteroid size={35} className="drop-shadow-[0_0_15px_rgba(107,114,128,0.5)] sm:w-[50px] sm:h-[50px]" />
            </div>

            {/* Astronaut Logo */}
            <div className="astronaut-logo-container">
                <AstronautLogo size={80} className="drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
            </div>

            {/* Start Button */}
            {!userInteracted && (
                <div className="text-center max-w-4xl px-4">
                    {/* Same fixed height as typing messages to prevent layout shift */}
                    <div className="relative flex flex-col items-center justify-start" style={{ minHeight: '350px' }}>
                        <div className="h-[200px] flex items-center justify-center w-full -mt-12">
                            <button
                                onClick={handleStartClick}
                                className="start-button"
                            >
                                New log entry
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Typing Messages - shown after user interaction */}
            {userInteracted && (
                <div className="typing-messages-container">
                    {/* Fixed height container */}
                    <div className="fixed-height-container" style={{ minHeight: '350px' }}>
                        {/* Typing text - dynamic height */}
                        <div className="flex items-start justify-start w-full">
                            <p className="typing-text">
                                <span dangerouslySetInnerHTML={{ __html: displayedText }} />
                                {isTyping && <span className="animate-pulse">|</span>}
                            </p>
                        </div>

                        {/* Arrow button OR Choice buttons */}
                        <div className="mt-6 min-h-[3rem] flex items-center justify-center gap-4">
                            {showArrow && (
                                <button
                                    onClick={handleArrowClick}
                                    className="arrow-button group"
                                    aria-label="Next message"
                                >
                                    <svg
                                        className="w-8 h-8 md:w-10 md:h-10 group-hover:translate-x-1 transition-transform duration-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        />
                                    </svg>
                                </button>
                            )}

                            {/* Choice buttons after primary messages */}
                            {showChoiceButtons && (
                                <>
                                    <button
                                        onClick={handleTellMeMore}
                                        className="choice-button"
                                    >
                                        Tell me more
                                    </button>
                                    <button
                                        onClick={handleBeginExploring}
                                        className="explore-button"
                                    >
                                        Begin exploring
                                    </button>
                                </>
                            )}

                            {/* Single explore button after secondary messages */}
                            {showExploreButton && (
                                <button
                                    onClick={handleBeginExploring}
                                    className="explore-button"
                                >
                                    Begin exploring
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Spacecraft */}
            <div
                className="spacecraft-container cursor-default translate-x-1/2 translate-y-full"
                aria-label="Spacecraft decoration"
            >
                <svg viewBox="0 0 64 32" className="w-24 h-12 md:w-32 md:h-16 lg:w-40 lg:h-20 drop-shadow-lg">
                    {/* Main body */}
                    <path d="M8 16 L20 8 L44 8 L56 16 L44 24 L20 24 Z" fill="#374151" />
                    <path d="M12 16 L18 10 L42 10 L48 16 L42 22 L18 22 Z" fill="#1f2937" />

                    {/* Forward section */}
                    <path d="M44 8 L56 16 L44 24 L48 16 Z" fill="#111827" />

                    {/* Cockpit window */}
                    <ellipse cx="50" cy="16" rx="3" ry="4" fill="#0f172a" />
                    <ellipse cx="50" cy="16" rx="2" ry="3" fill="#1e293b" opacity="0.8" />

                    {/* Wing details */}
                    <rect x="20" y="6" width="24" height="2" fill="#6b7280" />
                    <rect x="20" y="24" width="24" height="2" fill="#6b7280" />

                    {/* Engine pods */}
                    <rect x="6" y="12" width="6" height="8" rx="1" fill="#4b5563" />
                    <rect x="52" y="12" width="6" height="8" rx="1" fill="#4b5563" />

                    {/* Engine glow */}
                    <rect x="4" y="14" width="2" height="4" fill="#3b82f6" opacity="0.6" />
                    <rect x="58" y="14" width="2" height="4" fill="#3b82f6" opacity="0.6" />

                    {/* Antenna/details */}
                    <line x1="32" y1="6" x2="32" y2="4" stroke="#9ca3af" strokeWidth="1" />
                    <circle cx="32" cy="3" r="1" fill="#9ca3af" />

                    {/* Subtle highlight */}
                    <path d="M12 14 L18 12 L42 12 L46 14 L42 16 L18 16 Z" fill="#ffffff" opacity="0.1" />
                </svg>
            </div>
        </header>
    );
};

export default TypingHeader;
