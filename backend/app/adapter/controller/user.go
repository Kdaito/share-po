package controller

import (
	"net/http"

	"github.com/Kdaito/share-po/app/entity"
	"github.com/Kdaito/share-po/app/usecase/port"
	"github.com/Kdaito/share-po/gen/models"
	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

type OutputFactory func(w http.ResponseWriter) port.UserOutputPort
type InputFactory func(o port.UserOutputPort, r port.UserRepository) port.UserInputPort
type RepositoryFactory func(c *gorm.DB) port.UserRepository

type UserController struct {
	outputFactory     OutputFactory
	inputFactory      InputFactory
	repositoryFactory RepositoryFactory
	conn              *gorm.DB
}

func NewUserController(outputFactory OutputFactory, inputFactory InputFactory, repositoryFactory RepositoryFactory, conn *gorm.DB) *UserController {
	return &UserController{
		outputFactory:     outputFactory,
		inputFactory:      inputFactory,
		repositoryFactory: repositoryFactory,
		conn:              conn,
	}
}

func (u *UserController) newInputPort(w http.ResponseWriter) port.UserInputPort {
	outputPort := u.outputFactory(w)
	repository := u.repositoryFactory(u.conn)
	return u.inputFactory(outputPort, repository)
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

func (u *UserController) GetUserByUid(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	vars := mux.Vars(r)
	uid := vars["firebaseUid"]
	u.newInputPort(w).GetUserByUid(ctx, uid)
}
