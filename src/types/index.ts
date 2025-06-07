export interface MenuItems {
  id: string;
  label: string;
}

export interface AboutData {
  title: string;
  description: string;
}

export interface ProjectData {
  id: number;
  title: string;
  description: string;
  technologies: Array<string | { name: string; role: string }>;
  github?: string;
  period?: {
    start: string;
    end: string;
  };
  role?: string;
  teamSize?: number;
}

export interface InProgressData {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  status: string;
}

export interface SkillData {
  name: string;
  years: number;
  projects: string;
  notes: string;
}

export interface PortfolioData {
  about: {
    name: string;
    title: string;
    description: string;
  };
  summary: {
    totalExperience: string;
    highlights: string[];
    coreTechnologies: Array<{
      name: string;
      years: number;
      level: string;
    }>;
  };
  skills: {
    frontend: string[];
    backend: string[];
    other: string[];
  };
  projects: ProjectData[];
  inProgress: InProgressData[];
}

export interface SectionProps {
  visibleSections: { [key: string]: boolean };
  scrollY: number;
}

export interface NavigationProps {
  menuItems: MenuItems[];
  visibleSections: { [key: string]: boolean };
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  scrollToSection: (id: string) => void;
}

export interface HeaderProps {
  scrollY: number;
}

export interface AboutProps extends SectionProps {
  data: {
    name: string;
    title: string;
    description: string;
  };
}

export interface SkillsProps extends SectionProps {
  skills: {
    frontend: string[];
    backend: string[];
    other: string[];
  };
}

export interface ProjectsProps extends SectionProps {
  projects: ProjectData[];
}

export interface InProgressProps extends SectionProps {
  inProgressProjects: InProgressData[];
}

export interface ScrollTopButtonProps {
  showScrollTop: boolean;
  scrollToTop: () => void;
}