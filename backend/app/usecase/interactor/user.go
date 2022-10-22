package interactor

import (
	"context"

	"firebase.google.com/go/auth"
	"github.com/Kdaito/share-po/app/usecase/port"
)

type User struct {
	OutputPort port.UserOutputPort
	repository port.UserRepository
	authClient *auth.Client
}

func NewUserInputPort(outputPort port.UserOutputPort, repository port.UserRepository, authClient *auth.Client) port.UserInputPort {
	return &User{
		OutputPort: outputPort,
		repository: repository,
		authClient: authClient,
	}
}

func (u *User) Get(ctx context.Context) {
	user, error := u.repository.Get(ctx)
	if error != nil {
		u.OutputPort.RenderError(error)
		return
	}
	u.OutputPort.Render(user)
}
