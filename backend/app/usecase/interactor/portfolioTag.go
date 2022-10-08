package interactor

import (
	"context"

	"github.com/Kdaito/share-po/app/usecase/port"
)

type PortfolioTag struct {
	outputPort port.PortfolioTagOutputPort
	repository port.PortfolioTagRepository
}

func NewPortfolioTagInputPort(outputPort port.PortfolioTagOutputPort, repository port.PortfolioTagRepository) port.PortfolioTagInputPort {
	return &PortfolioTag{
		outputPort: outputPort,
		repository: repository,
	}
}

func (p *PortfolioTag) GetPortfolioTags(ctx context.Context) {
	portfolioTags, error := p.repository.GetPortfolioTags(ctx)
	if error != nil {
		p.outputPort.RenderError(error)
		return
	}
	p.outputPort.Render(portfolioTags)
}
