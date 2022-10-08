package controller

import (
	"net/http"

	"github.com/Kdaito/share-po/app/usecase/port"
	"gorm.io/gorm"
)

type PortfolioTagOutputFactory func(w http.ResponseWriter) port.PortfolioTagOutputPort
type PortfolioTagInputFactory func(o port.PortfolioTagOutputPort, r port.PortfolioTagRepository) port.PortfolioTagInputPort
type PortfolioTagRepositoryFactory func(c *gorm.DB) port.PortfolioTagRepository

type PortfolioTagController struct {
	outputFactory     PortfolioTagOutputFactory
	inputFactory      PortfolioTagInputFactory
	repositoryFactory PortfolioTagRepositoryFactory
	conn              *gorm.DB
}

func NewPortfolioTagController(outputFactory PortfolioTagOutputFactory, inputFactory PortfolioTagInputFactory, repositoryFactory PortfolioTagRepositoryFactory, conn *gorm.DB) *PortfolioTagController {
	return &PortfolioTagController{
		outputFactory:     outputFactory,
		inputFactory:      inputFactory,
		repositoryFactory: repositoryFactory,
		conn:              conn,
	}
}

func (p *PortfolioTagController) newInputPort(w http.ResponseWriter) port.PortfolioTagInputPort {
	outputPort := p.outputFactory(w)
	repository := p.repositoryFactory(p.conn)
	return p.inputFactory(outputPort, repository)
}

func (p *PortfolioTagController) GetPortfolioTags(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	p.newInputPort(w).GetPortfolioTags(ctx)
}
