import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import PortfolioLib "../lib/portfolio";
import AdminLib "../lib/admin";
import PortfolioTypes "../types/portfolio";
import Common "../types/common";

mixin (
  projects : List.List<PortfolioTypes.Project>,
  nextProjectId : { var value : Nat },
  adminList : List.List<Principal>,
) {
  public query func listProjects() : async [PortfolioTypes.Project] {
    PortfolioLib.listProjects(projects);
  };

  public query func getProject(id : Common.ProjectId) : async ?PortfolioTypes.Project {
    PortfolioLib.getProject(projects, id);
  };

  public shared ({ caller }) func createProject(input : PortfolioTypes.CreateProjectInput) : async PortfolioTypes.Project {
    if (not AdminLib.isAdmin(adminList, caller)) {
      Runtime.trap("Unauthorized: admin access required");
    };
    let project = PortfolioLib.createProject(projects, nextProjectId.value, input);
    nextProjectId.value += 1;
    project;
  };

  public shared ({ caller }) func updateProject(input : PortfolioTypes.UpdateProjectInput) : async Bool {
    if (not AdminLib.isAdmin(adminList, caller)) {
      Runtime.trap("Unauthorized: admin access required");
    };
    PortfolioLib.updateProject(projects, input);
  };

  public shared ({ caller }) func deleteProject(id : Common.ProjectId) : async Bool {
    if (not AdminLib.isAdmin(adminList, caller)) {
      Runtime.trap("Unauthorized: admin access required");
    };
    PortfolioLib.deleteProject(projects, id);
  };

  public shared ({ caller }) func batchDeleteProjects(ids : [Common.ProjectId]) : async Nat {
    if (not AdminLib.isAdmin(adminList, caller)) {
      Runtime.trap("Unauthorized: admin access required");
    };
    PortfolioLib.batchDeleteProjects(projects, ids);
  };

  public shared ({ caller }) func toggleProjectStatus(id : Common.ProjectId) : async Bool {
    if (not AdminLib.isAdmin(adminList, caller)) {
      Runtime.trap("Unauthorized: admin access required");
    };
    PortfolioLib.toggleProjectStatus(projects, id);
  };
};
