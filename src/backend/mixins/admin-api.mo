import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AdminLib "../lib/admin";

mixin (
  adminList : List.List<Principal>,
  owner : { var value : Principal },
) {
  public query ({ caller }) func isAdmin() : async Bool {
    AdminLib.isAdmin(adminList, caller);
  };

  public query func getAdmins() : async [Principal] {
    AdminLib.getAdmins(adminList);
  };

  public shared ({ caller }) func setAdmins(newAdmins : [Principal]) : async () {
    AdminLib.setAdmins(adminList, owner, caller, newAdmins);
  };
};
