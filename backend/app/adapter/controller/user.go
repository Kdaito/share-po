package controller

import (
	"net/http"

	"firebase.google.com/go/auth"
	"github.com/Kdaito/share-po/app/entity"
	"github.com/Kdaito/share-po/app/usecase/port"
	"github.com/Kdaito/share-po/gen/models"
	"gorm.io/gorm"
)

type OutputFactory func(w http.ResponseWriter) port.UserOutputPort
type InputFactory func(o port.UserOutputPort, r port.UserRepository, authClient *auth.Client) port.UserInputPort
type RepositoryFactory func(c *gorm.DB, authClient *auth.Client) port.UserRepository

type UserController struct {
	outputFactory     OutputFactory
	inputFactory      InputFactory
	repositoryFactory RepositoryFactory
	conn              *gorm.DB
	authClient            *auth.Client
}

func NewUserController(outputFactory OutputFactory, inputFactory InputFactory, repositoryFactory RepositoryFactory, conn *gorm.DB, authClient *auth.Client) *UserController {
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

func (u *UserController) CreateUser(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	var req models.UserRequest
	parseModelFromRequest(r, &req)
	newUser := &entity.User{
		FirebaseUID: req.FirebaseUID,
		Name:        req.Name,
		Email:       req.Email,
	}
	u.newInputPort(w).CreateUser(ctx, newUser)
}

func (u *UserController) GetUser(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	u.newInputPort(w).GetUser(ctx)
}
