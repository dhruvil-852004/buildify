import Common "common";

module {
  public type ContactSubmission = {
    id : Common.SubmissionId;
    name : Text;
    email : Text;
    message : Text;
    projectType : Text;
    submittedAt : Common.Timestamp;
    read : Bool;
  };

  public type CreateSubmissionInput = {
    name : Text;
    email : Text;
    message : Text;
    projectType : Text;
  };
};
