// importing express module
const express = require('express');

// setting up the router
const router = express.Router();

// importing CSV schema
const CSV = require('../models/CSVData');

// home page
router.get('/', (req, res) => {
  CSV.find({}, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      res.render('home', { files });
    }
  })
});

// add new csv file
router.post('/add-csv', (req, res) => {
  if (req.files) {
    const file = req.files.file;
    const fileName = file.name;

    if (file.mimetype === 'text/csv') {
      const fileData = file.data;

      const newCsv = new CSV({
        fileName,
        fileData
      });
      newCsv.save().then(() => {
        console.log("file uploaded");
      }).catch(err => {
        console.log(err);
      })

    } else {
      console.log("Please select a csv file");
    }

    res.redirect('/');
  }
});

// delete a csv file
router.get('/delete', (req, res) => {
  let id = req.query.id;
  CSV.deleteMany({
    _id: {
      $in: [
        id
      ]
    }
  }, (err) => {
    if (err) {
      console.log("Error in deleting record(s)!");
    }
    else {
      return res.redirect('back');
    }
  })
})

// opening a csv file
router.get('/filedata', (req, res) => {
  let id = req.query.id;
  CSV.findById(id, (err, csvdata) => {
    if (err) {
      console.log(err);
    } else {
      const dataArray = csvdata.fileData.toString().split("\r\n");

      const headers = dataArray[0].split(",");

      let data = [], results = [];

      if (dataArray.length > 2) {
        for (let i = 1; i < dataArray.length; i++) {
          const element = dataArray[i].split(',');
          data.push(element);
        }
      }

      for (let i = 0; i < data.length; i++) {
        let temp = {};

        for (let j = 0; j < headers.length; j++) {
          temp[headers[j]] = data[i][j];
        }
        results.push(temp);
      }

      res.render("file", {
        title: csvdata.fileName,
        head: headers,
        data: results,
        length: results.length
      });
    }
  })
})

module.exports = router;