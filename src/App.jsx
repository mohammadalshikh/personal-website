import { useState, useEffect } from 'react';
import Planet from './components/Planet';
import Modal from './components/Modal';
import StarField from './components/StarField';
import TypingHeader from './components/TypingHeader';
import Experiences from './components/sections/Experiences';
import Education from './components/sections/Education';
import Projects from './components/sections/Projects';
import About from './components/sections/About';
import Contact from './components/sections/Contact';

// Sample data - In the future, this will come from a backend/API
const sampleData = {
    experiences: [
        {
            id: 3,
            company: 'Coveo',
            position: 'Software Developer Intern',
            duration: 'Jan. 2025 - Aug. 2025',
            description: "Leveraged Coveo’s Headless and Atomic frameworks to enhance search efficiency and personal recommendations.",
            technologies: ['Python', 'React', 'Angular', 'C#', 'Azure DevOps'],
            image: '/src/assets/coveo.png'
        },
        {
            id: 2,
            company: 'Consoltec',
            position: 'Web Developer Intern',
            duration: 'May 2024 - Aug. 2024',
            description: 'Actively engaged in daily meetups to enhance product stability and user satisfaction by working on key features and bug fixes.',
            technologies: ['C#', 'Angular', 'JavaScript', 'SQL Server'],
            image: '/src/assets/consoltec.png'
        },
        {
            id: 1,
            company: 'Sitecore',
            position: 'Software Engineer Intern',
            duration: 'Jan. 2024 - Apr. 2024',
            description: 'Built scalable solutions and collaborated with cross-functional teams.',
            technologies: ['C#', 'ASP.NET', 'IIS', 'SQL Server'],
            image: '/src/assets/sitecore.png'
        },
    ],
    education: [
        {
            id: 1,
            institution: 'Concordia University',
            degree: 'Bachelor of Computer Science',
            field: '',
            duration: 'Jan. 2021 - Apr. 2026',
            achievements: [
                'Member of the Institute for Co-operative Education',
                'VP of Google Developer Student Club',
            ],
            image: '/src/assets/concordia.png'
        },
    ],
    projects: [
        {
            id: 3,
            name: 'MindSync',
            description: 'Task-management Discord bot with LLM integration',
            technologies: ['Discord.js', 'OpenAI API'],
            link: 'https://bestfood.mohammadalshikh.com',
            github: 'https://github.com/mohammadalshikh/e-commerce-spring-boot',
        },
        {
            id: 2,
            name: 'BestFood',
            description: 'Food e-commerce website',
            technologies: ['Java', 'Spring Boot', 'MySQL', 'Bootstrap'],
            link: 'https://bestfood.mohammadalshikh.com',
            github: 'https://github.com/mohammadalshikh/e-commerce-spring-boot',
        },
        {
            id: 1,
            name: 'ConcoGrades',
            description: 'A classroom management web-app for teachers and students.',
            technologies: ['Python', 'Flask', 'JavaScript', 'Bootstrap'],
            link: 'https://concogrades.mohammadalshikh.com',
            github: 'https://github.com/miguelsaliba/soen287-project',
        },
    ],
    about: {
        intro: `Hello! I'm Mohammad Alshikh, a passionate developer who loves creating beautiful and functional web experiences.\n\nI specialize in building modern web applications that are both user-friendly and scalable. When I'm not coding, you can find me exploring nature with friends, trying out a new sport or starting a new TV show.`,
        skills: ['Python', 'C#', 'Java', 'React', 'Angular', 'Flask', 'Spring Boot', 'SQL'],
        interests: ['UI Design', 'Cinema', 'Nature', 'Sports'],
    },
    contact: {
        email: 'hello@mohammadalshikh.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        linkedin: 'https://linkedin.com/in/mohammadalshikh',
        github: 'https://github.com/mohammadalshikh',
        twitter: 'https://twitter.com/mohammadalshikh',
    },
};


function App() {
    const [activeModal, setActiveModal] = useState(null);

    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        // Force scroll to top immediately
        window.scrollTo(0, 0);

        const timer = setTimeout(() => {
            window.scrollTo(0, 0);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    const destinations = [
        {
            id: 'about',
            name: 'About Me',
            color: 'blue',
            size: 140,
            position: { top: '25%', left: '15%' },
            mobilePosition: { top: '20%', left: '10%' }
        },
        {
            id: 'experiences',
            name: 'Experience',
            color: 'orange',
            size: 160,
            position: { top: '25%', right: '15%' },
            mobilePosition: { top: '20%', right: '10%' }
        },
        {
            id: 'education',
            name: 'Education',
            color: 'purple',
            size: 130,
            position: { top: '60%', left: '20%' },
            mobilePosition: { top: '55%', left: '10%' }
        },
        {
            id: 'contact',
            name: 'Contact',
            color: 'pink',
            size: 150,
            position: { top: '60%', right: '20%' },
            mobilePosition: { top: '55%', right: '10%' }
        },
        {
            id: 'projects',
            name: 'Projects',
            color: 'cyan',
            size: 120,
            position: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
            mobilePosition: { top: '45%', left: '50%', transform: 'translateX(-50%)' }
        },
    ];

    const handlePlanetClick = (planetId) => {
        setActiveModal(planetId);
    };

    const handleCloseModal = () => {
        setActiveModal(null);
    };

    const renderModalContent = () => {
        switch (activeModal) {
            case 'about':
                return <About about={sampleData.about} />;
            case 'experiences':
                return <Experiences experiences={sampleData.experiences} />;
            case 'education':
                return <Education education={sampleData.education} />;
            case 'projects':
                return <Projects projects={sampleData.projects} />;
            case 'contact':
                return <Contact contact={sampleData.contact} />;
            default:
                return null;
        }
    };

    const getModalTitle = () => {
        const destination = destinations.find(d => d.id === activeModal);
        return destination ? destination.name : '';
    };

    const getModalColor = () => {
        const destination = destinations.find(d => d.id === activeModal);
        return destination ? destination.color : 'purple';
    };

    return (
        <div className="relative w-full min-h-screen bg-space-darker">
            {/* Stars Background */}
            <StarField starCount={300} />

            {/* Main Content */}
            <div className="relative z-10">
                {/* Header with Typing Effect */}
                <TypingHeader />

                {/* Planets Container - Separate section */}
                <section id="planets-section" className="relative min-h-screen pb-12">
                    {/* Desktop: Absolute positioned planets */}
                    <div className="hidden md:block relative h-screen max-w-7xl mx-auto">
                        {destinations.map(dest => (
                            <div
                                key={dest.id}
                                className="absolute"
                                style={{
                                    top: dest.position.top,
                                    left: dest.position.left,
                                    right: dest.position.right,
                                    bottom: dest.position.bottom,
                                    transform: dest.position.transform
                                }}
                            >
                                <Planet {...dest} onClick={handlePlanetClick} />
                            </div>
                        ))}
                    </div>

                    {/* Mobile: Absolute positioned planets */}
                    <div className="md:hidden relative h-screen max-w-7xl mx-auto">
                        {destinations.map(dest => (
                            <div
                                key={dest.id}
                                className="absolute"
                                style={{
                                    top: dest.mobilePosition.top,
                                    left: dest.mobilePosition.left,
                                    right: dest.mobilePosition.right,
                                    bottom: dest.mobilePosition.bottom,
                                    transform: dest.mobilePosition.transform
                                }}
                            >
                                <Planet {...dest} size={Math.max(100, dest.size * 0.6)} onClick={handlePlanetClick} />
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Modal */}
            <Modal
                isOpen={activeModal !== null}
                onClose={handleCloseModal}
                title={getModalTitle()}
                color={getModalColor()}
            >
                {renderModalContent()}
            </Modal>
        </div>
    );
}

export default App;
