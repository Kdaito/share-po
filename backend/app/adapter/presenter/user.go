package presenter

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/Kdaito/share-po/app/entity"
	"github.com/Kdaito/share-po/app/usecase/port"
	"github.com/Kdaito/share-po/gen/models"
)

type User struct {
	w http.ResponseWriter
}

func NewUserOutputPort(w http.ResponseWriter) port.UserOutputPort {
	return &User{
		w: w,
	}
}

func (u *User) Render(user *entity.User) {
	result := &models.User{
		ID: 1,
		FirebaseUID: user.FirebaseUID,
		Name: user.Name,
		Email: user.Email,
	}
	// レスポンス用にbyte配列に変える
	res, err := json.Marshal(result)

	if err != nil {
		u.w.WriteHeader(http.StatusInternalServerError)
		u.w.Write([]byte(err.Error()))
		return
	}

	u.w.WriteHeader(http.StatusOK)
	u.w.Write(res)
}

func (u *User) RenderError(error error) {
	u.w.WriteHeader(http.StatusInternalServerError)
	fmt.Fprint(u.w, error)
}
