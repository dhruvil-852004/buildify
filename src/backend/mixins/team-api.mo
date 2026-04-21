import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import TeamLib "../lib/team";
import AdminLib "../lib/admin";
import TeamTypes "../types/team";
import Common "../types/common";

mixin (
  teamMembers : List.List<TeamTypes.TeamMember>,
  nextTeamMemberId : { var value : Nat },
  adminList : List.List<Principal>,
) {
  public query func listTeamMembers() : async [TeamTypes.TeamMember] {
    TeamLib.listTeamMembers(teamMembers);
  };

  public query func getTeamMember(id : Common.TeamMemberId) : async ?TeamTypes.TeamMember {
    TeamLib.getTeamMember(teamMembers, id);
  };

  public shared ({ caller }) func createTeamMember(input : TeamTypes.CreateTeamMemberInput) : async TeamTypes.TeamMember {
    if (not AdminLib.isAdmin(adminList, caller)) {
      Runtime.trap("Unauthorized: admin access required");
    };
    let member = TeamLib.createTeamMember(teamMembers, nextTeamMemberId.value, input);
    nextTeamMemberId.value += 1;
    member;
  };

  public shared ({ caller }) func updateTeamMember(input : TeamTypes.UpdateTeamMemberInput) : async Bool {
    if (not AdminLib.isAdmin(adminList, caller)) {
      Runtime.trap("Unauthorized: admin access required");
    };
    TeamLib.updateTeamMember(teamMembers, input);
  };

  public shared ({ caller }) func deleteTeamMember(id : Common.TeamMemberId) : async Bool {
    if (not AdminLib.isAdmin(adminList, caller)) {
      Runtime.trap("Unauthorized: admin access required");
    };
    TeamLib.deleteTeamMember(teamMembers, id);
  };

  public shared ({ caller }) func updateTeamMemberOrder(id : Common.TeamMemberId, displayOrder : Nat) : async Bool {
    if (not AdminLib.isAdmin(adminList, caller)) {
      Runtime.trap("Unauthorized: admin access required");
    };
    TeamLib.updateDisplayOrder(teamMembers, id, displayOrder);
  };
};
