package controller

import (
	"net/http"
	"strconv"

	"github.com/Kdaito/share-po/app/usecase/port"
	"github.com/Kdaito/share-po/gen/models"
	"gorm.io/gorm"
)

const (
	DEFAULT_OFFSET = 0
	DEFAULT_LIMIT = 10
)

type PortfolioOutputFactory func(w http.ResponseWriter) port.PortfolioOutputPort
type PortfolioInputFactory func(o port.PortfolioOutputPort, r port.PortfolioRepository) port.PortfolioInputPort
type PortfolioRepositoryFactory func(c *gorm.DB) port.PortfolioRepository

type PortfolioController struct {
	outputFactory     PortfolioOutputFactory
	inputFactory      PortfolioInputFactory
	repositoryFactory PortfolioRepositoryFactory
	conn              *gorm.DB
}

func NewPortfolioController(outputFactory PortfolioOutputFactory, inputFactory PortfolioInputFactory, repositoryFactory PortfolioRepositoryFactory, conn *gorm.DB) *PortfolioController {
	return &PortfolioController{
		outputFactory:     outputFactory,
		inputFactory:      inputFactory,
		repositoryFactory: repositoryFactory,
		conn:              conn,
	}
}

func (p *PortfolioController) newInputPort(w http.ResponseWriter) port.PortfolioInputPort {
	outputPort := p.outputFactory(w)
	repository := p.repositoryFactory(p.conn)
	return p.inputFactory(outputPort, repository)
}

func (p *PortfolioController) Index(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	// クエリからページネーション用のoffsetとlimitを取得する
	var offset int
	var limit int
	if queryOffset := r.URL.Query().Get("offset"); queryOffset == "" {
		offset = DEFAULT_OFFSET
		} else {
		offset, _ = strconv.Atoi(queryOffset)
	}
	if queryLimit := r.URL.Query().Get("limit"); queryLimit == "" {
		limit = DEFAULT_LIMIT
	} else {
		limit, _ = strconv.Atoi(queryLimit)
	}
	p.newInputPort(w).Index(ctx, offset, limit)
}

func (p *PortfolioController) Create(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	var req models.PortfolioRequest
	if err := parseModelFromRequest(r, &req); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
	}
	p.newInputPort(w).Create(ctx, &req)
}
