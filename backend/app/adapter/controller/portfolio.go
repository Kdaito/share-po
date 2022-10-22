package controller

import (
	"net/http"

	"github.com/Kdaito/share-po/app/usecase/port"
	"github.com/Kdaito/share-po/gen/models"
	"gorm.io/gorm"
)

type PortfolioOutputFactory func (w http.ResponseWriter) port.PortfolioOutputPort
type PortfolioInputFactory func (o port.PortfolioOutputPort, r port.PortfolioRepository) port.PortfolioInputPort
type PortfolioRepositoryFactory func (c *gorm.DB) port.PortfolioRepository

type PortfolioController struct {
	outputFactory PortfolioOutputFactory
	inputFactory PortfolioInputFactory
	repositoryFactory PortfolioRepositoryFactory
	conn *gorm.DB
}

func NewPortfolioController(outputFactory PortfolioOutputFactory, inputFactory PortfolioInputFactory, repositoryFactory PortfolioRepositoryFactory, conn *gorm.DB) *PortfolioController {
	return &PortfolioController{
		outputFactory: outputFactory,
		inputFactory: inputFactory,
		repositoryFactory: repositoryFactory,
		conn: conn,
	}
}

func (p *PortfolioController) newInputPort(w http.ResponseWriter) port.PortfolioInputPort {
	outputPort := p.outputFactory(w)
	repository := p.repositoryFactory(p.conn)
	return p.inputFactory(outputPort, repository)
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
