package controller

import (
	"net/http"

	"firebase.google.com/go/auth"
	"github.com/Kdaito/share-po/app/usecase/port"
	"gorm.io/gorm"
)

type UserOutputFactory func(w http.ResponseWriter) port.UserOutputPort
type UserInputFactory func(o port.UserOutputPort, r port.UserRepository, authClient *auth.Client) port.UserInputPort
type UserRepositoryFactory func(c *gorm.DB, authClient *auth.Client) port.UserRepository

type UserController struct {
	outputFactory     UserOutputFactory
	inputFactory      UserInputFactory
	repositoryFactory UserRepositoryFactory
	conn              *gorm.DB
	authClient        *auth.Client
}

func NewUserController(outputFactory UserOutputFactory, inputFactory UserInputFactory, repositoryFactory UserRepositoryFactory, conn *gorm.DB, authClient *auth.Client) *UserController {
	return &UserController{
		outputFactory:     outputFactory,
		inputFactory:      inputFactory,
		repositoryFactory: repositoryFactory,
		conn:              conn,
		authClient:        authClient,
	}
}

func (u *UserController) newInputPort(w http.ResponseWriter) port.UserInputPort {
	outputPort := u.outputFactory(w)
	repository := u.repositoryFactory(u.conn, u.authClient)
	return u.inputFactory(outputPort, repository, u.authClient)
}

func (u *UserController) Get(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	u.newInputPort(w).Get(ctx)
}
