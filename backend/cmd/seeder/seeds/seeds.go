package seeds

import (
	"github.com/Kdaito/share-po/cmd/seeder/seed"
	"gorm.io/gorm"
)

func PortfolioTag() []seed.Seed {
	return []seed.Seed{
		{
			Name: "create portfolioTag react",
			Run: func(db *gorm.DB) error {
				err := CreatePortfolioTag(db, "React")
				return err
			},
		},
		{
			Name: "create portfolioTag vue",
			Run: func(db *gorm.DB) error {
				err := CreatePortfolioTag(db, "Vue")
				return err
			},
		},
		{
			Name: "create portfolioTag typescript",
			Run: func(db *gorm.DB) error {
				err := CreatePortfolioTag(db, "TypeScript")
				return err
			},
		},
		{
			Name: "create portfolioTag go",
			Run: func(db *gorm.DB) error {
				err := CreatePortfolioTag(db, "Go")
				return err
			},
		},
		{
			Name: "create portfolioTag docker",
			Run: func(db *gorm.DB) error {
				err := CreatePortfolioTag(db, "Docker")
				return err
			},
		},
	}
}

func PortfolioStatus() []seed.Seed {
	return []seed.Seed{
		{
			Name: "create portfolioStatus 作業中",
			Run: func(db *gorm.DB) error {
				err := CreatePortfolioStatus(db, "作業中")
				return err
			},
		},
		{
			Name: "create portfolioStatus 完成",
			Run: func(db *gorm.DB) error {
				err := CreatePortfolioStatus(db, "完成")
				return err
			},
		},
		{
			Name: "create portfolioStatus 公開済み",
			Run: func(db *gorm.DB) error {
				err := CreatePortfolioStatus(db, "公開済み")
				return err
			},
		},
	}
}
