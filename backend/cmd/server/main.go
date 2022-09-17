package main

import (
	"github.com/Kdaito/share-po/app/driver"
)

func main() {
	s := driver.NewServer()
	s.Init()
	s.Run(1991)
}
