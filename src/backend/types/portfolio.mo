import Common "common";

module {
  public type ProjectCategory = {
    #SiteRegrading;
    #Drainage;
    #Foundation;
    #Commercial;
    #Residential;
  };

  public type Project = {
    id : Common.ProjectId;
    title : Text;
    description : Text;
    category : ProjectCategory;
    location : Text;
    imageUrl : Text;
    featured : Bool;
    active : Bool;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type CreateProjectInput = {
    title : Text;
    description : Text;
    category : ProjectCategory;
    location : Text;
    imageUrl : Text;
    featured : Bool;
    active : Bool;
  };

  public type UpdateProjectInput = {
    id : Common.ProjectId;
    title : Text;
    description : Text;
    category : ProjectCategory;
    location : Text;
    imageUrl : Text;
    featured : Bool;
    active : Bool;
  };
};
