package gateway

import (
	"context"
	"database/sql"

	"github.com/Kdaito/share-po/app/entity"
	"github.com/Kdaito/share-po/app/usecase/port"
)

type UserRepository struct {
	conn *sql.DB
}

func NewUserRepository(conn *sql.DB) port.UserRepository {
	return &UserRepository{
		conn: conn,
	}
}

func (u *UserRepository) GetUserByUid(ctx context.Context, uid string) (*entity.User, error) {
	// TODO DBからuserを取得する処理
	return &entity.User{
		ID: "1",
		Name: "hiroto",
		UID: "1234",
	}, nil
}

func (u *UserRepository) GetDBConn() *sql.DB {
	return u.conn
}