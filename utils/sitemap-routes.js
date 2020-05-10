// import axios from 'axios'
const axios = require('axios')

let sitemapRoutes = async function(baseUrl) {
  let { data } = await axios.get(`${baseUrl}/videos`)
  let videos = data.data

  let { data: courseData } = await axios.get(`${baseUrl}/courses`);
  let courses = courseData.data;

  let watchPages = videos.map(v => {
    let course;
    try {
      let courseId = v.relationships.course.data.id;
      course = courses.find(c => c.id == courseId);
    } catch {
      course = {attributes: {image_url: ''}}
    }

    if(!course.attributes.image_url && course.relationships.parent) {
      try {
        let courseId = course.relationships.parent.data.id;
        course = courses.find(c => c.id == courseId);
      } catch {
        course = {attributes: {image_url: ''}}
      }
    }

    return {
      url: `/watch/${v.slug}`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: v.attributes.updated_at,
      video: [{
        title: v.attributes.name,
        thumbnail_loc: v.attributes.thumbnail || course.attributes.image_url || '',
        description: v.attributes.description || '',
        family_friendly: 'YES',
        requires_subscription: v.attributes.pro ? 'YES' : 'NO',
        duration: v.attributes.duration.toString()
      }]
    }
  })

  let mostRecentUpdate = videos.map(v => v.attributes.updated_at).sort((v1, v2) => v1 < v2 ? 1 : -1)[0]

  return [{
    url: '/videos',
    changefreq: 'daily',
    priority: 1,
    lastmod: mostRecentUpdate
  }, {
    url: '/courses',
    changefreq: 'daily',
    priority: 1,
    lastmod: mostRecentUpdate
  }, {
    url: '/',
    changefreq: 'weekly',
    priority: 1,
  },
    ...watchPages
  ]
}

module.exports = sitemapRoutes
