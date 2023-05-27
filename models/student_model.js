const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    regId: {
      type: Number,
      required: true,
    },
    rollNo: {
      type: Number,
      required: true,
    },
    studentName: {
        type: String,
        required: true,
    },
    fatherName: {
        type: String,
        required: true,
    },
    motherName: {
        type: String,
        required: true,
    },
    dateOfIssue: {
      type: String,
      required: true,
    },
    status: {
        type: String,
        required: true,
    },
    courseName: {
        type: String,
        required: true,
    },
    courseDurationMonths: {
        type: String,
        required: true,
    },
    courseDurationHours: {
        type: Number,
        required: true,
    },
    subjects: [
        {
            subjectName: {
                type: String,
                required: true,
            },
            maximumMarks: {
                type: Number,
                required: true,
            },
            extMarksObtained: {
                type: Number,
                required: true,
            },
            intMarksObtained: {
                type: Number,
                required: true,
            },
        }
    ]

});

const StudentModel = mongoose.model(
    "studentsModel",
    studentSchema
  );

module.exports = StudentModel;