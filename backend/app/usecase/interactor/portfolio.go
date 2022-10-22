package interactor

import (
	"context"

	"github.com/Kdaito/share-po/app/usecase/port"
	"github.com/Kdaito/share-po/gen/models"
)

type Portfolio struct {
	outputPort port.PortfolioOutputPort
	repository port.PortfolioRepository
}

func NewPortfolioInputPort(outputPort port.PortfolioOutputPort, repository port.PortfolioRepository) port.PortfolioInputPort {
	return &Portfolio{
		outputPort: outputPort,
		repository: repository,
	}
}

func (p *Portfolio) CreatePortfolio(ctx context.Context, portfolio *models.PortfolioRequest) {
	res, err := p.repository.CreatePortfolio(ctx, portfolio)
	if err != nil {
		p.outputPort.RenderError(err)
		return
	}
	p.outputPort.Render(res)
}