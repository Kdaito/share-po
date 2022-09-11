package main

import (
	"fmt"
	"net/http"
	"github.com/Kdaito/share-po/app/interface/api"
)

func main() {
	s := api.NewServer()
	s.Init()
	s.Run(1991)
}

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "pong")
}