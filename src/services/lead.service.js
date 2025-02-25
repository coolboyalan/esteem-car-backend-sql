import Lead from "#models/lead";
import Service from "#services/base";

class LeadService extends Service {
  static Model = Lead;
}

export default LeadService;
