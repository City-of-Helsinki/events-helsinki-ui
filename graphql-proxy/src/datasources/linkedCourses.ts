import DataSource from "./LinkedCoursesDataSource";

class LinkedEventsAPI extends DataSource {
  public async getEventDetails(id: string) {
    return this.get(`event/${id}/?include=in_language,keywords,location`);
  }
}

export default LinkedEventsAPI;
