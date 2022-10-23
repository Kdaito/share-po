package entity

import "gorm.io/gorm"

type PortfolioStatus struct {
	gorm.Model
	Text string `gorm:"text"`
}
