package controller

import (
	"database/sql"
	"net/http"

	"github.com/Kdaito/share-po/app/usecase/port"
	"github.com/gorilla/mux"
)

type User struct {
	OutputFactory func(w http.ResponseWriter) port.UserOutputPort
	InputFactory  func(o port.UserOutputPort, r port.UserRepository) port.UserInputPort
	RepoFactory   func(c *sql.DB) port.UserRepository
	Conn          *sql.DB
}

func (u *User) GetUserByUid(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	vars := mux.Vars(r)
	uid := vars["uid"]
	outputPort := u.OutputFactory(w)
	repository := u.RepoFactory(u.Conn)
	inputPort := u.InputFactory(outputPort, repository)
	inputPort.GetUserByUid(ctx, uid)
}
