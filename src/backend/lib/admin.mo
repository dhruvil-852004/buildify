import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

module {
  public func isAdmin(admins : List.List<Principal>, caller : Principal) : Bool {
    admins.any(func(p) { Principal.equal(p, caller) });
  };

  public func isOwner(owner : { var value : Principal }, caller : Principal) : Bool {
    Principal.equal(owner.value, caller);
  };

  public func setAdmins(
    adminList : List.List<Principal>,
    owner : { var value : Principal },
    caller : Principal,
    newAdmins : [Principal],
  ) {
    if (not Principal.equal(owner.value, caller)) {
      Runtime.trap("Only owner can set admins");
    };
    adminList.clear();
    for (p in newAdmins.vals()) {
      adminList.add(p);
    };
  };

  public func getAdmins(admins : List.List<Principal>) : [Principal] {
    admins.toArray();
  };
};
