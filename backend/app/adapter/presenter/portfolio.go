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

func (p *Portfolio) Render(portfolio *entity.Portfolio) {
	p.w.WriteHeader(http.StatusOK)
	result := &models.IDResponse{
		ID: int64(portfolio.ID),
	}
	// レスポンス用にbyte配列に変える
	res, err := json.Marshal(result)

	if err != nil {
		p.w.WriteHeader(http.StatusInternalServerError)
		p.w.Write([]byte(err.Error()))
		return
	}

	p.w.WriteHeader(http.StatusOK)
	p.w.Write(res)
}

func (p *Portfolio) RenderError(err error) {
	p.w.WriteHeader(http.StatusInternalServerError)
	p.w.Write([]byte(err.Error()))
}
