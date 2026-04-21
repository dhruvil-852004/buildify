import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/contact";
import Common "../types/common";

module {
  public func createSubmission(
    submissions : List.List<Types.ContactSubmission>,
    nextId : Nat,
    input : Types.CreateSubmissionInput,
  ) : Types.ContactSubmission {
    let submission : Types.ContactSubmission = {
      id = nextId;
      name = input.name;
      email = input.email;
      message = input.message;
      projectType = input.projectType;
      submittedAt = Time.now();
      read = false;
    };
    submissions.add(submission);
    submission;
  };

  public func listSubmissions(submissions : List.List<Types.ContactSubmission>) : [Types.ContactSubmission] {
    submissions.toArray();
  };

  public func markRead(
    submissions : List.List<Types.ContactSubmission>,
    id : Common.SubmissionId,
    readVal : Bool,
  ) : Bool {
    var found = false;
    submissions.mapInPlace(func(s) {
      if (s.id == id) {
        found := true;
        { s with read = readVal };
      } else { s };
    });
    found;
  };

  public func deleteSubmission(submissions : List.List<Types.ContactSubmission>, id : Common.SubmissionId) : Bool {
    let before = submissions.size();
    let filtered = submissions.filter(func(s) { s.id != id });
    submissions.clear();
    submissions.append(filtered);
    submissions.size() < before;
  };

  public func batchDeleteSubmissions(submissions : List.List<Types.ContactSubmission>, ids : [Common.SubmissionId]) : Nat {
    let before = submissions.size();
    let filtered = submissions.filter(func(s) {
      not ids.any(func(id) { id == s.id });
    });
    submissions.clear();
    submissions.append(filtered);
    before - submissions.size();
  };
};
