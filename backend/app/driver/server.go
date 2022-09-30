package driver

import (
	"context"
	"fmt"
	"log"
	"net/http"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
	"github.com/Kdaito/share-po/app/adapter/controller"
	"github.com/Kdaito/share-po/app/adapter/gateway"
	"github.com/Kdaito/share-po/app/adapter/presenter"
	"github.com/Kdaito/share-po/app/driver/middleware"
	"github.com/Kdaito/share-po/app/usecase/interactor"
	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
	"github.com/rs/cors"
	"google.golang.org/api/option"
)

type Server struct {
	router     *mux.Router
	db         *sqlx.DB
	authClient *auth.Client
}

func NewServer() *Server {
	return &Server{}
}

func (s *Server) Init(databaseSource string) error {
	// firebase接続
	opt := option.WithCredentialsFile("/tmp/service-account.json")
	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		log.Fatalf("error initializing firebase app: %v\n", err)
	}

	client, err := app.Auth(context.Background())
	if err != nil {
		log.Fatalf("error initializing firebase authentication: %v\n", err)
	}
	s.authClient = client
	s.router = s.Route()

	// db接続
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

	// middleware
	authMiddleware := middleware.NewAuth(s.authClient)
	corsMiddleware := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedHeaders: []string{"Authorization", "Accept-Language", "Content-Type", "Content-Language", "Origin"},
		AllowedMethods: []string{
			http.MethodOptions,
			http.MethodHead,
			http.MethodGet,
			http.MethodPost,
			http.MethodPut,
			http.MethodPatch,
			http.MethodDelete,
		},
	})

	r.Use(corsMiddleware.Handler)
	// r.Use(authMiddleware.Handler)

	// user
	user := controller.NewUserController(presenter.NewUserOutputPort, interactor.NewUserInputPort, gateway.NewUserRepository, s.db)

	v1 := r.PathPrefix("/v1").Subrouter()

	authRoute := v1.NewRoute().Subrouter()
	authRoute.Use(authMiddleware.Handler)

	authRoute.HandleFunc("/user", user.CreateUser).Methods(http.MethodPost, http.MethodOptions)

	// commonRoute := v1.NewRoute().Subrouter()

	return r
}
