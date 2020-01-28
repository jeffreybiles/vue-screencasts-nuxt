import { Server, Model, JSONAPISerializer, hasMany } from 'miragejs';

let videos = [
  {
    id: 1,
    name: "ES2015 Arrow Functions",
    description: `<p>ES2015 (aka ES6) has some great ways to make your code easier to write and understand. In this episode, we cover two different ways that you can make your code clearer by removing the 'function' keyword.</p>`,
    thumbnail: "https://vue-screencasts.s3.us-east-2.amazonaws.com/images/video-thumbnails/Thumbnail+-+Arrow+Function.png",
    videoUrl: "https://vue-screencasts.s3.us-east-2.amazonaws.com/video-files/38-+es2015-+functions+minus+'function'.mp4",
    tagIds: ['1', '2'],
  },
  {
    id: 2,
    name: "ES2015 Template Strings",
    description: `<p>Template strings are an incredibly useful new feature in ES2015... and you can use them in your Ember apps today!</p>
                  <p>Here are 3 cool things that template strings enable.</p>`,
    thumbnail: "https://vue-screencasts.s3.us-east-2.amazonaws.com/images/video-thumbnails/Thumbnail+-+Template+Strings.png",
    videoUrl: "https://vue-screencasts.s3.us-east-2.amazonaws.com/video-files/42-+ES2015+template+strings.mp4",
    tagIds: ['1'],
  }
];

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
  token: '24%(&!$#tocuh'
}, {
  id: '2',
  email: 'admin@vuescreencasts.com',
  name: 'Admin User',
  token: 'rcohus!$#21234ch'
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
    application: JSONAPISerializer,
    tag: JSONAPISerializer.extend({
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
    video: JSONAPISerializer.extend({
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
    this.namespace = 'api';
    this.urlPrefix = 'http://localhost:3000'

    this.get('/videos');
    this.post('/videos');
    this.put('/videos/:id');
    this.delete('/videos/:id');

    this.get('/tags');
    this.post('/tags');
    this.put('/tags/:id');
    this.delete('/videos/:id');

    this.post('/video_tags', function(){
      return new Response(201);
    });
    this.post('/video_tags/delete', function(){
      return new Response(200);
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