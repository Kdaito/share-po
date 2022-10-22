package port

import (
	"context"

	"github.com/Kdaito/share-po/app/entity"
	"github.com/Kdaito/share-po/gen/models"
)

type PortfolioInputPort interface {
	Index(ctx context.Context)
	Create(ctx context.Context, portfolio *models.PortfolioRequest)
}

type PortfolioOutputPort interface {
	RenderCreate(*entity.Portfolio)
	RenderIndex(*models.PortfolioList)
	RenderError(error)
}

type PortfolioRepository interface {
	Index(ctx context.Context) (*models.PortfolioList, error)
	Create(ctx context.Context, portfolio *models.PortfolioRequest) (*entity.Portfolio, error)
}
