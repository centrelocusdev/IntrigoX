const { date } = require('joi')
const mongoose = require('mongoose')
const { BadRequestError, UnauthenticatedError } = require('../middleware/error-handler');

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please Provide your Task Title'],
      minLength: [2, 'Title can not be less than 2 characters'],
      maxLength: [100, 'Title can not be  more than 100 characters'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please Provide the description'],
      minLength: [2, 'Description can not be less than 2 characters'],
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ['inProgress', 'completed'],
        mesaage:
          '{VALUE} is not supported, Please Input "inProgress" or "completed" ', //change Value to VALUE
      },
      default: 'inProgress',
    },
    dueDate: {
      type: Date,
      required: [true, 'Please Provide dueDate in YYYY/MM/DD format'],
      match: [/^\d{4}\/\d{2}\/\d{2}$/,
        'Please Provide dueDate in YYYY/MM/DD format',
      ],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please Provide user'],
    },
  },
  { timestamps: true }
)



module.exports = mongoose.model('Task', TaskSchema)
