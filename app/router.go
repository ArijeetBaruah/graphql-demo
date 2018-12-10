package app

import (
	"net/http"

)

func (app *App) InitRouter(h http.Handler) {
	app.Router.Handle("/graphql", h)
	app.Router.Handle("/:any", app.RenderView(app.RenderIndex))
}
