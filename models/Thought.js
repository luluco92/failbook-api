const { Schema, model } = require('mongoose');
const responseSchema = require('./Response');

// Schema to create Post model
const postSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatdate
    },
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
  reactions: [responseSchema],
//    reactions: [{ type: Schema.Types.ObjectId, ref: 'responseSchema' }],
  },
  {
    toJSON: { // including virtual vars (defined below, and do not let mongo give them id's
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

function formatdate(x) {
return `${x.getMonth()+1}/${x.getDate()}/${x.getFullYear()} at ${x.toLocaleTimeString()}`;
}

// Create a virtual property `responses` that gets the amount of responses per post
// need a getter for date formatting
postSchema.virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

/*postSchema.virtual('formatDate')
  // Getter
  .get(function () {
//    return `${this.createdAt.getMonth()+1}/${this.createdAt.getDate()}/${this.createdAt.getFullYear()}`;
  });
*/

// Initialize our Post model
const Thought = model('post', postSchema);

module.exports = Thought;
