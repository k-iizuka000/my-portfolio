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
  technologies: string[];
  github?: string;
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
  visibleSections: string[];
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  scrollToSection: (id: string) => void;
}

export interface HeaderProps {
  scrollY: number;
}

export interface AboutProps {
  visibleSections: string[];
  scrollY: number;
  data: {
    name: string;
    title: string;
    description: string;
  };
}

export interface SkillsProps {
  visibleSections: string[];
  scrollY: number;
  skills: {
    frontend: string[];
    backend: string[];
    other: string[];
  };
}

export interface ProjectsProps {
  visibleSections: string[];
  scrollY: number;
  projects: ProjectData[];
}

export interface InProgressProps {
  visibleSections: string[];
  scrollY: number;
  inProgressProjects: InProgressData[];
}

export interface ScrollTopButtonProps {
  showScrollTop: boolean;
  scrollToTop: () => void;
}