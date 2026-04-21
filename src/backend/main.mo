import List "mo:core/List";
import Principal "mo:core/Principal";
import PortfolioTypes "types/portfolio";
import ServicesTypes "types/services";
import TeamTypes "types/team";
import ContactTypes "types/contact";
import ServicesLib "lib/services";
import PortfolioApi "mixins/portfolio-api";
import ServicesApi "mixins/services-api";
import TeamApi "mixins/team-api";
import ContactApi "mixins/contact-api";
import AdminApi "mixins/admin-api";

actor {
  // Admin state
  let adminList = List.empty<Principal>();
  let owner = { var value : Principal = Principal.fromText("aaaaa-aa") };

  // Portfolio state
  let projects = List.empty<PortfolioTypes.Project>();
  let nextProjectId = { var value : Nat = 1 };

  // Services state
  let services = List.empty<ServicesTypes.Service>();

  // Team state
  let teamMembers = List.empty<TeamTypes.TeamMember>();
  let nextTeamMemberId = { var value : Nat = 1 };

  // Contact submissions state
  let submissions = List.empty<ContactTypes.ContactSubmission>();
  let nextSubmissionId = { var value : Nat = 1 };

  // Initialize default services on first deploy
  ServicesLib.initDefaultServices(services);

  include AdminApi(adminList, owner);
  include PortfolioApi(projects, nextProjectId, adminList);
  include ServicesApi(services, adminList);
  include TeamApi(teamMembers, nextTeamMemberId, adminList);
  include ContactApi(submissions, nextSubmissionId, adminList);
};
