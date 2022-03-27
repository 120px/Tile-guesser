package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"
)

type leaderBoardEntry struct {
	Username string `json:"username"`
	Time     string `json:"time"`
}

func main() {
	mainPage := http.FileServer(http.Dir("./static"))
	http.Handle("/", mainPage)

	http.HandleFunc("/leaderboards", readLeaderBoard)
	http.HandleFunc("/submitWinnerDetails", writeToLeaderboard)

	log.Println("Starting web server on port 1200")
	http.ListenAndServe(":1200", nil)

}

var myClient = &http.Client{Timeout: 10 * time.Second}

func writeToLeaderboard(w http.ResponseWriter, res *http.Request) {
	var result leaderBoardEntry

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
	}

	if err := json.Unmarshal(body, &result); err != nil {

		fmt.Println("Can not unmarshal JSON")
	}

	file, _ := json.MarshalIndent(result, "", "")

	_ = ioutil.WriteFile("test.json", file, 0644)
}

func readLeaderBoard(w http.ResponseWriter, res *http.Request) {
	// fmt.Println("===============")

	// var result leaderBoardEntry

	// jsonFile, err := os.Open("test.json")
	// if err != nil {
	// 	fmt.Println(err)
	// }

	// defer jsonFile.Close()

	// byteValue, _ := ioutil.ReadAll(jsonFile)

	// json.Unmarshal(byteValue, &result)

	// var data leaderBoardEntry
	// for i := 0; i < len(result.Username); i++ {
	// 	data.Username =

	// }

	// body, err := ioutil.ReadAll(res.Body)
	// if err != nil {
	// 	fmt.Println(err)
	// }

	// if err := json.Unmarshal(body, &result); err != nil {

	// 	fmt.Println("Can not unmarshal JSON")
	// }

}
