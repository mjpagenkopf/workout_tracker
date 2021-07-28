const API = {
  async getLastWorkout() {
    let res;
    try { //get workouts
      res = await fetch("/api/workouts");
    } catch (err) {
      console.log(err)
    }
    const json = await res.json();
    return json[json.length - 1];
  },

  async addExercise(data) {
    const id = location.search.split("=")[1];

    const res = await fetch(`/api/workouts/` + id, {
      method: "PUT", //update workouts
      headers: { 
        "Content-Type": "application/json"
       },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    return json;
  },

  async createWorkout(data = {}) {
    const res = await fetch("/api/workouts", {
      method: "POST", //create new
      body: JSON.stringify(data),
      headers: { 
        "Content-Type": "application/json"
       }
    });
    const json = await res.json();
    return json;
  },

  async getWorkoutsInRange() { //last 7 workouts
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();
    return json;
  },
};
