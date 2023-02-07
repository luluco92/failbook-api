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
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

responseSchema.virtual('formatDate')
  // Getter
  .get(function () {
    return `${this.createdAt.getMonth()+1}/${this.createdAt.getDate()}/${this.createdAt.getFullYear()}`;
  });

module.exports = responseSchema;
