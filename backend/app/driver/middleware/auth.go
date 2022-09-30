package middleware

import (
	"context"
	"errors"
	"net/http"

	"firebase.google.com/go/auth"
)

const (
	bearer = "Bearer"
)

type Auth struct {
	client *auth.Client
}

func NewAuth(client *auth.Client) *Auth {
	return &Auth{
		client: client,
	}
}

func (a *Auth) Handler(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// ヘッダーからtokenを取得する
		idToken, err := getTokenFromHeader(r)
		if err != nil {
			// w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}
		token, err := a.client.VerifyIDToken(r.Context(), idToken)
		if err != nil && token == nil {
			w.WriteHeader(http.StatusOK)
			w.Write([]byte(err.Error()))
			return
		}
		// 認証できた場合はcontextにいれる
		ctx := context.WithValue(r.Context(), "firebaseUID", token.UID)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func getTokenFromHeader(req *http.Request) (string, error) {
	header := req.Header.Get("Authorization")
	if header == "" {
		return "", errors.New("authorization header not found")
	}

	l := len(bearer)
	if len(header) > l+1 && header[:l] == bearer {
		return header[l+1:], nil
	}

	return "", errors.New("authorization header format must be 'Bearer {token}'")
}
