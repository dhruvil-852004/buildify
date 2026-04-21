import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/portfolio";
import Common "../types/common";

module {
  public func listProjects(projects : List.List<Types.Project>) : [Types.Project] {
    projects.toArray();
  };

  public func getProject(projects : List.List<Types.Project>, id : Common.ProjectId) : ?Types.Project {
    projects.find(func(p) { p.id == id });
  };

  public func createProject(
    projects : List.List<Types.Project>,
    nextId : Nat,
    input : Types.CreateProjectInput,
  ) : Types.Project {
    let now = Time.now();
    let project : Types.Project = {
      id = nextId;
      title = input.title;
      description = input.description;
      category = input.category;
      location = input.location;
      imageUrl = input.imageUrl;
      featured = input.featured;
      active = input.active;
      createdAt = now;
      updatedAt = now;
    };
    projects.add(project);
    project;
  };

  public func updateProject(
    projects : List.List<Types.Project>,
    input : Types.UpdateProjectInput,
  ) : Bool {
    var found = false;
    projects.mapInPlace(func(p) {
      if (p.id == input.id) {
        found := true;
        {
          p with
          title = input.title;
          description = input.description;
          category = input.category;
          location = input.location;
          imageUrl = input.imageUrl;
          featured = input.featured;
          active = input.active;
          updatedAt = Time.now();
        };
      } else { p };
    });
    found;
  };

  public func deleteProject(projects : List.List<Types.Project>, id : Common.ProjectId) : Bool {
    let before = projects.size();
    let filtered = projects.filter(func(p) { p.id != id });
    projects.clear();
    projects.append(filtered);
    projects.size() < before;
  };

  public func batchDeleteProjects(projects : List.List<Types.Project>, ids : [Common.ProjectId]) : Nat {
    let before = projects.size();
    let filtered = projects.filter(func(p) {
      not ids.any(func(id) { id == p.id });
    });
    projects.clear();
    projects.append(filtered);
    before - projects.size();
  };

  public func toggleProjectStatus(projects : List.List<Types.Project>, id : Common.ProjectId) : Bool {
    var found = false;
    projects.mapInPlace(func(p) {
      if (p.id == id) {
        found := true;
        { p with active = not p.active; updatedAt = Time.now() };
      } else { p };
    });
    found;
  };
};
