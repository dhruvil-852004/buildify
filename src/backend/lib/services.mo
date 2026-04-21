import List "mo:core/List";
import Types "../types/services";

module {
  public func listServices(services : List.List<Types.Service>) : [Types.Service] {
    services.toArray();
  };

  public func updateService(
    services : List.List<Types.Service>,
    input : Types.UpdateServiceInput,
  ) : Bool {
    var found = false;
    services.mapInPlace(func(s) {
      if (s.id == input.id) {
        found := true;
        {
          s with
          title = input.title;
          description = input.description;
          iconUrl = input.iconUrl;
          displayOrder = input.displayOrder;
        };
      } else { s };
    });
    found;
  };

  public func initDefaultServices(services : List.List<Types.Service>) {
    if (services.size() > 0) { return };
    let defaults : [Types.Service] = [
      {
        id = 1;
        title = "Land Grading";
        description = "Professional land grading services to ensure proper drainage and a level foundation for your construction projects.";
        iconUrl = "";
        displayOrder = 1;
      },
      {
        id = 2;
        title = "Slope Correction";
        description = "Expert slope correction to eliminate erosion risks and create safe, stable land for residential and commercial use.";
        iconUrl = "";
        displayOrder = 2;
      },
      {
        id = 3;
        title = "Drainage Solutions";
        description = "Comprehensive drainage solutions including French drains, swales, and surface grading to manage water flow effectively.";
        iconUrl = "";
        displayOrder = 3;
      },
      {
        id = 4;
        title = "Soil Compaction";
        description = "High-quality soil compaction services to provide a solid base that meets engineering specifications for any project.";
        iconUrl = "";
        displayOrder = 4;
      },
    ];
    for (s in defaults.vals()) {
      services.add(s);
    };
  };
};
