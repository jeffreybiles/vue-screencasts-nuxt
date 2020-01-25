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

new Server({
  fixtures: {
    videos,
    tags
  },
  models: {
    video: Model.extend({
      tags: hasMany()
    }),
    tag: Model.extend({
      videos: hasMany()
    })
  },
  serializers: {
    application: JSONAPISerializer,
    tag: JSONAPISerializer.extend({
      include: ['videos.tags']
    }),
    video: JSONAPISerializer.extend({
      include: ['tags']
    })
  },
  routes(){
    this.namespace = 'api';
    this.urlPrefix = 'http://localhost:3000'

    this.get('/videos');
    this.get('/videos/:id');
    this.get('/tags/:id');
  }
})