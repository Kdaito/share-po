package cmd

import "fmt"

const (
	dbUser     = "root"
	dbPassword = "p@ssw0rd"
	dockerDns  = "db"
	dbPort     = "5432"
	dbName     = "share_po"
)

func GenerateDbSource() string {
	return fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable", dbUser, dbPassword, dockerDns, dbPort, dbName)
}
