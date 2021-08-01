const router = require('express').Router();
const db = require('../../models');

//After tutor help: 1 of 3 to complete: fill in these 

//get workouts
router.get('/', async (req, res) => { 
    try {
    const workoutData = await db.Workout.aggregate([{
        $addFields: {
            totalDuration: {
                $sum: "$exercises.duration"
            }
        }
    }])
    const lastWorkout = workoutData[workoutData.length - 1];
    res.send(lastWorkout)
    } catch(err) {
        res.status(501).json(err);
    }
});


router.put('/:id', async (req, res) => {
  try {
    const workoutData = await db.Workout.updateOne({
    _id: req.params.id}, 
        { 
            $push: { exercises: req.body }   
        },
        {
            new: true, 
            runValidators: true
        }
    )
    return res.json(workoutData);
    } catch (err) {
        res.status(506).json(err);
    }
});

//CREATING NEW WORKOUT
router.post('/', async (req, res) => {
  try {
    const newWorkout = new db.Workout(req.body);
    const createdWorkout = await db.Workout.create(
        newWorkout)
        res.json(createdWorkout);
    } catch (err) {
        res.status(503).json(err);
    };
});

router.get('/range', async (req, res) => {
    const FullWorkoutData = await db.Workout.aggregate([{
        $addFields: { //adding another key:value pair in the WorkoutSchema model (only when you get it back from the database)
            totalDuration: {
                $sum: "$exercises.duration"//returns sum of each duration value in the exercises array
            }
        }
    }])   
    const week = FullWorkoutData.slice(-7);
    res.json(week);
});

module.exports = router;



// .sort({ _id: -1 })//_id is a mongo created id that represents each item stored in the database. 1 or -1 means it displays in ascending or descending order
//     .limit(7)

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