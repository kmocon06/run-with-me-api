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
