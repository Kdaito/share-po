package entity

import "gorm.io/gorm"

type Portfolio struct {
	gorm.Model
	Description     string `gorm:"description"`
	GithubLink      string `gorm:"github_link"`
	Name            string `gorm:"name"`
	ShareLink       string `gorm:"share_link"`
	UserId          int    `gorm:"user_id"`
	User            User
	StatusId        int             `gorm:"status_id"`
	PortfolioStatus PortfolioStatus `gorm:"foreignKey:StatusId"`
	Tags            []PortfolioTag  `gorm:"many2many:portfolio_portfolio_tags"`
}
