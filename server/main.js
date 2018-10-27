//Load library
const express = require("express");
var admin = require("firebase-admin");
const bodyParser = require("body-parser");
var cors = require('cors')


//Create constant
const API_URI = "/api";

//Create an instance of Express application
const app = express();

//Connect to Firebase
const credFile = process.env.SERVICEACC_CRED_FILE || "./waterfall.json";
var serviceAccount = require(credFile);
//console.log(credFile);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://trackeat-e0ddc.firebaseio.com"
});
//console.log(admin);

//Access database collections
var db = admin.firestore();
var stallCollection = db.collection('stalls');

//Create routes
app.use(cors())
//Parse JSON and urlencoded payload
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: "50mb"}));

app.get(API_URI + '/stalls', (req, res) => {
    console.info('query >>>>>', req.query)
    console.info('area >>>>>', req.query.area)
    console.info('cuisine >>>>>', req.query.cuisine)
    console.info(!req.query.area.trim() && !req.query.cuisine.trim())
    console.info(!req.query.cuisine.trim())
    
    if(!req.query.area.trim() && !req.query.cuisine.trim()){
      stallCollection.get()  
      .then(snapshot => {
        let stallArr = [];
        snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        stallArr.push(doc.data()); 
        });
        res.status(200).json(stallArr);
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
    } else if (!req.query.cuisine.trim()) {
        let area = req.query.area;
        stallCollection
        .where('area', '==', area)
        .get()
        .then(snapshot => {
            let stallArr = [];
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
                stallArr.push(doc.data()); 
            });
            res.status(200).json(stallArr);
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });   
    } else if (!req.query.area.trim()) {
        let cuisine = req.query.cuisine;
        stallCollection
        .where('cuisine', '==', cuisine)
        .get()
        .then(snapshot => {
            let stallArr = [];
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
                stallArr.push(doc.data()); 
            });
            res.status(200).json(stallArr);
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
    }
    else {
        let area = req.query.area;
        let cuisine = req.query.cuisine;
        stallCollection
        .where('area', '==', area)
        .where('cuisine', '==', cuisine)
        .get()
        .then(snapshot => {
            let stallArr = [];
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
                stallArr.push(doc.data()); 
            });
            res.status(200).json(stallArr);
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
    }
})


// //List out stalls
// //stall Arr
// app.get(API_URI + '/stalls', (req,res) =>{
//     stallCollection
//     .get()
//     .then(snapshot => {
//         let stallArr = [];
//         snapshot.forEach(doc => {
//             console.log(doc.id, '=>', doc.data());
//             stallArr.push(doc.data()); 
//         });
//         res.status(200).json(stallArr);
//     })
//     .catch(err => {
//         console.log('Error getting documents', err);
//     });
// });

//List out menu in specific stall
//stallCombined, stallName, foods
app.get(API_URI + '/menu', (req,res) =>{
    let idValue = req.query.id;
    stallCollection.doc(idValue).get()
    .then(result => {
            console.log(result.data());
            let stallCombined = {
                stallName: result.data(),
                foods : []
            }
            stallCollection.doc(idValue).collection("menu").get()
            .then(snapshot => {
                console.log(snapshot);
                snapshot.forEach(doc => {
                    console.log(doc.id, '=>', doc.data());
                    stallCombined.foods.push(doc.data());
                });
                console.log(stallCombined.foods);
                res.status(200).json(stallCombined);
            })
            .catch(err => {
                console.log('Error getting food menu', err);
            });
    })
    .catch(err => {
        console.log('Error getting stall', err);
    });
})

//Submit stall
//stallInfo
app.post(API_URI + '/add-stall', (req, res)=>{
    let stallInfo = req.body;
    stallInfo = { ...req.body };
    console.log(stallInfo)
    stallCollection
        .add(stallInfo)
        .then(res.status(200).json({time: new Date()})) // !!!!! res.status return wrong data. Fix it !!!!!
        .catch(error => res.status(500).json(error));
});


//Start the server
const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000;
app.listen(PORT, () => {
    console.info(`Application started on port ${PORT} at ${new Date()}`);
});