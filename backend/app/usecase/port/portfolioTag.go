package port

import (
	"context"

	"github.com/Kdaito/share-po/app/entity"
)

type PortfolioTagInputPort interface {
	Index(ctx context.Context)
}

type PortfolioTagOutputPort interface {
	Render([]*entity.PortfolioTag)
	RenderError(error)
}

type PortfolioTagRepository interface {
	Index(ctx context.Context) ([]*entity.PortfolioTag, error)
}
