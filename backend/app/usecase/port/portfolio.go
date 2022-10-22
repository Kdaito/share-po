package port

import (
	"context"

	"github.com/Kdaito/share-po/app/entity"
	"github.com/Kdaito/share-po/gen/models"
)

type PortfolioInputPort interface {
	CreatePortfolio(ctx context.Context, portfolio *models.PortfolioRequest)
}

type PortfolioOutputPort interface {
	Render(*entity.Portfolio)
	RenderError(error)
}

type PortfolioRepository interface {
	CreatePortfolio(ctx context.Context, portfolio *models.PortfolioRequest) (*entity.Portfolio, error)
}