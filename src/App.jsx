import { useState, useEffect } from 'react';
import coveo from './assets/coveo.png';
import consoltec from './assets/consoltec.png';
import sitecore from './assets/sitecore.png';
import concordia from './assets/concordia.png';
import Planet from './components/Planet';
import Modal from './components/Modal';
import StarField from './components/StarField';
import TypingHeader from './components/TypingHeader';
import Experiences from './components/sections/Experiences';
import Education from './components/sections/Education';
import Projects from './components/sections/Projects';
import About from './components/sections/About';
import EditableAbout from './components/sections/EditableAbout';
import Contact from './components/sections/Contact';
import EditableExperiences from './components/sections/EditableExperiences';
import EditableEducation from './components/sections/EditableEducation';
import EditableProjects from './components/sections/EditableProjects';
import PasswordModal from './components/PasswordModal';
import EditModeActions from './components/EditModeActions';
import FormModal from './components/FormModal';
import { EditModeProvider, useEditMode } from './contexts/EditModeContext';

// Fallback data
const sampleData = {
    experiences: [
        {
            id: 3,
            company: 'Coveo',
            position: 'Software Developer Intern',
            duration: 'Jan. 2025 - Aug. 2025',
            description: "Leveraged Coveo’s Headless and Atomic frameworks to enhance search efficiency and personal recommendations.",
            technologies: [
                'Python',
                'React',
                'Angular',
                'C#',
                'Azure DevOps'
            ],
            image: coveo
        },
        {
            id: 2,
            company: 'Consoltec',
            position: 'Web Developer Intern',
            duration: 'May 2024 - Aug. 2024',
            description: 'Working on key features and bug fixes to enhance product stability and user satisfaction, while also engaging in daily meetups.',
            technologies: [
                'C#',
                'Angular',
                'JavaScript',
                'SQL Server'
            ],
            image: consoltec
        },
        {
            id: 1,
            company: 'Sitecore',
            position: 'Software Engineer Intern',
            duration: 'Jan. 2024 - Apr. 2024',
            description: 'Collaborated with the deployment team to develop Sitecore-based websites, resolve maintenance issues, and structured bug analysis.',
            technologies: [
                'C#',
                'ASP.NET',
                'IIS',
                'SQL Server'
            ],
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
            id: 2,
            name: 'BestFood',
            description: 'Food e-commerce website',
            technologies: [
                'Java',
                'Spring Boot',
                'MySQL',
                'Bootstrap'
            ],
            link: 'https://bestfood.mohammadalshikh.com',
            github: 'https://github.com/mohammadalshikh/e-commerce-spring-boot',
        },
        {
            id: 3,
            name: 'MindSync',
            description: 'Task-management Discord bot with LLM integration',
            technologies: [
                'Discord.js',
                'OpenAI API'
            ],
            link: null,
            github: 'https://github.com/mohammadalshikh/mindsync',
        },
        {
            id: 4,
            name: 'True Clear Terminal',
            description: 'VS Code extension to clear integrated terminal and scroll-back buffer',
            technologies: [
                'TypeScript',
                'JavaScript'
            ],
            link: 'https://marketplace.visualstudio.com/items?itemName=mohammadalshikh.true-clear-terminal',
            github: 'https://github.com/mohammadalshikh/true-clear-terminal-vscode',
        },
        {
            id: 1,
            name: 'ConcoGrades',
            description: 'A classroom management web-app for teachers and students',
            technologies: [
                'Python',
                'Flask',
                'JavaScript',
                'Bootstrap'
            ],
            link: 'https://concogrades.mohammadalshikh.com',
            github: 'https://github.com/mohammadalshikh/classroom-management-flask',
        },
        {
            id: 5,
            name: "SolarScope",
            description: "Interactive 3D solar system simulation",
            technologies: [
                "C++",
                "OpenGL",
                "Assimp"
            ],
            link: null,
            github: "https://github.com/mohammadalshikh/comp-371-project",
        }
    ],
    about: {
        intro: `Hello! I'm Mohammad Alshikh, a passionate developer who loves creating beautiful and functional web experiences.\n\nCurrently finishing my last year at Concordia, I have learned a handful of technologies over the past few years that helped me grow and contribute as an engineer. At the moment, my focus is on building modern web applications that are both robust and scalable.`,
        skills: [
            'Python',
            'C#',
            'Java',
            'Spring Boot',
            'Flask',
            'React',
            'Angular',
            'SQL'
        ],
        interests: [
            'Writing stories',
            'Exploring nature',
            'Sports',
            'Cinema',
            'Video games',
            'Hip-hop'
        ],
    },
};

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
                updateSection('experiences', [newCard, ...data.experiences]);
                break;
            case 'education':
                updateSection('education', [newCard, ...data.education]);
                break;
            case 'projects':
                updateSection('projects', [newCard, ...data.projects]);
                break;
            default:
                break;
        }
    };

    const renderModalContent = () => {
        switch (activeModal) {
            case 'about':
                return isEditMode ? (
                    <EditableAbout
                        about={data.about}
                        onChange={(newAbout) =>
                            updateSection('about', newAbout)
                        } />
                ) : (
                    <About about={data.about} />
                );
            case 'experiences':
                return isEditMode ? (
                    <EditableExperiences
                        experiences={data.experiences}
                        onChange={(newExperiences) =>
                            updateSection('experiences', newExperiences)
                        }
                    />
                ) : (
                    <Experiences experiences={data.experiences} />
                );
            case 'education':
                return isEditMode ? (
                    <EditableEducation
                        education={data.education}
                        onChange={(newEducation) =>
                            updateSection('education', newEducation)
                        }
                    />
                ) : (
                    <Education education={data.education} />
                );
            case 'projects':
                return isEditMode ? (
                    <EditableProjects
                        projects={data.projects}
                        onChange={(newProjects) =>
                            updateSection('projects', newProjects)
                        }
                    />
                ) : (
                    <Projects projects={data.projects} />
                );
            case 'contact':
                return <Contact />;
            default:
                return null;
        }
    };

    const renderEditModeActions = () => {
        if (!isEditMode || activeModal === 'contact') {
            return null;
        }

        // Hide adding button for About
        if (activeModal === 'about') {
            return <EditModeActions onAdd={handleAddCard} showAdd={false} />;
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
        <div className="app-container">
            <StarField starCount={300} />

            <div className="app-stars">
                <TypingHeader
                    onAsteroidClick={handleAsteroidClick}
                />
                <section id="planets-section" className="app-header-section">
                    <div className="app-planets-desktop">
                        {destinations.map(dest => (
                            <div
                                key={dest.id}
                                className="app-planet-wrapper"
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

                    <div className="app-planets-mobile">
                        {destinations.map(dest => (
                            <div
                                key={dest.id}
                                className="app-planet-wrapper"
                                style={{
                                    top: dest.mobilePosition.top,
                                    left: dest.mobilePosition.left,
                                    right: dest.mobilePosition.right,
                                    bottom: dest.mobilePosition.bottom,
                                    transform: dest.mobilePosition.transform
                                }}
                            >
                                <Planet
                                    {...dest}
                                    size={
                                        Math.max(100, dest.size * 0.6)
                                    }
                                    onClick={handlePlanetClick} />
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Content modal */}
            <Modal
                isOpen={activeModal !== null}
                onClose={handleCloseModal}
                title={getModalTitle()}
                color={getModalColor()}
                editModeActions={renderEditModeActions()}
            >
                {renderModalContent()}
            </Modal>

            {/* Password modal */}
            <PasswordModal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
                isExitMode={isEditMode}
            />

            {/* Form modal */}
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

function App() {
    return (
        <EditModeProvider initialData={sampleData}>
            <AppContent />
        </EditModeProvider>
    );
}

export default App;
