package gateway

import (
	"context"

	"firebase.google.com/go/auth"
	"github.com/Kdaito/share-po/app/entity"
	"github.com/Kdaito/share-po/app/usecase/port"
	"gorm.io/gorm"
)

type UserRepository struct {
	conn       *gorm.DB
	authClient *auth.Client
}

func NewUserRepository(conn *gorm.DB, authClient *auth.Client) port.UserRepository {
	return &UserRepository{
		conn:       conn,
		authClient: authClient,
	}
}

func (u *UserRepository) CreateUser(ctx context.Context, newUser *entity.User) (*entity.User, error) {
	// firebaseUID := ctx.Value("firebaseUID").(string)

	// log.Printf("%v", firebaseUID)
	// log.Printf("%v", u)
	// userが存在するかどうかをチェックする
	// var results []entity.User
	// err := u.conn.Where("firebase_uid = ?", firebaseUID).Limit(1).Find(&results).Error
	// if err != nil {
	// 	return nil, err
	// }
	// log.Printf("%v", results[0])
	// userが存在しない場合は新たに作成する
	// if len(results) == 0 {
	// 	newUser.FirebaseUID = firebaseUID
	// 	err := u.conn.Create(&newUser).Error
	// 	if err != nil {
	// 		return nil, err
	// 	}
	// 	return newUser, nil
	// } else {
	// 	return &results[0], nil
	// }
	return nil, nil
}

func (u *UserRepository) GetUser(ctx context.Context) (*entity.User, error) {
	firebaseUID := ctx.Value("firebaseUID").(string)

	// userが存在するかどうかをチェックする
	var results []entity.User
	err := u.conn.Where("firebase_uid = ?", firebaseUID).Limit(1).Find(&results).Error
	if err != nil {
		return nil, err
	}

	// userが存在しない場合は新たに作成する
	if len(results) == 0 {
		firebaseUser, err := u.authClient.GetUser(ctx, firebaseUID)
		if err != nil {
			return nil, err
		}
		var newUser = &entity.User{
			Name:        firebaseUser.DisplayName,
			Email:       firebaseUser.Email,
			FirebaseUID: firebaseUID,
		}
		err = u.conn.Create(&newUser).Error
		if err != nil {
			return nil, err
		}
		return newUser, nil
	} else {
		return &results[0], nil
	}
}

func (u *UserRepository) GetDBConn() *gorm.DB {
	return u.conn
}
