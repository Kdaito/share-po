package port

import (
	"context"

	"github.com/Kdaito/share-po/app/entity"
)

type UserInputPort interface {
	CreateUser(ctx context.Context, user *entity.User)
	GetUser(ctx context.Context)
}

type UserOutputPort interface {
	Render(*entity.User)
	RenderError(error)
}

type UserRepository interface {
	CreateUser(ctx context.Context, user *entity.User) (*entity.User, error)
	GetUser(ctx context.Context) (*entity.User, error)
}
