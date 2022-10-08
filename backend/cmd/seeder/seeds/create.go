package seeds

import (
	"github.com/Kdaito/share-po/app/entity"
	"gorm.io/gorm"
)

func CreatePortfolioTag(db *gorm.DB, text string) error {
	newTag := &entity.PortfolioTag{Text: text}
	return db.Create(&newTag).Error
}

func CreatePortfolioStatus(db *gorm.DB, text string) error {
	newStatus := &entity.PortfolioStatus{Text: text}
	return db.Create(&newStatus).Error
}
