package entity

import "gorm.io/gorm"

type User struct {
	gorm.Model
	FirebaseUID string `gorm:"firebase_uid"`
	Name        string `gorm:"name"`
	Email       string `gorm:"email"`
}
