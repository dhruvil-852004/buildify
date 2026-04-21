import List "mo:core/List";
import Types "../types/team";
import Common "../types/common";

module {
  public func listTeamMembers(members : List.List<Types.TeamMember>) : [Types.TeamMember] {
    members.toArray();
  };

  public func getTeamMember(members : List.List<Types.TeamMember>, id : Common.TeamMemberId) : ?Types.TeamMember {
    members.find(func(m) { m.id == id });
  };

  public func createTeamMember(
    members : List.List<Types.TeamMember>,
    nextId : Nat,
    input : Types.CreateTeamMemberInput,
  ) : Types.TeamMember {
    let member : Types.TeamMember = {
      id = nextId;
      name = input.name;
      role = input.role;
      bio = input.bio;
      imageUrl = input.imageUrl;
      displayOrder = input.displayOrder;
      linkedIn = input.linkedIn;
      twitter = input.twitter;
    };
    members.add(member);
    member;
  };

  public func updateTeamMember(
    members : List.List<Types.TeamMember>,
    input : Types.UpdateTeamMemberInput,
  ) : Bool {
    var found = false;
    members.mapInPlace(func(m) {
      if (m.id == input.id) {
        found := true;
        {
          m with
          name = input.name;
          role = input.role;
          bio = input.bio;
          imageUrl = input.imageUrl;
          displayOrder = input.displayOrder;
          linkedIn = input.linkedIn;
          twitter = input.twitter;
        };
      } else { m };
    });
    found;
  };

  public func deleteTeamMember(members : List.List<Types.TeamMember>, id : Common.TeamMemberId) : Bool {
    let before = members.size();
    let filtered = members.filter(func(m) { m.id != id });
    members.clear();
    members.append(filtered);
    members.size() < before;
  };

  public func updateDisplayOrder(
    members : List.List<Types.TeamMember>,
    id : Common.TeamMemberId,
    displayOrder : Nat,
  ) : Bool {
    var found = false;
    members.mapInPlace(func(m) {
      if (m.id == id) {
        found := true;
        { m with displayOrder };
      } else { m };
    });
    found;
  };
};
