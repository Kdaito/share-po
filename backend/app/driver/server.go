package driver

import (
	"fmt"
	"log"
	"net/http"

	"github.com/Kdaito/share-po/app/adapter/controller"
	"github.com/Kdaito/share-po/app/adapter/gateway"
	"github.com/Kdaito/share-po/app/adapter/presenter"
	"github.com/Kdaito/share-po/app/usecase/interactor"
	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
)

type Server struct {
	router *mux.Router
	db     *sqlx.DB
}

func NewServer() *Server {
	return &Server{}
}

func (s *Server) Init(databaseSource string) error {
	s.router = s.Route()
	db, err := sqlx.Connect("postgres", databaseSource)
	if err != nil {
		return fmt.Errorf("failed db init: %s", err)
	}
	s.db = db
	return nil
}

func (s *Server) Run(port int) {
	log.Printf("server is opened in %v port", port)
	http.ListenAndServe(fmt.Sprintf(":%v", port), s.router)
}

func (s *Server) Route() *mux.Router {
	r := mux.NewRouter()

	// user
	user := controller.NewUserController(presenter.NewUserOutputPort, interactor.NewUserInputPort, gateway.NewUserRepository, s.db)

	v1 := r.PathPrefix("/v1").Subrouter()

	v1.HandleFunc("/user", user.CreateUser).Methods(http.MethodPost)

	return r
}
