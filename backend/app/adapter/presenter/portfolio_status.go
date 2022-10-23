package presenter

import (
	"encoding/json"
	"net/http"

	"github.com/Kdaito/share-po/app/entity"
	"github.com/Kdaito/share-po/app/usecase/port"
	"github.com/Kdaito/share-po/gen/models"
)

type PortfolioStatus struct {
	w http.ResponseWriter
}

func NewPortfolioStatusOutputPort(w http.ResponseWriter) port.PortfolioStatusOutputPort {
	return &PortfolioStatus{
		w: w,
	}
}

func (p *PortfolioStatus) Render(portfolioStatus []*entity.PortfolioStatus) {
	result := make([]*models.PortfolioStatus, 0, len(portfolioStatus))
	for _, status := range portfolioStatus {
		res := &models.PortfolioStatus{
			ID:   int64(status.ID),
			Text: status.Text,
		}
		result = append(result, res)
	}

	res, err := json.Marshal(result)

	if err != nil {
		p.w.WriteHeader(http.StatusInternalServerError)
		p.w.Write([]byte(err.Error()))
	}

	p.w.WriteHeader(http.StatusOK)
	p.w.Write(res)
}

func (p *PortfolioStatus) RenderError(err error) {
	p.w.WriteHeader(http.StatusInternalServerError)
	p.w.Write([]byte(err.Error()))
}
