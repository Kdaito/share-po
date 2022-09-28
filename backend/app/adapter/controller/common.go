package controller

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

func parseModelFromRequest[T interface{}](r *http.Request, model *T) {
	// リクエストを読み込む
	body, err := io.ReadAll(r.Body)
	if err != nil {
		fmt.Print("read allでエラーでとるわ")
	}
	defer r.Body.Close()

	// リクエストを引数に受け取った構造体にパースする
	err = json.Unmarshal(body, model)
	if err != nil {
		fmt.Print("いやパース失敗しとるがな")
	}
}
