# run-with-me-api
SEI Capstone 

Models 

#User 
name
	-String 
age
	-Number
gender
	-String
hometown
	-String
email
	-String
password
	-String
createdDate
	-Date


#Race 
admin {ref: User}
name
	-String
distance
	-Number
location
	-String
date
	-String
runners 
	-Array of Users []
createdDate
	-Date


#Workout (Training Plan)
user {ref: User}
trainingFor 
	-String
weekNumber
	-Number
dayOfTheWeek
	-String
typeOfWorkout
	-String
duration
	-String
distance
	-Number
workoutCompleted
	-Boolean
createdDate
	-Date




## Routes


#User
| Method | Path | Action|
|--------|------|-------|
| POST | /auth/login | Login a user into the website |
| POST | /auth/register | Register a new user |
| GET | /auth/logout| Logout user |

#Race
| Method | Path | Action|
|--------|------|-------|
| GET | /races | user should be able to see all of the races that were created and be able to join a race|
|POST | /races | user should be able to create a race |
|GET | /races/id | user can see info for one race and everyone who has signed up |
|PUT | /races/id | user is able to update a race by changing the race info |
|DELETE | /races/id | user can delete a race they created |


#Training (workouts)

| Method | Path | Action|
|--------|------|-------|
| GET | /workouts | user should be able to see all of the workouts that were created |
|POST | /workouts | user should be able to create a workout |
|GET | /workouts/id | user can see one workout |
|PUT | /workouts/id | user is able to update a workout |
|DELETE | /workouts/id | user can delete a workout |








