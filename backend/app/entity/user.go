package entity

type User struct {
	ID   int64 `db:"id"`
	FirebaseUID  string `db:"firebase_uid"`
	Name string `db:"name"`
	Email string `db:"email"`
}
