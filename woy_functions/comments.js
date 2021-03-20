'use strict';
const contentful = require('contentful-management');
exports.handler = function(event, context, callback) {
  async function main() {
    // Post ID from get request
    const ID = await event.queryStringParameters.ID;
    // Start with empty array
    let postComments = [];
    // Connect to contentful
    const client = contentful.createClient({
      accessToken: process.env.CONTENTFUL_TOKEN,
    });
    // Get the entry based on post ID.
    await client
      .getSpace(env.process.CONTENTFUL_SPACE_ID)
      .then(space => space.getEnvironment('master'))
      .then(environment => environment.getEntry(ID))
      .then(entry => {
        // If no comments exist
        if (entry.fields.comments === undefined) {
          // Create the JSON needed to store comments
          entry.fields.comments = {
            'en-US': {
              comments: [],
            },
          };
          // Update entry
          return entry.update();
        } else {
          // Grab the comments
          entry.fields.comments['en-US'].comments.forEach(comment => {
            postComments.push(comment);
          });
        }
      })
      .then(() => {
        // Callback with comments to update state
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            comments: postComments,
          }),
        });
      });
  }
  main().catch(console.error);
};
