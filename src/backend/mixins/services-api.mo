import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import ServicesLib "../lib/services";
import AdminLib "../lib/admin";
import ServicesTypes "../types/services";

mixin (
  services : List.List<ServicesTypes.Service>,
  adminList : List.List<Principal>,
) {
  public query func listServices() : async [ServicesTypes.Service] {
    ServicesLib.listServices(services);
  };

  public shared ({ caller }) func updateService(input : ServicesTypes.UpdateServiceInput) : async Bool {
    if (not AdminLib.isAdmin(adminList, caller)) {
      Runtime.trap("Unauthorized: admin access required");
    };
    ServicesLib.updateService(services, input);
  };
};
