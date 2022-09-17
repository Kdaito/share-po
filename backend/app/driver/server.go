package driver

import (
	"fmt"
	"log"
	"net/http"

	// "github.com/Kdaito/share-po/app/adapter/controller"
	// "github.com/Kdaito/share-po/app/adapter/gateway"
	// "github.com/Kdaito/share-po/app/adapter/presenter"
	// "github.com/Kdaito/share-po/app/usecase/interactor"
	"github.com/gorilla/mux"
)

type Server struct {
	router *mux.Router
}

func NewServer() *Server {
	return &Server{}
}

func (s *Server) Init() {
	s.router = s.Route()
}

func (s *Server) Run(port int) {
	log.Printf("server is opened in %v port", port)
	http.ListenAndServe(fmt.Sprintf(":%v", port), s.router)
}

func (s *Server) Route() *mux.Router {
	r := mux.NewRouter()

	// user
	// user := controller.User{
	// 	OutputFactory: presenter.NewUserOutputPort,
	// 	InputFactory: interactor.NewUserInputPort,
	// 	RepoFactory: gateway.NewUserRepository,
	// 	conn: conn,
	// }


	r.Methods(http.MethodGet).Path("/ping").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte("pong"))
	})
	// s := r.PathPrefix("/v1").Subrouter()

	return r
}