import DataSource from "./DataSource";

class DummyAPI extends DataSource {
  public async getAllItems() {
    return this.get("items");
  }
}

export default DummyAPI;
