package presenter

import (
	"encoding/json"
	"net/http"

	"github.com/Kdaito/share-po/app/entity"
	"github.com/Kdaito/share-po/app/usecase/port"
	"github.com/Kdaito/share-po/gen/models"
)

type PortfolioTag struct {
	w http.ResponseWriter
}

func NewPortfolioTagOutputPort(w http.ResponseWriter) port.PortfolioTagOutputPort {
	return &PortfolioTag{
		w: w,
	}
}

func (p *PortfolioTag) Render(portfolioTags []*entity.PortfolioTag) {
	result := make([]*models.PortfolioTag, 0, len(portfolioTags))
	for _, tag := range portfolioTags {
		res := &models.PortfolioTag{
			ID:   int64(tag.ID),
			Text: tag.Text,
		}
		result = append(result, res)
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

func (p *PortfolioTag) RenderError(err error) {
	p.w.WriteHeader(http.StatusInternalServerError)
	p.w.Write([]byte(err.Error()))
}
