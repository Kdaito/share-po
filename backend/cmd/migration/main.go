package main

import (
	"log"

	"github.com/Kdaito/share-po/app/entity"
	"github.com/Kdaito/share-po/cmd"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	dbSource := cmd.GenerateDbSource()
	
	db, err := gorm.Open(postgres.Open(dbSource), &gorm.Config{})
	if err != nil {
		log.Printf("failed db init for migration: %s", err)
	}
	db.AutoMigrate(&entity.User{}, &entity.PortfolioTag{}, &entity.PortfolioStatus{})
}