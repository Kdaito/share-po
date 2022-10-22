package port

import (
	"context"

	"github.com/Kdaito/share-po/app/entity"
)

type UserInputPort interface {
	Get(ctx context.Context)
}

type UserOutputPort interface {
	Render(*entity.User)
	RenderError(error)
}

type UserRepository interface {
	Get(ctx context.Context) (*entity.User, error)
}
