package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/ping", handler)
	http.ListenAndServe(":1991", nil)
	fmt.Print("go start")
}

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "pong")
}