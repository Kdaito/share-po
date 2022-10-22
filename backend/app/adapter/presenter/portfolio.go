package presenter

import (
	"encoding/json"
	"net/http"

	"github.com/Kdaito/share-po/app/entity"
	"github.com/Kdaito/share-po/app/usecase/port"
	"github.com/Kdaito/share-po/gen/models"
)

type Portfolio struct {
	w http.ResponseWriter
}

func NewPortfolioOutputPort(w http.ResponseWriter) port.PortfolioOutputPort {
	return &Portfolio{
		w: w,
	}
}

func (p *Portfolio) RenderIndex(portfolios *models.PortfolioList) {
	res, err := json.Marshal(portfolios)
	if err != nil {
		p.RenderError(err)
	}

	p.w.WriteHeader(http.StatusOK)
	p.w.Write(res)
}

func (p *Portfolio) RenderCreate(portfolio *entity.Portfolio) {
	result := &models.IDResponse{
		ID: int64(portfolio.ID),
	}
	res, err := json.Marshal(result)

	if err != nil {
		p.RenderError(err)
	}

	p.w.WriteHeader(http.StatusOK)
	p.w.Write(res)
}

func (p *Portfolio) RenderError(err error) {
	p.w.WriteHeader(http.StatusInternalServerError)
	p.w.Write([]byte(err.Error()))
	return
}
