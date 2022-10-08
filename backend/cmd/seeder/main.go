package main

import (
	"log"

	"github.com/Kdaito/share-po/cmd"
	"github.com/Kdaito/share-po/cmd/seeder/seeds"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	dbSource := cmd.GenerateDbSource()
	
	_, err := gorm.Open(postgres.Open(dbSource), &gorm.Config{})
	if err != nil {
		log.Printf("failed db init for seeder: %s", err)
	}

	// for _, seed := range seeds.PortfolioStatus() {
	// 	if err := seed.Run(db); err != nil {
	// 		log.Fatalf("Running seed '%s', failed with error: %s", seed.Name, err)
	// 	}
	// }
}