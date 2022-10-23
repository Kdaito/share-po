package interactor

import (
	"context"

	"github.com/Kdaito/share-po/app/usecase/port"
)

type PortfolioStatus struct {
	outputPort port.PortfolioStatusOutputPort
	repository port.PortfolioStatusRepository
}

func NewPortfolioStatusInputPort(outputPort port.PortfolioStatusOutputPort, repository port.PortfolioStatusRepository) port.PortfolioStatusInputPort {
	return &PortfolioStatus{
		outputPort: outputPort,
		repository: repository,
	}
}

func (p *PortfolioStatus) Index(ctx context.Context) {
	portfolioStatues, error := p.repository.Index(ctx)
	if error != nil {
		p.outputPort.RenderError(error)
		return
	}
	p.outputPort.Render(portfolioStatues)
}
