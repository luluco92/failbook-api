const { Schema, Types } = require('mongoose');

const responseSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatdate
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);



function formatdate(x) {
return `${x.getMonth()+1}/${x.getDate()}/${x.getFullYear()} at ${x.toLocaleTimeString()}`;
}

module.exports = responseSchema;
