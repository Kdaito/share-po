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

func (u *UserRepository) CreateUser(ctx context.Context, newUser *entity.User) (*entity.User, error) {
	firebaseUID := ctx.Value("firebaseUID").(string)
	
	// userが存在するかどうかをチェックする
	var results []entity.User
	err := u.conn.Where("firebase_uid = ?", firebaseUID).Limit(1).Find(&results).Error
	if err != nil {
		return nil, err
	}
	
	// userが存在しない場合は新たに作成する
	if len(results) == 0 {
		newUser.FirebaseUID = firebaseUID
		err := u.conn.Create(&newUser).Error
		if err != nil {
			return nil, err
		}
		return newUser, nil
	} else {
		return &results[0], nil
	}
}

func (u *UserRepository) GetUserByUid(ctx context.Context, firebaseUID string) (*entity.User, error) {
	var user entity.User
	err := u.conn.Where("firebase_uid = ?", firebaseUID).First(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (u *UserRepository) GetDBConn() *gorm.DB {
	return u.conn
}
