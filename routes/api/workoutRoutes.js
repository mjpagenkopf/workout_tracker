const router = require('express').Router();
const Workout = require('../../models/workout')//if there were more than 1 model in models folder, would need an index.js to streamline connections
//After tutor help: 1 of 3 to complete: fill in these workout routes

router.get('/', (req, res) => {
    Workout.aggregate([{
        $addFields: {
            totalDuration: {
                $sum: "$exercises.duration"
            }
        }
    }])
    .sort({ _id: -1 })
    .then(workoutData => {
        res.json(workoutData)
    })
    .catch(err => {
        res.json(err);
    });
});

router.put('/:id', (req, res) => {
    Workout.findByIdAndUpdate(req.params.id), {
        $push: {
            exercises: req.body
        }
    }
    .then(workoutData => {
        res.json(workoutData)
    })
    .catch(err => {
        res.json(err);
    })
})

// router.put('/:id', (req, res) => {
//     Workout.Update(
//         { _id: mongojs.ObjectId(req.id) },
//         { $set: {
//             exercise: req.body
//         },
//     })
// })

//CREATING NEW WORKOUT
router.post('/', (req, res) => {
    Workout.create(req.body)  
})

router.get('/range', (req, res) => {
    Workout.aggregate([{
        $addFields: { //adding another key:value pair in the WorkoutSchema model (only when you get it back from the database)
            totalDuration: {
                $sum: "$exercises.duration"//returns sum of each duration value in the exercises array
            }
        }
    }])
    .sort({ _id: -1 })//_id is a mongo created id that represents each item stored in the database. 1 or -1 means it displays in ascending or descending order
    .limit(7).then(workoutData => {
        res.json(workoutData)
    })
    .catch(err => {
        res.json(err);
    });
});



module.exports = router;




//insertOne()
//createIndex()
//UUID - Unique Identifiers - to get UUID of Collection, run listCollections or getCollectionInfo() method
//MongoDB view is a queryable object defined by an aggregation pipeline

//create or define a view:
// db.createCollection(
//     "<viewName>",
//     {
//       "viewOn" : "<source>",
//       "pipeline" : [<pipeline>],
//       "collation" : { <collation> }
//     }
//   )

//Use the db.createView() method:
// db.createView(
//     "<viewName>",
//     "<source>",
//     [<pipeline>],
//     {
//       "collation" : { <collation> }
//     }
//   )