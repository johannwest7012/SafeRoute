

const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();


async function getPolygonsByCodes(codes) { 

  

  for (const i=0; i < codes.length; i++){
    const url = `https://restcountries.com/v3.1/alpha?codes=${codes[i]}`;
    console.log("REST COUTNRIES URL:", url);



  }


  for (var i = 0; i < tableData.length; i++) { 
    const row = tableData[i];

    const name =  encodeURIComponent(row[0]);
    const url = `https://restcountries.com/v3.1/name/${name}?fullText=false`;
    await axios.get(url)
    .then(response => {
      // Process the returned data
      //console.log("PROCESSING RESPONSE: ", row[0])
      const cca2 = response.data[0].cca2;
      const cca3 = response.data[0].cca3;
      // console.log("cca2",cca2);
      // console.log("cca3",cca3);
      countries[row[0]] = {
        "CCA2" : cca2,
        "CCA3" : cca3, 
        "overallRating" : row[1],
        "safetyRating" : row[2], 
        "acceptanceRating" : row[3]
      };

    })
    .catch(error => {
      // Handle any errors
      if (error.response && error.response.status === 404) {
        console.log("ERROR COUNTRY NAME:", row[0]);
        console.log("ERROR: 404 Not Found");
      }
      else {
        console.log("ERROR COUNTRY NAME:", row[0]);
        console.error('Error:', error);
      }
    });
  }
}







const express = require('express');
const router = express.Router();
const { getDb } = require('../db');
const { ObjectId } = require('mongodb');


router.post('/initcountries', async (req, res) => {

  try {
    //console.log("Req.body: ", req.body);
    console.log("Running /countries")

    const db = await getDb();
    const collection = db.collection('country');

    //console.log("here");
    // const objectId = new ObjectId('648ef18c331c6022f7c5b448');
    // collection.findOne({ _id: objectId })
    //   .then(result => {
    //     // Handle the query result
    //     console.log(result);
    //   })
    //   .catch(error => {
    //     // Handle any errors
    //     console.error('Error querying the collection:', error);
    //   });
   


    const country = {
      overallRating,
    };




    const countries = await getAllCountries();
    //console.log("countries:", countries);

    const poly1 = db.collection('polygonGeoJson1');
    const poly2 = db.collection('polygonGeoJson2');


    //console.log("here");
    const objectId1 = new ObjectId('648ed37c9c68f4b578e73cdb');
    const objectId2 = new ObjectId('648ed3cbd7212e9ed2bab4cf');

    var result1 = {};
    var result2 = {};

    await poly1.findOne({ _id: objectId1 })
      .then(result => {
        // Handle the query result
        //console.log("Poly1: ", result);
        result1 = result;
      })
      .catch(error => {
        // Handle any errors
        console.error('Error querying the collection:', error);
      });

      await poly2.findOne({ _id: objectId2 })
      .then(result => {
        // Handle the query result
        //console.log("Poly2: ", result);
        result2 = result;
      })
      .catch(error => {
        // Handle any errors
        console.error('Error querying the collection:', error);
      });
    
  
    //var Object = {}; 
    for (const i in result1.features) { 
      //console.log(i);
      // loop though
      // check the ISO_A3 code 
      try {
       
        const code = result1.features[i].properties["ISO_A3"];
        // access dictionary with code
        const entry = countries[code]; 
        result1.features[i].properties.name = entry["name"];
        result1.features[i].properties.CCA2 = entry["CCA2"];
        result1.features[i].properties.overallRating = entry["overallRating"];
        result1.features[i].properties.safetyRating = entry["safetyRating"];

      }
      catch (error) { 
        console.log("Error in poly1", error);
      }



      // get and add rest of the fields 

    }
    poly1.updateOne({ _id: objectId1 }, { $set: result1 });

    for (const i in result2.features) { 
      //console.log(i);
      // loop though
      // check the ISO_A3 code 
      const code = result2.features[i].properties["ISO_A3"];
      // access dictionary with code
      try {
      const entry = countries[code]; 
      result2.features[i].properties.name = entry["name"];
      result2.features[i].properties.CCA2 = entry["CCA2"];
      result2.features[i].properties.overallRating = entry["overallRating"];
      result2.features[i].properties.safetyRating = entry["safetyRating"];

      }
      catch (error) { 
        console.log("Error in poly2", error);
      }

   
    }
    poly2.updateOne({ _id: objectId2 }, { $set: result2 });


    res.status(200);

  } catch (error) {
    console.error('Error creating country:', error);
    res.status(500).json({ error: 'Failed to create country' });
  }
});




router.get('/:id', async (req, res) => {
  try {
    console.log("Parameter id:", req.params.id);


    const db = await getDb();


   



    //console.log("countries:", countries);
    var poly1 = db.collection('polygonGeoJson1');
    var poly2 = db.collection('polygonGeoJson2');


    var objectId1 = new ObjectId('648ed37c9c68f4b578e73cdb');
    var objectId2 = new ObjectId('648ed3cbd7212e9ed2bab4cf');

    var result1 = {}; 
    var result2 = {}; 

    await poly1.findOne({ _id: objectId1 })
      .then(result => {
        // Handle the query result
        console.log("Poly1: ", result);
        result1 = result;
      })
      .catch(error => {
        // Handle any errors
        console.error('Error querying the collection:', error);
      });

    await poly2.findOne({ _id: objectId2 })
    .then(result => {
      // Handle the query result
      console.log("Poly2: ", result);
      result2 = result;
    })
    .catch(error => {
      // Handle any errors
      console.error('Error querying the collection:', error);
    });
    

    var found = false; 

    for (const i in result1.features) { 
      try {
        const code = result1.features[i].properties["CCA2"];
        // access dictionary with code
        if (code == req.params.id){ 
          // found 
          found = true; 
          console.log("FOUND, returning...");
          return res.status(200).json(result1.features[i]);
           
        }
        else {
          console.log("id code:", req.params.id )
          console.log("Not match:", code)
        }
   
        }
        catch (error) { 
          console.log("Error in poly1", error);
        }
    }
    for (const i in result2.features) { 
      try {
        const code = result2.features[i].properties["CCA2"];
        // access dictionary with code
        if (code == req.params.id){ 
          // found 
          found = true; 
          console.log("FOUND, returning...");

          return res.status(200).json(result2.features[i]);
        }
        else {
          console.log("id code:", req.params.id )
          console.log("Not match:", code)
        }
   
        }
        catch (error) { 
          console.log("Error in poly2", error);
        }
    }
    
    
    console.log("FOUND, returning...");

    return res.status(200).json(result1.features[2]);

  } catch (error) {
    console.error('Error in looking up country :', error);
    return res.status(500);
  }
});



router.get('/inithri', async (req,res) => {
  const db = await getDb();
  const collection = db.collection('hri_country');

  const fs = require('fs');

  const jsonData = fs.readFileSync('hri.json', 'utf8');
  const data = JSON.parse(jsonData);
  

  collection.insertMany(data, function (err, result) {
    if (err) {
      console.error('Error inserting data:', err);
      return;
    }

    console.log('Data uploaded successfully.');
    client.close();
  });


  console.log("Parameter id:", req.params.id);
  console.log("Ending test...")
  return res.status(200).json({"this is the": "end"});



})

router.get('/hri/:name', async (req,res) => {
  console.log('starting hri retrival');
  const db = await getDb();
  const hricollection = db.collection('hri_country');

  const countryName = req.params.name;
  console.log("countryName:", countryName);
  var result1 = {};
  await hricollection.findOne({ Country: countryName })
  .then(result => {
    // Handle the query result
    console.log("Result: ", result);
    result1 = result;
  })
  .catch(error => {
    // Handle any errors
    console.error('Error querying the collection:', error);
    return res.status(500);
  });
  
  
  return res.status(200).json(result1);


})


module.exports = router;