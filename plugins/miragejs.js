import { Server, Model, JSONAPISerializer, hasMany } from 'miragejs';
import _ from 'lodash';

let videos = [
  {
    id: 1,
    name: "ES2015 Arrow Functions",
    description: `<p>ES2015 (aka ES6) has some great ways to make your code easier to write and understand. In this episode, we cover two different ways that you can make your code clearer by removing the 'function' keyword.</p>`,
    thumbnail: "https://vue-screencasts.s3.us-east-2.amazonaws.com/images/video-thumbnails/Thumbnail+-+Arrow+Function.png",
    videoUrl: "https://vue-screencasts.s3.us-east-2.amazonaws.com/video-files/38-+es2015-+functions+minus+'function'.mp4",
    duration: '300',
    codeSummary: `let code = 'coolCode'`,
    published_at: new Date(),
    tagIds: ['1', '2'],
  },
  {
    id: 2,
    name: "ES2015 Template Strings",
    description: `<p>Template strings are an incredibly useful new feature in ES2015... and you can use them in your Ember apps today!</p>
                  <p>Here are 3 cool things that template strings enable.</p>`,
    thumbnail: "https://vue-screencasts.s3.us-east-2.amazonaws.com/images/video-thumbnails/Thumbnail+-+Template+Strings.png",
    videoUrl: "https://vue-screencasts.s3.us-east-2.amazonaws.com/video-files/42-+ES2015+template+strings.mp4",
    duration: '236',
    code_summary: 'let code = "This code is even cooler."',
    published_at: Date.now(),
    tagIds: ['1'],
  }
];

let BaseSerializer = JSONAPISerializer.extend({
  keyForAttribute(attr) {
    if(attr == 's3Keys') {
      return 's3_keys'
    } else {
      return _.snakeCase(attr);
    }
  }
});

let tags = [{
  id: '1',
  name: 'Javascript',
  videoIds: ['1', '2']
}, {
  id: '2',
  name: 'Arrow Functions',
  videoIds: ['1']
}]

let users = [{
  id: '1',
  email: 'user@gmail.com',
  name: 'Regular User',
  token: '24%(&!$#tocuh',
  playedVideoIds: ['1']
}, {
  id: '2',
  email: 'admin@vuescreencasts.com',
  name: 'Admin User',
  token: 'rcohus!$#21234ch',
  admin: true,
  playedVideoIds: ['2'],
  s3Keys: {
    id: 'tnoheurcheou',
    secret: 'wvjktoenueouwvm'
  }
}]

new Server({
  fixtures: {
    videos,
    tags,
    users
  },
  models: {
    video: Model.extend({
      tags: hasMany()
    }),
    tag: Model.extend({
      videos: hasMany()
    }),
    user: Model,
  },
  serializers: {
    application: BaseSerializer,
    tag: BaseSerializer.extend({
      include: ['videos'],
      normalize(json) {
        return {
          data: {
            type: 'tag',
            attributes: json
          }
        }
      }
    }),
    video: BaseSerializer.extend({
      include: ['tags'],
      normalize(json) {
        return {
          data: {
            type: "video",
            attributes: json
          }
        }
      }
    })
  },
  routes(){
    this.post('https://vue-screencasts-uploads.s3-us-west-2.amazonaws.com', function(schema, request) {
      return new Response(201)
    })

    this.namespace = 'api';
    this.urlPrefix = 'http://localhost:3000'

    this.get('/videos');
    this.post('/videos');
    this.put('/videos/:id');
    this.delete('/videos/:id');

    this.get('/tags');
    this.post('/tags');
    this.put('/tags/:id');
    this.delete('/tags/:id');

    this.post('/video_tags', function(){
      return new Response(201);
    });
    this.post('/video_tags/delete', function(){
      return new Response(200);
    });
    this.post('/video_plays', function(schema, request){
      return new Response(201);
    });

    // Nuxt Auth endpoints
    this.post("/sessions", function(schema, request){
      let json = JSON.parse(request.requestBody)
      let response = schema.users.findBy({email: json.email})
      if(json.password == 'aaaaaaaa') { // your actual backend should test the hashed password in the DB
        return {token: response.attrs.token}
      } else {
        return new Response(401)
      }
    });
    this.post("/users", function(schema, request){
      let json = JSON.parse(request.requestBody)
      let token = Math.random().toString().slice(1)
      json['token'] = token;
      schema.db.users.insert(json)
      return {token}
    });
    this.get('/sessions/user', function(schema, request) {
      let token = request.requestHeaders.Authorization
      let response = schema.users.findBy({token: token})
      return this.serialize(response)
    })
  }
})