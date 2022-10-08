package gateway

import (
	"context"

	"github.com/Kdaito/share-po/app/entity"
	"github.com/Kdaito/share-po/app/usecase/port"
	"gorm.io/gorm"
)

type PortfolioStatusRepository struct {
	conn *gorm.DB
}

func NewPortfolioStatusRepository(conn *gorm.DB) port.PortfolioStatusRepository {
	return &PortfolioStatusRepository{
		conn: conn,
	}
}

func (p *PortfolioStatusRepository) GetPortfolioStatuses(ctx context.Context) ([]*entity.PortfolioStatus, error) {
	var portfolioStatuses []*entity.PortfolioStatus
	if err := p.conn.Find(&portfolioStatuses).Error; err != nil {
		return nil, err
	}
	return portfolioStatuses, nil
}
