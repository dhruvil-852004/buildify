import Common "common";

module {
  public type TeamMember = {
    id : Common.TeamMemberId;
    name : Text;
    role : Text;
    bio : Text;
    imageUrl : Text;
    displayOrder : Nat;
    linkedIn : Text;
    twitter : Text;
  };

  public type CreateTeamMemberInput = {
    name : Text;
    role : Text;
    bio : Text;
    imageUrl : Text;
    displayOrder : Nat;
    linkedIn : Text;
    twitter : Text;
  };

  public type UpdateTeamMemberInput = {
    id : Common.TeamMemberId;
    name : Text;
    role : Text;
    bio : Text;
    imageUrl : Text;
    displayOrder : Nat;
    linkedIn : Text;
    twitter : Text;
  };
};
