package controller

import (
	"net/http"

	"github.com/Kdaito/share-po/app/usecase/port"
	"gorm.io/gorm"
)

type PortfolioStatusOutputFactory func(w http.ResponseWriter) port.PortfolioStatusOutputPort
type PortfolioStatusInputFactory func(o port.PortfolioStatusOutputPort, r port.PortfolioStatusRepository) port.PortfolioStatusInputPort
type PortfolioStatusRepositoryFactory func(c *gorm.DB) port.PortfolioStatusRepository

type PortfolioStatusController struct {
	outputFactory     PortfolioStatusOutputFactory
	inputFactory      PortfolioStatusInputFactory
	repositoryFactory PortfolioStatusRepositoryFactory
	conn              *gorm.DB
}

func NewPortfolioStatusController(outputFactory PortfolioStatusOutputFactory, inputFactory PortfolioStatusInputFactory, repositoryFactory PortfolioStatusRepositoryFactory, conn *gorm.DB) *PortfolioStatusController {
	return &PortfolioStatusController{
		outputFactory:     outputFactory,
		inputFactory:      inputFactory,
		repositoryFactory: repositoryFactory,
		conn:              conn,
	}
}

func (p *PortfolioStatusController) newInputPort(w http.ResponseWriter) port.PortfolioStatusInputPort {
	outputPort := p.outputFactory(w)
	repository := p.repositoryFactory(p.conn)
	return p.inputFactory(outputPort, repository)
}

func (p *PortfolioStatusController) GetPortfolioStatuses(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	p.newInputPort(w).GetPortfolioStatuses(ctx)
}
