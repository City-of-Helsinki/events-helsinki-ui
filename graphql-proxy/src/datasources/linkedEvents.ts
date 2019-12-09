import DataSource from "./LinkedEventsDataSource";

class LinkedEventsAPI extends DataSource {
  public async getEventDetails(id: string) {
    return this.get(`event/${id}/?include=in_language,keywords,location`);
  }

  public async getEventList() {
    return this.get(`event?include=keywords,location`);
  }
}

export default LinkedEventsAPI;
