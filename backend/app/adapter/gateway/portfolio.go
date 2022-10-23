package gateway

import (
	"context"

	"github.com/Kdaito/share-po/app/entity"
	"github.com/Kdaito/share-po/app/usecase/port"
	"github.com/Kdaito/share-po/gen/models"
	"github.com/go-openapi/strfmt"
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

func (p *Portfolio) Index(ctx context.Context, offset, limit int) (*models.PortfolioList, error) {
	// ポートフォリオを取得する
	var portfolios []*entity.Portfolio
	if err := p.conn.Offset(offset).Limit(limit).Find(&portfolios).Error; err != nil {
		return nil, err
	}
	result := make([]*models.Portfolio, 0, len(portfolios))

	for _, portfolio := range portfolios {
		// タグを取得する
		var tags []entity.PortfolioTag
		if err := p.conn.Model(&portfolio).Association("Tags").Find(&tags); err != nil {
			return nil, err
		}
		tagRes := make([]int64, 0, len(tags))
		for _, tag := range tags {
			tagRes = append(tagRes, int64(tag.ID))
		}

		// ユーザを取得する
		var user entity.User
		if err := p.conn.First(&user, portfolio.UserId).Error; err != nil {
			return nil, err
		}
		userRes := &models.User{
			ID:          int64(user.ID),
			Name:        user.Name,
			CreatedAt:   strfmt.DateTime(user.CreatedAt),
		}

		// レスポンス用に整形する
		res := &models.Portfolio{
			ID:          int64(portfolio.ID),
			Description: portfolio.Description,
			Name:        portfolio.Name,
			Status:      int64(portfolio.StatusId),
			GithubLink:  portfolio.GithubLink,
			ShareLink:   portfolio.ShareLink,
			Tags:        tagRes,
			User:        userRes,
		}
		result = append(result, res)
	}

	return &models.PortfolioList{Portfolios: result}, nil
}

func (p *Portfolio) Create(ctx context.Context, portfolio *models.PortfolioRequest) (*entity.Portfolio, error) {
	newPortfolio := &entity.Portfolio{
		Description: portfolio.Description,
		GithubLink:  portfolio.GithubLink,
		Name:        portfolio.Name,
		ShareLink:   portfolio.ShareLink,
		UserId:      int(portfolio.UserID),
		StatusId:    int(portfolio.Status),
	}

	if tXErr := p.conn.Transaction(func(tx *gorm.DB) error {
		if err := p.conn.Create(&newPortfolio).Error; err != nil {
			return err
		}
	
		for _, tag := range portfolio.Tags {
			var newTag entity.PortfolioTag
			newTag.ID = uint(tag)
			if err := p.conn.Model(&newPortfolio).Association("Tags").Append(&newTag); err != nil {
				return err
			}
		}

		return nil
	}); tXErr != nil {
		return nil, tXErr
	}


	return newPortfolio, nil
}
