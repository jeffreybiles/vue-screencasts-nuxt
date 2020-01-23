import { Server, JSONAPISerializer, Model } from "miragejs";
import videoJSON from "@/mirage/videos.json";

export function makeServer({environment = 'development'} = {}) {
  let server = new Server({
    environment,
    fixtures: {
      videos: videoJSON
    },
    serializers: {
      application: JSONAPISerializer
    },
    models: {
      video: Model
    },
    routes() {
      this.namespace = "api";
      this.urlPrefix = 'http://localhost:3000'

      this.get("/videos");
      this.get("/videos/:id");
    }
  })

  return server;
}
