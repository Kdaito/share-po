package port

import (
	"context"

	"github.com/Kdaito/share-po/app/entity"
)

type PortfolioStatusInputPort interface {
	GetPortfolioStatuses(ctx context.Context)
}

type PortfolioStatusOutputPort interface {
	Render([]*entity.PortfolioStatus)
	RenderError(error)
}

type PortfolioStatusRepository interface {
	GetPortfolioStatuses(ctx context.Context) ([]*entity.PortfolioStatus, error)
}
