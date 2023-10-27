var express = require('express');
const StudentModel = require('../models/student_model');
var router = express.Router();

/* GET users listing. */
router.get('/demo', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/result/:regId', async function(req, res) {
    let regId = req.params.regId;
    let rollNo = req.query.rollNo;
    console.log(regId)
    console.log(rollNo)
    let result = await getStudentDetails(rollNo, regId, res);
    return result;
});

router.post('/record/create', async function(req, res) {
    console.log(`Request received $req.body`);
    console.log(req.body);
    let result = await createStudentRecords(req.body, res);
    return result;
});

createStudentRecords = async (studentDetails, res) =>  {
    if (studentDetails.rollNo == undefined || studentDetails.regId == undefined) {
      return res.status(400).send("Provide rollNo and regId for the student");
    }
    console.log("Received request to create student records", JSON.stringify(studentDetails));
    StudentModel.find({ rollNo: studentDetails.rollNo, regId: studentDetails.regId })
    .then((result) => {
        if (result.length != 0) {
          return res.status(200).send("Student already exists");
        } else {
          console.log("Student not found in database creating one.");
          try {
            const student = new StudentModel(studentDetails);
            student.save().then((stu_result) => {
                let id = stu_result.get("_id");
                return res.status(200).send(stu_result)
            })
            .catch((error) => {
              console.log("Error occurred");
              console.log(error);
                return res.status(500).json(error);
            })
          } catch(err) {
            console.log("Excpetion occurred while saving data");
            return res.status(500).send(err);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send("Failed to created student");
      });
}

getStudentDetails = async (rollNo, regId, res) =>  {
    StudentModel.find({ rollNo: rollNo, regId: regId })
    .then((result) => {
        if (result.length != 0) {
          return res.status(200).json(result[0]);
        } else {
          return res.status(400).send("Student Not found");
        }
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
}

module.exports = router;
