package app

import (
	"github.com/graphql-go/graphql"
)

//Author structure for author data
type Author struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

//AuthorList list of author
var AuthorList []*Author

//AuthorObject grapghql author object
var AuthorObject = graphql.NewObject(graphql.ObjectConfig{
	Name: "author",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.ID,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
	},
})
