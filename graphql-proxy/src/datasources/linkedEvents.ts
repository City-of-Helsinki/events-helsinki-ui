import DataSource from "./LinkedEventsDataSource";

class LinkedEventsAPI extends DataSource {
  public async getEventDetails(id: string) {
    return this.get(`event/${id}/`);
  }
}

export default LinkedEventsAPI;
