package main

import (
	"log"
	"net/http"
)

func main() {
	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/", fs)

	log.Println("Starting web server on port 8080")
	http.ListenAndServe(":8080", nil)
}
