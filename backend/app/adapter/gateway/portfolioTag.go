package gateway

import (
	"context"

	"github.com/Kdaito/share-po/app/entity"
	"github.com/Kdaito/share-po/app/usecase/port"
	"gorm.io/gorm"
)

type PortfolioTagRepository struct {
	conn *gorm.DB
}

func NewPortfolioTagRepository(conn *gorm.DB) port.PortfolioTagRepository {
	return &PortfolioTagRepository{
		conn: conn,
	}
}

func (p *PortfolioTagRepository) GetPortfolioTags(ctx context.Context) ([]*entity.PortfolioTag, error) {
	var portfolioTags []*entity.PortfolioTag
	if err := p.conn.Find(&portfolioTags).Error; err != nil {
		return nil, err
	}
	return portfolioTags, nil
}
