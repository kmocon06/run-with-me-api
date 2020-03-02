# run-with-me-api
SEI Capstone 

Models 

### User 
1. name
	* String 
2. age
	* Number
3. gender
	* String
4. hometown
	* String
5. email
	* String
6. password
	* String
7. createdDate
	* Date


### Race 
1. admin {ref: User}
2. name
	* String
3. distance
	* String
4. location
	* String
5. date
	* String
6. runners 
	* [{ ref: 'User' }]
7. createdDate
	* Date


### Workout (Training Plan)
1. user {ref: User}
2. trainingFor 
	* String
3. weekNumber
	* Number
4. dayOfTheWeek
	* String
5. typeOfWorkout
	* String
6. duration
	* String
7. distance
	* String
8. workoutCompleted
	* Boolean
9. createdDate
	* Date




## Routes


### User
| Method | Path | Action|
|--------|------|-------|
| POST | /auth/login | Login a user into the website |
| POST | /auth/register | Register a new user |
| GET | /auth/logout| Logout user |

### Race
| Method | Path | Action|
|--------|------|-------|
| GET | /races | user should be able to see all of the races that were created and be able to join a race|
|POST | /races/new | user should be able to create a race |
|GET | /races/id | user can see info for one race and everyone who has signed up |
|PUT | /races/id | user is able to update a race by changing the race info |
|DELETE | /races/id | user can delete a race they created |


### Training (workouts)

| Method | Path | Action|
|--------|------|-------|
| GET | /workouts | user should be able to see all of the workouts that were created |
|POST | /workouts | user should be able to create a workout |
|GET | /workouts/id | user can see one workout |
|PUT | /workouts/id | user is able to update a workout |
|DELETE | /workouts/id | user can delete a workout |


Sprint 1
2/21/20 - 2/24/20
Project approval and organized models. Set up server by end of 2/24

Sprint 2
2/25/20 - 2/27/20
Get Authentication for user working
Fix any models
Create and test all routes for CRUDing Races
Create and test all routes for CRUDing Workouts for training plan


Sprint 3
2/28/20 - 3/3/20
Test API to make sure it is fully functional 
Create react app for client side
CRUD the Races
CRUD the Workouts












