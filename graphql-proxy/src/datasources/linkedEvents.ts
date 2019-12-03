import DataSource from "./LinkedEventsDataSource";

class LinkedEventsAPI extends DataSource {
  public async getEventDetails(id: string) {
    return this.get(`event/${id}/?include=keywords,location`);
  }
}

export default LinkedEventsAPI;
