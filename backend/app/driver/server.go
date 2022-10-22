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
	"github.com/rs/cors"
	"google.golang.org/api/option"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Server struct {
	router     *mux.Router
	db         *gorm.DB
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

	// db接続
	db, err := gorm.Open(postgres.Open(databaseSource), &gorm.Config{})
	if err != nil {
		return fmt.Errorf("failed db init: %s", err)
	}
	s.db = db

	s.router = s.Route()
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
	user := controller.NewUserController(presenter.NewUserOutputPort, interactor.NewUserInputPort, gateway.NewUserRepository, s.db, s.authClient)

	// portfolio
	portfolio := controller.NewPortfolioController(presenter.NewPortfolioOutputPort, interactor.NewPortfolioInputPort, gateway.NewPortfolioRepository, s.db)

	// portfolio tag
	portfolioTag := controller.NewPortfolioTagController(presenter.NewPortfolioTagOutputPort, interactor.NewPortfolioTagInputPort, gateway.NewPortfolioTagRepository, s.db)

	// portfolio status
	portfolioStatus := controller.NewPortfolioStatusController(presenter.NewPortfolioStatusOutputPort, interactor.NewPortfolioStatusInputPort, gateway.NewPortfolioStatusRepository, s.db)

	v1 := r.PathPrefix("/v1").Subrouter()

	commonRoute := v1.NewRoute().Subrouter()
	authRoute := v1.NewRoute().Subrouter()
	authRoute.Use(authMiddleware.Handler)

	authRoute.HandleFunc("/user", user.Get).Methods(http.MethodGet, http.MethodOptions)
	authRoute.HandleFunc("/portfolio", portfolio.Create).Methods(http.MethodPost, http.MethodOptions)
	authRoute.HandleFunc("/portfolio", portfolio.Index).Methods(http.MethodGet, http.MethodOptions)
	commonRoute.HandleFunc("/portfolio-tags", portfolioTag.Index).Methods(http.MethodGet, http.MethodOptions)
	commonRoute.HandleFunc("/portfolio-statuses", portfolioStatus.Index).Methods(http.MethodGet, http.MethodOptions)

	return r
}
