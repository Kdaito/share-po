package main

import (
	"fmt"

	"github.com/Kdaito/share-po/app/driver"
)

func main() {
	dbUser := "root"
	dbPassword := "p@ssw0rd"
	dockerDns := "db"
	dbPort := "5432"
	dbName := "share_po"
	dbSource := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable", dbUser, dbPassword, dockerDns, dbPort, dbName)
	s := driver.NewServer()
	s.Init(dbSource)
	s.Run(1991)
}
