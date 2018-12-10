package main

import (
	"net/http"

	"github.com/ArijeetBaruah/mongoTest/app"
	"github.com/ArijeetBaruah/mongoTest/app/config"
	"github.com/ArijeetBaruah/mongoTest/app/models"
	"github.com/ArijeetBaruah/mongoTest/pkg/database"
	"github.com/ArijeetBaruah/mongoTest/pkg/logger"
	"github.com/ArijeetBaruah/mongoTest/pkg/session"
	"github.com/ArijeetBaruah/mongoTest/pkg/templates"
	"github.com/go-zoo/bone"
	"github.com/gorilla/csrf"
	"github.com/gorilla/sessions"
	"github.com/graphql-go/handler"
)

func main() {
	logger := &logger.RealLogger{}
	logger.Initialise()

	cfg := &config.AppConfig{
		Logger: logger,
	}
	cfg = cfg.ConstructAppConfig()

	db := &database.DatabaseWrapper{}
	dbConn, dbErr := db.Initialise(&cfg.DB)
	if dbErr != nil {
		logger.Panic(dbErr)
		return
	}

	CSRF := csrf.Protect([]byte(cfg.CSRFAuthkey))

	a := app.App{
		Router:    bone.New(),
		Config:    cfg,
		Logger:    logger,
		DB:        dbConn,
		TplParser: &templates.TemplateParser{},
		FlashService: &session.CookieStoreServiceImpl{
			Store:  sessions.NewCookieStore([]byte(cfg.SessionAuthkey)),
			Secure: false,
		},
		CSRF:              CSRF,
		UserService:       &models.UserServiceImpl{DB: dbConn},
		CustomUserService: &models.CustomUserServiceImpl{DB: dbConn},
	}

	s, err := app.CreateScheme()
	if err != nil {
		panic(err)
	}

	h := handler.New(&handler.Config{
		Schema:     &s,
		Pretty:     true,
		Playground: true,
	})

	a.InitRouter(h)

	if err := http.ListenAndServe(cfg.Port, a.Router); err != nil {
		panic(err)
	}
}
