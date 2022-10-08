package entity

import "gorm.io/gorm"

type PortfolioTag struct {
	gorm.Model
	Text string `gorm:"text"`
}