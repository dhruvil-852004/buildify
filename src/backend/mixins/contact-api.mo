import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import ContactLib "../lib/contact";
import AdminLib "../lib/admin";
import ContactTypes "../types/contact";
import Common "../types/common";

mixin (
  submissions : List.List<ContactTypes.ContactSubmission>,
  nextSubmissionId : { var value : Nat },
  adminList : List.List<Principal>,
) {
  public shared func submitContactForm(input : ContactTypes.CreateSubmissionInput) : async ContactTypes.ContactSubmission {
    let submission = ContactLib.createSubmission(submissions, nextSubmissionId.value, input);
    nextSubmissionId.value += 1;
    submission;
  };

  public query ({ caller }) func listContactSubmissions() : async [ContactTypes.ContactSubmission] {
    if (not AdminLib.isAdmin(adminList, caller)) {
      Runtime.trap("Unauthorized: admin access required");
    };
    ContactLib.listSubmissions(submissions);
  };

  public shared ({ caller }) func markSubmissionRead(id : Common.SubmissionId, read : Bool) : async Bool {
    if (not AdminLib.isAdmin(adminList, caller)) {
      Runtime.trap("Unauthorized: admin access required");
    };
    ContactLib.markRead(submissions, id, read);
  };

  public shared ({ caller }) func deleteSubmission(id : Common.SubmissionId) : async Bool {
    if (not AdminLib.isAdmin(adminList, caller)) {
      Runtime.trap("Unauthorized: admin access required");
    };
    ContactLib.deleteSubmission(submissions, id);
  };

  public shared ({ caller }) func batchDeleteSubmissions(ids : [Common.SubmissionId]) : async Nat {
    if (not AdminLib.isAdmin(adminList, caller)) {
      Runtime.trap("Unauthorized: admin access required");
    };
    ContactLib.batchDeleteSubmissions(submissions, ids);
  };
};
