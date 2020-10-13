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
export { default as ChecklistModal } from './ResidentDashboardGroup/ChecklistGroup/ChecklistModal';

// Components for Program Compare Dashboard to compare programs
export { default as ProgramSummary } from './ProgramCompareGroup/ProgramSummary';
export { default as ProgramMonthlyPlot } from './ProgramCompareGroup/ProgramMonthlyPlot';
export { default as ProgramCountPlot } from './ProgramCompareGroup/ProgramCountPlot';
export { default as ProgramScoreDistribution } from './ProgramCompareGroup/ProgramScoreDistribution';
export { default as ProgramStageDistribution } from './ProgramCompareGroup/ProgramStageDistribution';
export { default as ProgramWordCount } from './ProgramCompareGroup/ProgramWordCount';

// Reusable components 
export { default as FileUpload } from './ReusableComponents/FileUpload';
export { default as RadioButton } from './ReusableComponents/RadioButton';
export { default as StatCard } from './ReusableComponents/StatCard';
export { default as MicroStatCard } from './ReusableComponents/MicroStatCard';
export { default as Modal } from './ReusableComponents/Modal';
export { default as InfoTip } from './ReusableComponents/InfoTip';

// Baselevel components that are wrappers
export { default as NavBar } from './NavBar';
export { default as Container } from './Container';

// Components for the Undergraduate Dashboard
export { default as UGStudentDashboard } from './UGGroup/DashboardGroup/UGStudentDashboard';
export { default as UGDownloadDashboard } from './UGGroup/DashboardGroup/UGDownloadDashboard';
export { default as UGProgramDashboard } from './UGGroup/DashboardGroup/UGProgramDashboard';
export { default as UGFacultyDashboard } from './UGGroup/DashboardGroup/UGFacultyDashboard';

export { default as UGStub } from './UGGroup/UGStub';

// Components for the Undergraduate Admin Pages
export { default as UGCreateUser } from './UGGroup/UGAdminGroup/UGCreateUser';
export { default as UGModifyUser } from './UGGroup/UGAdminGroup/UGModifyUser';
export { default as UGAddData } from './UGGroup/UGAdminGroup/UGAddData';




