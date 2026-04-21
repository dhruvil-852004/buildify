import { createActor } from "@/backend";
import type {
  ContactSubmission,
  CreateProjectInput,
  CreateTeamMemberInput,
  Project,
  Service,
  SubmissionId,
  TeamMember,
  UpdateProjectInput,
  UpdateServiceInput,
  UpdateTeamMemberInput,
} from "@/backend.d";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function useBackendActor() {
  return useActor(createActor);
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export function useProjects() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProjects();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateProject() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateProjectInput) => {
      if (!actor) throw new Error("No actor");
      return actor.createProject(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useUpdateProject() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: UpdateProjectInput) => {
      if (!actor) throw new Error("No actor");
      return actor.updateProject(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useDeleteProject() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteProject(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useToggleProjectStatus() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.toggleProjectStatus(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useBatchDeleteProjects() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (ids: bigint[]) => {
      if (!actor) throw new Error("No actor");
      return actor.batchDeleteProjects(ids);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

// ─── Services ─────────────────────────────────────────────────────────────────

export function useServices() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateService() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: UpdateServiceInput) => {
      if (!actor) throw new Error("No actor");
      return actor.updateService(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
}

// ─── Team Members ─────────────────────────────────────────────────────────────

export function useTeamMembers() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<TeamMember[]>({
    queryKey: ["team"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listTeamMembers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateTeamMember() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateTeamMemberInput) => {
      if (!actor) throw new Error("No actor");
      return actor.createTeamMember(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["team"] }),
  });
}

export function useUpdateTeamMember() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: UpdateTeamMemberInput) => {
      if (!actor) throw new Error("No actor");
      return actor.updateTeamMember(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["team"] }),
  });
}

export function useDeleteTeamMember() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteTeamMember(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["team"] }),
  });
}

// ─── Submissions ──────────────────────────────────────────────────────────────

export function useSubmissions() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<ContactSubmission[]>({
    queryKey: ["submissions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listContactSubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMarkSubmissionRead() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, read }: { id: SubmissionId; read: boolean }) => {
      if (!actor) throw new Error("No actor");
      return actor.markSubmissionRead(id, read);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["submissions"] }),
  });
}

export function useDeleteSubmission() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: SubmissionId) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteSubmission(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["submissions"] }),
  });
}

// ─── Admin status ─────────────────────────────────────────────────────────────

export function useIsAdmin() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}
