package port

import (
	"context"

	"github.com/Kdaito/share-po/app/entity"
)

type UserInputPort interface {
	CreateUser(ctx context.Context, user *entity.User)
	GetUserByUid(ctx context.Context, uid string)
}

type UserOutputPort interface {
	Render(*entity.User)
	RenderError(error)
}

type UserRepository interface {
	CreateUser(ctx context.Context, user *entity.User) (*entity.User, error)
	GetUserByUid(ctx context.Context, uid string) (*entity.User, error)
}
