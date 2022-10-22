package gateway

import (
	"context"

	"github.com/Kdaito/share-po/app/entity"
	"github.com/Kdaito/share-po/app/usecase/port"
	"github.com/Kdaito/share-po/gen/models"
	"gorm.io/gorm"
)

type Portfolio struct {
	conn *gorm.DB
}

func NewPortfolioRepository(conn *gorm.DB) port.PortfolioRepository {
	return &Portfolio{
		conn: conn,
	}
}

func (p *Portfolio) Create(ctx context.Context, portfolio *models.PortfolioRequest) (*entity.Portfolio, error) {
	newPortfolio := &entity.Portfolio{
		Description: portfolio.Description,
		GithubLink: portfolio.GithubLink,
		Name: portfolio.Name,
		ShareLink: portfolio.ShareLink,
		UserId: int(portfolio.UserID),
		StatusId: int(portfolio.Status),
	}

	if err := p.conn.Create(&newPortfolio).Error; err != nil {
		return nil, err
	}

	for _, tag := range portfolio.Tags {
		var newTag entity.PortfolioTag
		newTag.ID = uint(tag)
		if err := p.conn.Model(&newPortfolio).Association("Tags").Append(&newTag); err != nil {
			return nil, err
		}
	}

	return newPortfolio, nil
}