package controller

import (
	"io/ioutil"
	"net/http"

	"github.com/go-openapi/strfmt"
)

type requestModel interface {
	UnmarshalBinary(b []byte) error
	Validate(strfmt.Registry) error
}

func parseModelFromRequest(r *http.Request, model requestModel) error {
	body, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		return err
	}

	model.UnmarshalBinary(body)

	if err := model.Validate(strfmt.Default); err != nil {
		return err
	}

	return nil
}
