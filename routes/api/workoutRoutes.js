const router = require('express').Router();
const Workout = require('../../models/workout');

//After tutor help: 1 of 3 to complete: fill in these 

//get workouts
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
    .catch (err => {
        res.status(403).json(err);
    });
});


router.put('/:_id', async ({body, params}, res) => {
    Workout.findByIdAndUpdate(
    params.id, 
        { 
            $push: { exercises: body }   
        },
        {
            new: true, 
            runValidators: true
        }
    )
    .then(workoutData => {
        res.json(workoutData);
    })
    .catch(err => {
        res.status(402).json(err);
    });
});

//CREATING NEW WORKOUT
router.post('/', (req, res) => {
    Workout.create({})
    .then(workoutData => {
        res.json(workoutData)
    })
    .catch (err => {
        res.status(404).json(err);
    });
});

router.get('/range', (req, res) => {
    Workout.aggregate([{
        $addFields: { //adding another key:value pair in the WorkoutSchema model (only when you get it back from the database)
            totalDuration: {
                $sum: "$exercises.duration"//returns sum of each duration value in the exercises array
            }
        }
    }])
    .sort({ _id: -1 })//_id is a mongo created id that represents each item stored in the database. 1 or -1 means it displays in ascending or descending order
    .limit(7)
    .then(workoutData => {
        res.json(workoutData)
    })
    .catch (err => {
        res.status(405).json(err);
    });
});


module.exports = router;


// .sort({ _id: -1 })//_id is a mongo created id that represents each item stored in the database. 1 or -1 means it displays in ascending or descending order
//     .limit(7).then(workoutData => {
//         res.json(workoutData)
//     })
//     } catch(err) {
//         res.status(405).json(err);
//     };

//if there were more than 1 model in models folder, would need an index.js to streamline connections

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