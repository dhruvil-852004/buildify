import Common "common";

module {
  public type Service = {
    id : Common.ServiceId;
    title : Text;
    description : Text;
    iconUrl : Text;
    displayOrder : Nat;
  };

  public type UpdateServiceInput = {
    id : Common.ServiceId;
    title : Text;
    description : Text;
    iconUrl : Text;
    displayOrder : Nat;
  };
};
