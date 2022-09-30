package main

import (
	"github.com/Kdaito/share-po/app/driver"
	"github.com/Kdaito/share-po/cmd"
)

func main() {
	dbSource := cmd.GenerateDbSource()
	s := driver.NewServer()
	s.Init(dbSource)
	s.Run(1991)
}
