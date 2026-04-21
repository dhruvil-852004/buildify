import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UpdateServiceInput {
    id: ServiceId;
    title: string;
    displayOrder: bigint;
    description: string;
    iconUrl: string;
}
export type ServiceId = bigint;
export type Timestamp = bigint;
export interface ContactSubmission {
    id: SubmissionId;
    projectType: string;
    name: string;
    read: boolean;
    submittedAt: Timestamp;
    email: string;
    message: string;
}
export interface CreateSubmissionInput {
    projectType: string;
    name: string;
    email: string;
    message: string;
}
export interface Service {
    id: ServiceId;
    title: string;
    displayOrder: bigint;
    description: string;
    iconUrl: string;
}
export interface UpdateTeamMemberInput {
    id: TeamMemberId;
    bio: string;
    linkedIn: string;
    twitter: string;
    displayOrder: bigint;
    name: string;
    role: string;
    imageUrl: string;
}
export type SubmissionId = bigint;
export interface CreateTeamMemberInput {
    bio: string;
    linkedIn: string;
    twitter: string;
    displayOrder: bigint;
    name: string;
    role: string;
    imageUrl: string;
}
export interface UpdateProjectInput {
    id: ProjectId;
    title: string;
    featured: boolean;
    active: boolean;
    description: string;
    imageUrl: string;
    category: ProjectCategory;
    location: string;
}
export type TeamMemberId = bigint;
export type ProjectId = bigint;
export interface TeamMember {
    id: TeamMemberId;
    bio: string;
    linkedIn: string;
    twitter: string;
    displayOrder: bigint;
    name: string;
    role: string;
    imageUrl: string;
}
export interface CreateProjectInput {
    title: string;
    featured: boolean;
    active: boolean;
    description: string;
    imageUrl: string;
    category: ProjectCategory;
    location: string;
}
export interface Project {
    id: ProjectId;
    title: string;
    featured: boolean;
    active: boolean;
    createdAt: Timestamp;
    description: string;
    updatedAt: Timestamp;
    imageUrl: string;
    category: ProjectCategory;
    location: string;
}
export enum ProjectCategory {
    Commercial = "Commercial",
    Foundation = "Foundation",
    Drainage = "Drainage",
    SiteRegrading = "SiteRegrading",
    Residential = "Residential"
}
export interface backendInterface {
    batchDeleteProjects(ids: Array<ProjectId>): Promise<bigint>;
    batchDeleteSubmissions(ids: Array<SubmissionId>): Promise<bigint>;
    createProject(input: CreateProjectInput): Promise<Project>;
    createTeamMember(input: CreateTeamMemberInput): Promise<TeamMember>;
    deleteProject(id: ProjectId): Promise<boolean>;
    deleteSubmission(id: SubmissionId): Promise<boolean>;
    deleteTeamMember(id: TeamMemberId): Promise<boolean>;
    getAdmins(): Promise<Array<Principal>>;
    getProject(id: ProjectId): Promise<Project | null>;
    getTeamMember(id: TeamMemberId): Promise<TeamMember | null>;
    isAdmin(): Promise<boolean>;
    listContactSubmissions(): Promise<Array<ContactSubmission>>;
    listProjects(): Promise<Array<Project>>;
    listServices(): Promise<Array<Service>>;
    listTeamMembers(): Promise<Array<TeamMember>>;
    markSubmissionRead(id: SubmissionId, read: boolean): Promise<boolean>;
    setAdmins(newAdmins: Array<Principal>): Promise<void>;
    submitContactForm(input: CreateSubmissionInput): Promise<ContactSubmission>;
    toggleProjectStatus(id: ProjectId): Promise<boolean>;
    updateProject(input: UpdateProjectInput): Promise<boolean>;
    updateService(input: UpdateServiceInput): Promise<boolean>;
    updateTeamMember(input: UpdateTeamMemberInput): Promise<boolean>;
    updateTeamMemberOrder(id: TeamMemberId, displayOrder: bigint): Promise<boolean>;
}
