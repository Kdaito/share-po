package port

import (
	"context"

	"github.com/Kdaito/share-po/app/entity"
)

type UserInputPort interface {
	GetUserByUid(ctx context.Context, uid string)
}

type UserOutputPort interface {
	Render(*entity.User)
	RenderError(error)
}

type UserRepository interface {
	GetUserByUid(ctx context.Context, uid string) (*entity.User, error)
}