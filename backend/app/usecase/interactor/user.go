package interactor

import (
	"context"

	"github.com/Kdaito/share-po/app/usecase/port"
)

type User struct {
	OutputPort port.UserOutputPort
	repository port.UserRepository
}

func NewUserInputPort(outputPort port.UserOutputPort, repository port.UserRepository) port.UserInputPort {
	return &User{
		OutputPort: outputPort,
		repository: repository,
	}
}

func (u *User) GetUserByUid(ctx context.Context, uid string) {
	user, error := u.repository.GetUserByUid(ctx, uid)
	if error != nil {
		u.OutputPort.RenderError(error)
		return
	}
	u.OutputPort.Render(user)
}