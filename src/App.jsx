import { useState, useEffect } from 'react';
import coveo from './assets/coveo.png';
import consoltec from './assets/consoltec.png';
import sitecore from './assets/sitecore.png';
import concordia from './assets/concordia.png';
import Planet from './components/Planet';
import Asteroid from './components/Asteroid';
import Modal from './components/Modal';
import StarField from './components/StarField';
import TypingHeader from './components/TypingHeader';
import Experiences from './components/sections/Experiences';
import Education from './components/sections/Education';
import Projects from './components/sections/Projects';
import About from './components/sections/About';
import Contact from './components/sections/Contact';
import EditableExperiences from './components/sections/EditableExperiences';
import EditableEducation from './components/sections/EditableEducation';
import EditableProjects from './components/sections/EditableProjects';
import PasswordModal from './components/PasswordModal';
import EditModeActions from './components/EditModeActions';
import FormModal from './components/FormModal';
import { EditModeProvider, useEditMode } from './contexts/EditModeContext'; // eslint-disable-line

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
            image: coveo
        },
        {
            id: 2,
            company: 'Consoltec',
            position: 'Web Developer Intern',
            duration: 'May 2024 - Aug. 2024',
            description: 'Working on key features and bug fixes to enhance product stability and user satisfaction, while also engaging in daily meetups.',
            technologies: ['C#', 'Angular', 'JavaScript', 'SQL Server'],
            image: consoltec
        },
        {
            id: 1,
            company: 'Sitecore',
            position: 'Software Engineer Intern',
            duration: 'Jan. 2024 - Apr. 2024',
            description: 'Collaborated with the deployment team to develop Sitecore-based websites, resolve maintenance issues, and structured bug analysis.',
            technologies: ['C#', 'ASP.NET', 'IIS', 'SQL Server'],
            image: sitecore
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
            image: concordia
        },
    ],
    projects: [
        {
            id: 4,
            name: 'True Clear Terminal',
            description: 'VS Code extension to clear integrated terminal and scroll-back buffer',
            technologies: ['TypeScript', 'JavaScript'],
            link: 'https://marketplace.visualstudio.com/items?itemName=mohammadalshikh.true-clear-terminal',
            github: 'https://github.com/mohammadalshikh/true-clear-terminal-vscode',
        },
        {
            id: 3,
            name: 'MindSync',
            description: 'Task-management Discord bot with LLM integration',
            technologies: ['Discord.js', 'OpenAI API'],
            link: null,
            github: 'https://github.com/mohammadalshikh/mindsync',
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
            github: 'https://github.com/mohammadalshikh/classroom-management-flask',
        },
    ],
    about: {
        intro: `Hello! I'm Mohammad Alshikh, a passionate developer who loves creating beautiful and functional web experiences.\n\nCurrently finishing my last year at Concordia, I have learned a handful of technologies over the past few years that helped me grow and contribute as a developer. At the moment, my focus is on building modern web applications that are both user-friendly and scalable.`,
        skills: ['Python', 'C#', 'Java', 'React', 'Angular', 'Flask', 'Spring Boot', 'SQL'],
        interests: ['Making cool UIs', 'Movies/TV shows', 'Writing stories', 'Exploring nature', 'Literally all sports', 'Video games', 'Hip-hop'],
    },
};


// Inner App component that uses EditModeContext
function AppContent() {
    const [activeModal, setActiveModal] = useState(null);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const { isEditMode, data, updateSection } = useEditMode();

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

    const handleAsteroidClick = () => {
        setIsPasswordModalOpen(true);
    };

    const handleAddCard = () => {
        setIsFormModalOpen(true);
    };

    const handleFormSubmit = (newCard) => {
        switch (activeModal) {
            case 'experiences':
                updateSection('experiences', [...data.experiences, newCard]);
                break;
            case 'education':
                updateSection('education', [...data.education, newCard]);
                break;
            case 'projects':
                updateSection('projects', [...data.projects, newCard]);
                break;
            default:
                break;
        }
    };

    const renderModalContent = () => {
        switch (activeModal) {
            case 'about':
                return <About about={data.about} />;
            case 'experiences':
                return isEditMode ? (
                    <EditableExperiences 
                        experiences={data.experiences} 
                        onChange={(newExperiences) => updateSection('experiences', newExperiences)}
                    />
                ) : (
                    <Experiences experiences={data.experiences} />
                );
            case 'education':
                return isEditMode ? (
                    <EditableEducation 
                        education={data.education} 
                        onChange={(newEducation) => updateSection('education', newEducation)}
                    />
                ) : (
                    <Education education={data.education} />
                );
            case 'projects':
                return isEditMode ? (
                    <EditableProjects 
                        projects={data.projects} 
                        onChange={(newProjects) => updateSection('projects', newProjects)}
                    />
                ) : (
                    <Projects projects={data.projects} />
                );
            case 'contact':
                return <Contact/>;
            default:
                return null;
        }
    };

    const renderEditModeActions = () => {
        // Only show edit actions for editable sections
        if (!isEditMode || activeModal === 'about' || activeModal === 'contact') {
            return null;
        }
        return <EditModeActions onAdd={handleAddCard} />;
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
                <section id="planets-section" className="relative min-h-screen">
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
                        
                        {/* Asteroid - Admin Access (Desktop) */}
                        <div 
                            className="absolute" 
                            style={{ top: '10%', right: '5%' }}
                        >
                            <Asteroid size={70} onClick={handleAsteroidClick} />
                        </div>
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
                        
                        {/* Asteroid - Admin Access (Mobile) */}
                        <div 
                            className="absolute" 
                            style={{ top: '5%', right: '5%' }}
                        >
                            <Asteroid size={50} onClick={handleAsteroidClick} />
                        </div>
                    </div>
                </section>
            </div>

            {/* Content Modal */}
            <Modal
                isOpen={activeModal !== null}
                onClose={handleCloseModal}
                title={getModalTitle()}
                color={getModalColor()}
                editModeActions={renderEditModeActions()}
            >
                {renderModalContent()}
            </Modal>

            {/* Password Modal */}
            <PasswordModal 
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
                isExitMode={isEditMode}
            />

            {/* Form Modal for Adding Cards */}
            <FormModal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                onSubmit={handleFormSubmit}
                sectionType={activeModal}
                color={getModalColor()}
            />
        </div>
    );
}

// Main App component wrapped with EditModeProvider
function App() {
    return (
        <EditModeProvider initialData={sampleData}>
            <AppContent />
        </EditModeProvider>
    );
}

export default App;
