package gateway

import (
	"context"

	"github.com/Kdaito/share-po/app/entity"
	"github.com/Kdaito/share-po/app/usecase/port"
	"gorm.io/gorm"
)

type UserRepository struct {
	conn *gorm.DB
}

func NewUserRepository(conn *gorm.DB) port.UserRepository {
	return &UserRepository{
		conn: conn,
	}
}

func (u *UserRepository) CreateUser(ctx context.Context, user *entity.User) (*entity.User, error) {
	// userをDBに保存する処理
	return user, nil
}

func (u *UserRepository) GetUserByUid(ctx context.Context, uid string) (*entity.User, error) {
	// TODO DBからuserを取得する処理
	return &entity.User{
		ID:          1,
		Name:        "hiroto",
		FirebaseUID: "1234",
		Email:       "test@123.com",
	}, nil
}

func (u *UserRepository) GetDBConn() *gorm.DB {
	return u.conn
}
