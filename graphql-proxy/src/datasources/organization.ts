import DataSource from "./LinkedEventsDataSource";

class OrganizationAPI extends DataSource {
  public async getOrganizationDetails(id: string) {
    return this.get(`organization/${id}`);
  }
}

export default OrganizationAPI;
