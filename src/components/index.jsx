// Components that are used in the Admin Page for CRUD operation of data tables
export { default as CreateUser } from './AdminGroup/CreateUser';
export { default as ModifyUser } from './AdminGroup/ModifyUser';
export { default as AddData } from './AdminGroup/AddData';
export { default as AddExamscore } from './AdminGroup/AddExamscore';
export { default as AddCCFeedback } from './AdminGroup/AddCCFeedback';
// Components for each of the five dashboards
export { default as ResidentDashboard } from './DashboardGroup/ResidentDashboard';
export { default as ProgramDashboard } from './DashboardGroup/ProgramDashboard';
export { default as FacultyDashboard } from './DashboardGroup/FacultyDashboard';
export { default as DownloadDashboard } from './DashboardGroup/DownloadDashboard';
export { default as NormativeDashboard } from './DashboardGroup/NormativeDashboard';
// Components for Normative Dashboard to compare residents
export { default as NormativeTable } from './NormativeDashboardGroup/NormativeTable';
export { default as NormativeFilterPanel } from './NormativeDashboardGroup/NormativeFilterPanel';
export { default as NormativeGraph } from './NormativeDashboardGroup/NormativeGraph';

// Components for Faculty Dashboard to compare residents
export { default as FacultyFilterPanel } from './FacultyDashbordGroup/FacultyFilterPanel';
export { default as FacultyInfoGroup } from './FacultyDashbordGroup/FacultyInfoGroup';
export { default as FacultyGraphGroup } from './FacultyDashbordGroup/FacultyGraphGroup';
export { default as FacultyRecordTable } from './FacultyDashbordGroup/FacultyRecordTable';


// Components for Resident Dashboard to compare residents
export { default as GraphPanel } from './ResidentDashboardGroup/GraphPanelGroup/GraphPanel';
export { default as InfoPanel } from './ResidentDashboardGroup/InfoPanelGroup/InfoPanel';
export { default as ExpiredRecordTable } from './ResidentDashboardGroup/ExpiredRecordTable';
export { default as FilterPanel } from './ResidentDashboardGroup/FilterPanel';
export { default as InfoCardsPanel } from './ResidentDashboardGroup/InfoCardsPanel';
export { default as NarrativeTable } from './ResidentDashboardGroup/NarrativeTable';
// Reusable components 
export { default as FileUpload } from './ReusableComponents/FileUpload';
export { default as RadioButton } from './ReusableComponents/RadioButton';
export { default as StatCard } from './ReusableComponents/StatCard';
export { default as MicroStatCard } from './ReusableComponents/MicroStatCard';
export { default as Modal } from './ReusableComponents/Modal';

// Baselevel components that are wrappers
export { default as NavBar } from './NavBar';
export { default as Container } from './Container';





